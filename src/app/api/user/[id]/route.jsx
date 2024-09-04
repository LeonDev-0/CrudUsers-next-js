import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

export const GET = async (request, { params }) => {
    const prisma = new PrismaClient();
    const user = await prisma.personas.findUnique({
        where: {
            id: Number(params.id)
        }
    });

    return NextResponse.json(user)
}


export const PUT = async (request, { params }) => {

    const prisma = new PrismaClient();
    const data = await request.json();
    const edit = await prisma.personas.update({
        where:{
            id:Number(params.id)
        },
        data:{
            name:data.name,
            email:data.email
        }
    })



    return NextResponse.json(edit)
}

export const DELETE = async (request, { params }) => {
    const prisma = new PrismaClient();

    const userDelete = await prisma.personas.delete({
        where: {
            id: Number(params.id)
        }
    })
    console.log(userDelete)

    return NextResponse.json("user Deleted");
}