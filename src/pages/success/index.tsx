
import { stripe } from "@/lib/stripe";
import { SuccessContainer, SuccessImageContainer } from "@/styles/pages/success";
import { GetServerSideProps } from "next";
import Image from "next/image";
import Link from "next/link";
import Stripe from "stripe";

interface SuccessProps {
    customerName:string;
    product: {
        name: string;
        imgUrl: string;
    };
}

export default function Success({ customerName, product }:SuccessProps){
    return (
       <SuccessContainer>
        <h1>Compra efetuada!</h1>

        <SuccessImageContainer>
        <Image src={product.imgUrl} width={120} height={110} alt=""/>
        </SuccessImageContainer>

        <p>
            Uhull, <strong>{customerName}</strong>, sua camiseta <strong>{product.name}</strong> já está a caminho da sua casa!
        </p>

        <Link href="/">
            Voltar ao catálogo
        </Link>
       </SuccessContainer>
    )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
    
    const sessionId = String(query.session_id)

    if(!query.session_id){
        return {
            redirect:{
                destination:'/',
                permanent:false
            }
        }
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId, {
        expand: ['line_items.data.price.product']
    })

    const customerName = session.customer_details?.name

    const product = session.line_items?.data[0].price?.product as Stripe.Product

    const productImgUrl = String(product.images[0])
    const productName = product.name


    return {
        props: {
            customerName,

            product: {
               name: productName,
               imgUrl: productImgUrl
            }
        }
      };
}