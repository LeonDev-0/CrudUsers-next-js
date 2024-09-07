import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";


export const GET = async () => {
    const prisma = new PrismaClient();
    const products = await prisma.productos.findMany();
    return NextResponse.json(products)
}