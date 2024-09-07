"use client"

import React, { useEffect } from 'react'
import { useState } from 'react'
import styled from 'styled-components'

const Card = styled.div`
    background-color:black;
    color:white;
    /* border-radius: 5px; */
    padding: 10px;
    margin: 10px;
    text-align: center;
`
const Container = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 10px;
`
const Products = () => {
    const [datos, setDatos] = useState([]);
    useEffect(() => {
        const getProducts = async () => {
            const res = await fetch('/api/products')
            const data = await res.json();
            setDatos(data)
        }
        getProducts();
    }, [])

    return (
        <Container>
            {
                datos.map((d) => (
                    <Card key={d.id}>
                        <h1>{d.nombre}</h1>
                        <p>precio compra-- <span style={{ "color": "green" }}>{d.precioCompra} Bs.</span></p>
                        <p>Precio Venta-- {d.precioVenta} Bs.</p>
                        <p>Stock-- {d.stock}</p>
                    </Card>
                ))
            }
        </Container>

    )
}

export default Products