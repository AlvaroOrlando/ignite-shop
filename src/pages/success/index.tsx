
import { stripe } from "@/lib/stripe";
import { SuccessContainer, SuccessImageContainer } from "@/styles/pages/success";
import { GetServerSideProps } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Stripe from "stripe";

interface SuccessProps {
    customerName: string;
    products: {
        name: string;
        imgUrl: string;
        quantity: number;
        id:string;
    }[];
}


export default function Success({ customerName, products }: SuccessProps) {

    const totalQuantity = products.reduce((total, product) => total + product.quantity, 0);

    return (
        <>
            <Head>
                <title>Compra efetuada | Ignite Shop</title>
                <meta name="robots" content="noindex" />
            </Head>
            <SuccessContainer>
                <h1>Compra efetuada!</h1>
                <section>
                    {products.map((product, index) => (
                        <SuccessImageContainer key={`${product.id}_${index}`}>
                            <Image src={product.imgUrl} width={120} height={110} alt={product.name} />
                        </SuccessImageContainer>
                    ))}
                </section>
                <p>
                    Uhull, <strong>{customerName}</strong>, sua compra de <strong>{totalQuantity} camisetas</strong> já está a caminho da sua casa!
                </p>

                <Link href="/">Voltar ao catálogo</Link>
            </SuccessContainer>
        </>
    );
}


export const getServerSideProps: GetServerSideProps = async ({ query }) => {
    const sessionIds = Array.isArray(query.session_id) ? query.session_id : [query.session_id];

    if (!query.session_id || sessionIds.length === 0) {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        };
    }

    const products = [];
    let customerName: string = '';

    for (const sessionId of sessionIds) {
        const session = await stripe.checkout.sessions.retrieve(String(sessionId), {
            expand: ['line_items.data.price.product', 'customer']
        });


        const lineItems = session.line_items?.data;
        customerName = session.customer_details?.name || customerName;

        if (lineItems && lineItems.length > 0) {
            
            for (const lineItem of lineItems) {
                const product = lineItem.price?.product as Stripe.Product;
                const productName = product.name;
                const quantity = lineItem.quantity;

                const productImgUrl = product.images.length > 0 ? String(product.images[0]) : '';
                

                products.push({
                    name: productName,
                    imgUrl: productImgUrl,
                    quantity
                });
            }
        }
    }

    return {
        props: {
            customerName:customerName,
            products
        }
    };
};
