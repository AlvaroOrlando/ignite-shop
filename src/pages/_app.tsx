import "bootstrap/dist/css/bootstrap.min.css";
import type { AppProps } from 'next/app'
import { globalStyles } from '@/styles/global'

import logoimg from "../assets/logo.svg"

import { BagContainer, MainContainer, Header } from '@/styles/pages/app'
import Image from 'next/image'
import SideMenu from '@/components/SideMenu'
import { ShoppinCartProvider } from "@/context/shoppingCartContext";

globalStyles()

export default function App({ Component, pageProps }: AppProps) {



  return (
    <ShoppinCartProvider>
      <MainContainer>
        <Header>
          <Image src={logoimg} alt="logo" />
          <BagContainer>
            
            <SideMenu />
          </BagContainer>
        </Header>

        <Component {...pageProps} />
      </MainContainer>
    </ShoppinCartProvider>
  )
}
