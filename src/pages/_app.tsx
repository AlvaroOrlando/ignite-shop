/* eslint-disable @next/next/no-img-element */
import type { AppProps } from 'next/app'
import { globalStyles } from '@/styles/global'

import logoimg from "../assets/logo.svg"

import { Container, Header } from '@/styles/pages/app'

globalStyles()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Container>

      <Header>
        <img src={logoimg.src} alt="logo" />
      </Header>

      <Component {...pageProps} />
    </Container>
  )
}
