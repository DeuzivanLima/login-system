import { cookies } from 'next/headers'
import { NextResponse, NextRequest } from 'next/server'
import { z } from 'zod'
import { db } from '@/infra/database'
import { NextApiRequest, NextApiResponse } from 'next'

const scheme = z.object({
  session: z.string().uuid(),
  content: z.string().min(4).max(1024)
})

export const POST = async (req: NextRequest) => {
  const cookieStore = cookies()

  try {
    const data = scheme.parse(await req.json())

    const session = await db.session.findUnique({
      where: {
        id: data.session
      }
    })

    if (session == null)
      throw 'Session expired or don\'t exists'

    const post = await db.post.create({
      data: {
        onwer_id: session.user_id,
        status: 'publish',
        content: data.content
      }
    })

  } catch (error) {
    return NextResponse.json({ message: error }, {status: 500})

  }

  return NextResponse.json({}, {status: 200})
}