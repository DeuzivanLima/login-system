import { db } from "@/infra/database";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, {params}: any) => {
  try {
    let posts = await db.post.findMany()

    if(posts == undefined)
      throw 'No post found'

    posts = JSON.parse(JSON.stringify(posts, (_, v) => typeof v === 'bigint' ? v.toString() : v))

    return NextResponse.json(posts, {status: 200})
  } catch(error) {
    console.log(error)
    return NextResponse.json({message: error}, {status: 500})
  }
}