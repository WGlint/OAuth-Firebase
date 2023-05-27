import { NextResponse, NextRequest } from "next/server"


export async function GET() {
    NextResponse.json({ name: 'John Doe' })
  }