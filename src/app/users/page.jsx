"use client"
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import Link from "next/link";
import { useRouter } from "next/navigation";


const User = () => {
    const router = useRouter();

    const [datos, setDatos] = useState([]);

    const  getUsers = async()=>{
        const res = await fetch('/api/user')
        const data = await res.json();
        return data ;
    }

    useEffect(()=>{
        const users = async()=>{
            const res = await getUsers();
            setDatos(res);
        }
        users();
        
    },[])

    const columns = [
        {
            name: 'Nombre',
            selector: row => row.name
        },
        {
            name: 'Correo',
            selector: row => row.email
        },
        {
            name: 'Acciones',
            cell: row => (
                <div>
                    <button onClick={() =>router.push(`/users/${row.id}`)}>Editar</button>
                    <button onClick={async()=>{

                        const res = await fetch(`/api/user/${row.id}`,{
                            method:'DELETE',
                        })
                        const data = await res.json();
                        if(res.ok){
                            setDatos(datos.filter(user=>user.id!==row.id))
                            alert('Usuario eliminado')
                        }else{
                            console.error("error al eliminar",data)
                        }

                    }}>Eliminar</button>
                </div>
            )
        }
    ]

    console.log(datos)

    return (
        <div>
            <h1>User List</h1>
            <Link href="/users/new">
            Nuevo usuario
            </Link>
            <DataTable
                columns={columns}
                data={datos}
            />
        </div>
    )
}
export default User;