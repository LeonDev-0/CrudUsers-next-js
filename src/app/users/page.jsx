"use client"
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import Link from "next/link";
import { useRouter } from "next/navigation";


const User = () => {
    const router = useRouter();

    const [datos, setDatos] = useState([]);

    const getUsers = async () => {
        const res = await fetch('/api/user')
        const data = await res.json();
        return data;
    }

    useEffect(() => {
        const users = async () => {
            const res = await getUsers();
            setDatos(res);
        }
        users();

    }, [])

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
                    <button style={{ "background-color": "#f8e800", "color": "white","margin":"1px","border":"none" }} onClick={() => router.push(`/users/${row.id}`)}>Editar</button>
                    <button style={{ "background-color": "red", "color": "white", "border": "none", "margin":"1px" }} onClick={async () => {

                        const res = await fetch(`/api/user/${row.id}`, {
                            method: 'DELETE',
                        })
                        const data = await res.json();
                        if (res.ok) {
                            setDatos(datos.filter(user => user.id !== row.id))
                            alert('Usuario eliminado')
                        } else {
                            console.error("error al eliminar", data)
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

                <button style={{ "background-color": "#267cdf", "color": "white","padding":"10px","border-radius":"5px","border":"none" }}>
                    Nuevo usuario
                </button>
            </Link>
            <DataTable
                columns={columns}
                data={datos}
            />
        </div>
    )
}
export default User;