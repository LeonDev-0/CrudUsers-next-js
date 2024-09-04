import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"


export const GET = async() => {
    const prisma = new PrismaClient();
    const user  = await prisma.personas.findMany();
    return NextResponse.json(user)
}

export const POST =  async (request) =>{
    const prisma = new PrismaClient();

    const data = await request.json();

    const adduser = await prisma.personas.create({
        data:{
            name:data.name,
            email:data.email
        }
    }

    )
    return NextResponse.json(adduser);
}