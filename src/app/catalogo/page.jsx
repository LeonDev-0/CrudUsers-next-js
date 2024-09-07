"use client"
import { useEffect } from "react";
import styled from "styled-components";
import { useState } from "react";

const Div = styled.div`
    /* color:white; */
    display: grid;
    grid-template-columns:repeat(3,1fr);
    grid-gap: 10px;
    @media(max-width:768px){
        grid-template-columns: repeat(1,1fr);

    }
    `
const Card = styled.div`
text-align: center;
    background-color:white;
    border-radius: 5px;
    padding:30px;
    margin:10px;
    `
const ContentImg = styled.div`
background-color: black;
border-radius: 19px;
contain: content;

`

const Catalogo = () => {

    const [datos, setDatos] = useState([]);

    useEffect(() => {
        const getProducts = async () => {
            const res = await fetch('https://dummyjson.com/products/category/smartphones');
            const data = await res.json();
            const { products } = data;
            setDatos(products);
        }

        getProducts();
    }, [])


    console.log(datos);
    // console.log(datos);

    return (
        <Div>
            {
                datos.map(product => {
                    return (
                        <Card>
                            <ContentImg>
                                <img src={product.thumbnail} alt="" />
                            </ContentImg>
                            <h1>{product.title}</h1>
                            <p>{product.description}</p>
                        </Card>
                    )
                })
            }

        </Div>

    )
}
export default Catalogo;