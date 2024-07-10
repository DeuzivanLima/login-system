import { db } from "@/infra/database";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = 'force-dynamic'


export const GET = async (req: NextRequest, {params}: any) => {
  try {
    let posts = await db.post.findMany({
      orderBy: {
        created_at: 'asc'
      },
      take: 8
    })

    if(posts == undefined)
      throw 'No post found'

    posts = JSON.parse(JSON.stringify(posts, (_, v) => typeof v === 'bigint' ? v.toString() : v))
    return NextResponse.json(posts.reverse(), {status: 200})
  } catch(error) {
    return NextResponse.json({message: error}, {status: 500})
  }
}