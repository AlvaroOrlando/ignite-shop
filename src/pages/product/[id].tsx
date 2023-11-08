import { stripe } from '@/lib/stripe'
import { ImageContainer, ProductContainer, ProductDetails } from '@/styles/pages/product'
import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useState } from 'react'
import Stripe from 'stripe'

import { useShoppingCart } from "../../hooks/useShoppingCart"

import { formatCurrency } from '../../utilities/utilities'

interface ProductProps {
    product:{
        id:string;
        name:string;
        imageUrl:string;
        price:string;
        description:string;
        defaultPriceId:string;
    }
}

export default function Product({ product }:ProductProps){

    const { increaseCartQuantity } = useShoppingCart()

    const [isCreatingCheckoutSession, setIsCreatingCheckoutSession ] = useState(false)

    // async function handleBuyProduct(){
    //     try {

    //         setIsCreatingCheckoutSession(true)

    //         const response = await axios.post('/api/checkout', {
    //             priceId:product.defaultPriceId
    //         })

    //         const { checkoutUrl } = response.data;

    //         //rota externa (para usar rota interna, usar router.push())
    //         window.location.href = checkoutUrl

    //     } catch(err) {

    //         setIsCreatingCheckoutSession(false)

    //         //Conectar com alguma ferramenta de observabilidade (Datadog / Sentry)
    //         alert('Falha ao redirecionar ao checkout')
    //     } 
    // }

    const { isFallback } = useRouter()

    if(isFallback){
        return <h1>Loading...</h1>
    }


    async function handleAddToCart(){

        increaseCartQuantity(product);

        console.log('Produto adicionado ao carrinho:', product)
    }

    return (
        <>
        <Head>
         <title>{product.name} - Ignite Shop</title>
        </Head>
          <ProductContainer>
            <ImageContainer>
                <Image  src={product.imageUrl} width={520} height={480} alt=''/>
            </ImageContainer>

            <ProductDetails>
                <h1>{product.name}</h1>
                <span>{formatCurrency(parseFloat(product.price))}</span>
                <p>
                    {product.description}
                </p>
                <button onClick={handleAddToCart} disabled={isCreatingCheckoutSession}>Colocar na sacola</button>
            </ProductDetails>
          </ProductContainer>
        </>
    )
}

export const getStaticPaths: GetStaticPaths = async() => {
    return {
        paths: [
            {
              params: { id:'prod_Osib82526Ib1xQ' }
            }
        ],
        fallback: true
    }
    
}

export const getStaticProps: GetStaticProps = async ({ params }) => {

    const productId = String(params?.id)

    const product = await stripe.products.retrieve(productId, {
        expand: ['default_price'],
    })

    const price = product.default_price as Stripe.Price

    const revalidationTime = 60 * 60 * 1 //1 hour

    const ProductListing = {
        id: product.id,
        name: product.name,
        imageUrl: product.images[0],
        price: price.unit_amount,
        description: product.description,
        defaultPriceId: price.id
    }

    return {

        props:{
            product:ProductListing 
        },

        revalidate: revalidationTime
    }
}

