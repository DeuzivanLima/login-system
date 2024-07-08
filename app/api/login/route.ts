import { cookies } from 'next/headers'
import { NextResponse, NextRequest } from 'next/server'
import { z } from 'zod'

const scheme = z.object({
    username: z.string().max(32).min(4).trim(),
    password_hash: z.string()
})

export const POST = async (req: NextRequest) => {
    const data = scheme.parse(await req.json())

    return NextResponse.json({session: 'fdh7h703fh7f387h3fh73fh7083f'}, {status: 200})
}