import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/infra/database'
import { z } from 'zod'
import { cookies } from 'next/headers'

export const GET = async (req: NextRequest) => {
  try {
    const cookieStore = cookies()
    const token = cookieStore.get('session')?.value

    if(token != undefined) {
      const session = await db.session.findUnique({
        where: {
          id: token
        }
      })

      const user = await db.user.findUnique({
        where: {
          id: session?.user_id
        }
      })
      return NextResponse.json({
        username: user?.username,
        created_at: user?.created_at,
        id: session?.user_id.toString()
      }, {status: 200})
    }
  } catch(error) {
    return NextResponse.json(error, {status: 500})
  }
}