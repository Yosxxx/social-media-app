import { NextResponse } from "next/server";
import { getProfileByUsername } from "@/actions/profile.action";

export async function GET(request: Request, context: any) {
  const { username } = await context.params;

  try {
    const profile = await getProfileByUsername(username);
    return NextResponse.json(profile.following); 
  } catch {
    return NextResponse.json([], { status: 404 });
  }
}
