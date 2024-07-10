import { cookies } from 'next/headers'
import { NextResponse, NextRequest } from 'next/server'
import { z } from 'zod'
import { db } from '@/infra/database'
import { createHash } from 'crypto'

const scheme = z.object({
    username: z.string().max(32).min(4).trim(),
    password: z.string()
})

export const POST = async (req: NextRequest) => {
    const cookieStore = cookies()

    try {
        const data = scheme.parse(await req.json())
        const password_hash_req = createHash('sha256').update(data.password).digest('hex')
        
        const user = await db.user.findUnique({
            where: {
                username: data.username,
                password_hash: password_hash_req
            }
        })

        if(user == null)
            throw 'User not found'
     
        const session = await db.session.create({
            data: {
                user_id: user.id
            }
        })

        cookieStore.set('session', session.id)

    } catch(error) {
        return NextResponse.json({message: error}, {status: 500})
    }

    return NextResponse.json({}, {status: 200})
}