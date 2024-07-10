import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/infra/database'

export const GET = async (req: NextRequest, {params}: any) => {
  try {
    let user = await db.user.findUnique({
      where: {
        username: params.username
      }
    })

    user = JSON.parse(JSON.stringify(user, (_, v) => typeof v === 'bigint' ? v.toString() : v))

    return NextResponse.json({
      username: user?.username,
      created_at: user?.created_at,
      id: user?.id
    }, {status: 200})
    
  } catch(error) {
    return NextResponse.json(error, {status: 500})

  }
}