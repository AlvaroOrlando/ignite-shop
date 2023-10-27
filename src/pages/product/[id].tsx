import { ImageContainer, ProductContainer, ProductDetails } from '@/styles/pages/product'
import { useRouter } from 'next/router'

export default function Product(){

const {query} = useRouter()
    return (
        <ProductContainer>
            <ImageContainer>
                
            </ImageContainer>

            <ProductDetails>
                <h1>Camiseta X</h1>
                <span>R$ 79,00</span>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsum fuga in nihil magni itaque reiciendis maxime rerum! 
                    Suscipit, ab, asperiores, architecto quibusdam laboriosam eligendi nisi quod quae at maxime incidunt.
                </p>
                <button>Comprar agora</button>
            </ProductDetails>
        </ProductContainer>
    )
}