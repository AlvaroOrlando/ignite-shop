/* eslint-disable @next/next/no-img-element */
import type { AppProps } from 'next/app'
import { globalStyles } from '@/styles/global'

import logoimg from "../assets/logo.svg"
import bagImg from "../assets/bag.svg"

import { BagContainer, Container, Header } from '@/styles/pages/app'
import Image from 'next/image'

globalStyles()

export default function App({ Component, pageProps }: AppProps) {

  const itemsInBag = 0  

  return (
    <Container>

      <Header>
        <Image src={logoimg} alt="logo" />
        <BagContainer>
          {itemsInBag !== 0 && <span>{itemsInBag}</span>}
          <Image src={bagImg} alt="sacola" />
        </BagContainer>
      </Header>

      <Component {...pageProps} />
    </Container>
  )
}
