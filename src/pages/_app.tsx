import "bootstrap/dist/css/bootstrap.min.css";
import type { AppProps } from 'next/app'
import { globalStyles } from '@/styles/global'

import logoimg from "../assets/logo.svg"

import { BagContainer, MainContainer, Header } from '@/styles/pages/app'
import Image from 'next/image'
import SideMenu from '@/components/SideMenu'
import { ShoppinCartProvider } from "@/context/shoppingCartContext";
import { useRouter } from 'next/router';
import Link from "next/link";


globalStyles()

export default function App({ Component, pageProps }: AppProps) {

  const router = useRouter(); 
  const isOnSuccessPage = router.pathname === '/success';

  return (
    <ShoppinCartProvider>
      <MainContainer>
        <Header>
          <Link href='/'>
           <Image src={logoimg} alt="logo" style={{ width: isOnSuccessPage ? '100%' : 'auto' }} />
          </Link>
          {!isOnSuccessPage && (
            <BagContainer>
              <SideMenu />
            </BagContainer>
          )}
        </Header>

        <Component {...pageProps} />
      </MainContainer>
    </ShoppinCartProvider>
  )
}
