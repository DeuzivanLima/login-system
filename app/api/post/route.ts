import { cookies } from 'next/headers'
import { NextResponse, NextRequest } from 'next/server'
import { z } from 'zod'
import { db } from '@/infra/database'

const scheme = z.object({
  session: z.string().uuid(),
  content: z.string().min(4).max(1024)
})

const user_scheme = z.object({
  username: z.string()
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
    const user = await db.user.findUnique({
      where: {
        id: session?.user_id
      }
    })

    const fuser = user_scheme.parse(user)

    if (session == null)
      throw 'Session expired or don\'t exists'

    const post = await db.post.create({
      data: {
        onwer_id: session.user_id,
        owner_username: fuser.username,
        status: 'publish',
        content: data.content
      }
    })

  } catch (error) {
    console.log(error)
    return NextResponse.json({ message: error }, {status: 500})

  }

  return NextResponse.json({}, {status: 200})
}