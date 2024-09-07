"use client"
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const NewUser = ({ params }) => {
    const route = useRouter();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [estado, setEstado] = useState('');

    useEffect(() => {
        if (params.id) {
            fetch(`/api/user/${params.id}`)
                .then(res => res.json())
                .then(data => {
                    setName(data.name)
                    setEmail(data.email)
                    setEstado('edit')
                })
        } else {
            setEstado('new')
        }

    }, [])

    const onsubmit = async (e) => {
        e.preventDefault();

        if (estado === 'new') {

            const res = await fetch('/api/user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },

                body: JSON.stringify({
                    name: name,
                    email: email
                })

            })
            if (res.ok) {
                alert('Usuario creado')
                route.refresh();
                route.push('/users');
            } else {
                console.error("error al crear new user", res)
            }

        } else {
            const res = await fetch(`/api/user/${params.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: name,
                    email: email
                })
            })
            if (res.ok) {
                alert('Usuario actualizado')
                route.refresh();
                route.push('/users');
            }
        }
    }



    return (

        <div>
            <Link href={"/users"}>return to the main page</Link>
            <h1>New User registration</h1>

            <form onSubmit={onsubmit}>
                <fieldset>
                    <legend> Data user</legend>
                    <div>
                        <input
                            type="text"
                            placeholder="Nombre"
                            required
                            onChange={(e) => { setName(e.target.value) }}
                            value={name}
                        />
                    </div>
                    <div>
                        <input
                            type="email"
                            placeholder="Correo"
                            onChange={(e) => { setEmail(e.target.value) }}
                            required
                            value={email}
                        />
                    </div>
                    <br />
                    <div>
                        {estado === 'edit' ? (

                            <button type="submit"style={{"background-color":"green","color":"white"}}>Actualizar</button>
                        ):(

                            <button type="submit" style={{"background-color":"green","color":"white"}}>Guardar</button>
                        )
                    }
                        <button type="button" onClick={() => route.push('/users')}style={{"background-color":"red","color":"white"}}>Cancelar</button>
                    </div>
                </fieldset>
            </form>
        </div>
    )
}
export default NewUser;