// app/api/users/search/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const q = url.searchParams.get("q") ?? "";
  const limit = parseInt(url.searchParams.get("limit") ?? "5", 10);
  if (!q.trim()) return NextResponse.json({ users: [] });

  const users = await prisma.user.findMany({
    where: {
      OR: [
        { username: { contains: q, mode: "insensitive" } },
        { name: { contains: q, mode: "insensitive" } },
      ],
    },
    select: { id: true, username: true, name: true, image: true },
    take: limit,
  });

  return NextResponse.json({ users });
}
