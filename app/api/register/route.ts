import { NextResponse, NextRequest } from 'next/server'
import { z } from 'zod'
import { db } from '@/infra/database'
import { createHash } from 'crypto'

const scheme = z.object({
    username: z.string().max(32).min(4).trim(),
    password: z.string()
})

export const POST = async (req: NextRequest) => {
    try {
        const data = scheme.parse(await req.json())

        await db.user.create({
            data: {
                username: data.username,
                password_hash: createHash('sha256').update(data.password).digest('hex')
            }
        })

    } catch(error) {
        return NextResponse.json({message: error}, {status: 500})
    }
    return NextResponse.json({where: 'oui'}, {status: 200})
}