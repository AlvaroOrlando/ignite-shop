
import { SuccessContainer, SuccessImageContainer } from "@/styles/pages/success";
import Link from "next/link";

export default function Success(){
    return (
       <SuccessContainer>
        <h1>Compra efetuada!</h1>

        <SuccessImageContainer>

        </SuccessImageContainer>

        <p>
            Uhull, <strong>Alvaro Orlando</strong>, sua camiseta <strong>Ignite</strong> já está a caminho da sua casa!
        </p>

        <Link href="/">
            Voltar ao catálogo
        </Link>
       </SuccessContainer>
    )
}