import { stripe } from '@/lib/stripe'
import { ImageContainer, ProductContainer, ProductDetails } from '@/styles/pages/product'
import axios from 'axios'
import { GetStaticPaths, GetStaticProps } from 'next'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useState } from 'react'
import Stripe from 'stripe'

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

    const [isCreatingCheckoutSession, setIsCreatingCheckoutSession ] = useState(false)

    async function handleBuyProduct(){
        try {

            setIsCreatingCheckoutSession(true)

            const response = await axios.post('/api/checkout', {
                priceId:product.defaultPriceId
            })

            const { checkoutUrl } = response.data;

            //rota externa (para usar rota interna, usar router.push())
            window.location.href = checkoutUrl

        } catch(err) {

            setIsCreatingCheckoutSession(false)

            //Conectar com alguma ferramenta de observabilidade (Datadog / Sentry)
            alert('Falha ao redirecionar ao checkout')
        } 
    }

    const { isFallback } = useRouter()

    if(isFallback){
        return <h1>Loading...</h1>
    }

    return (
        <ProductContainer>
            <ImageContainer>
                <Image  src={product.imageUrl} width={520} height={480} alt=''/>
            </ImageContainer>

            <ProductDetails>
                <h1>{product.name}</h1>
                <span>{product.price}</span>
                <p>
                    {product.description}
                </p>
                <button onClick={handleBuyProduct} disabled={isCreatingCheckoutSession}>Comprar agora</button>
            </ProductDetails>
        </ProductContainer>
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

    const IntlConfig = {
        style: 'currency',
        currency: 'BRL'
      }

    const formatedPrice = new Intl.NumberFormat('pt-BR', IntlConfig).format(price.unit_amount ? price.unit_amount / 100 : 0)

    const ProductListing = {
        id: product.id,
        name: product.name,
        imageUrl: product.images[0],
        price: formatedPrice,
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

