/* eslint-disable @next/next/no-img-element */
import type { AppProps } from 'next/app'
import { globalStyles } from '@/styles/global'

import logoimg from "../assets/logo.svg"

import { Container, Header } from '@/styles/pages/app'
import Image from 'next/image'

globalStyles()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Container>

      <Header>
        <Image src={logoimg} alt="logo" />
      </Header>

      <Component {...pageProps} />
    </Container>
  )
}
