import { db } from "@/infra/database";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = 'force-dynamic'

export const  GET = async (req: NextRequest) => {
  try {
    const cookieStore = cookies()

    if(!cookieStore.has('session'))
      return NextResponse.json({message: 'Please login first'}, {status: 500})

    const session_info = await db.session.findUnique({
      where: {
        id: cookieStore.get('session')?.value
      }
    })

    let user = await db.user.findUnique({
      where: {
        id: session_info?.user_id
      },
      select: {
        username: true,
        id: true,
        created_at: true
      }
    })

    if(user == undefined) {
      return NextResponse.json({message: 'Your session is broken'}, {status: 500})
    }

    user = JSON.parse(JSON.stringify(user, (_, v) => typeof v === 'bigint' ? v.toString() : v))

    return NextResponse.json(user, {status: 200})
  } catch(error) {
    return NextResponse.json({message: error}, {status: 500})
  }
}