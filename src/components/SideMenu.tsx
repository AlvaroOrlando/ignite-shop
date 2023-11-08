
import Image from 'next/image';
import { useState } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import bagImg from '../assets/bag.svg';

import productImage from '../assets/camisetas/1.png'

import { theme } from '../styles/index';


import { useShoppingCart } from '../hooks/useShoppingCart'

import { 
  CustomOffcanvasCloseButton, 
  CustomOffcanvasFooter, 
  CustomOffcanvasTitle, 
  ProductContainer, 
  ProductDescriptionContainer, 
  ProductImageContainer, 
  Products 
} from '../styles/components/sideMenu'; 

import { ShoppinCartProvider, ShoppingCartContext } from '@/context/shoppingCartContext';

export default function SideMenu() {

  const { getAllItemsQuantity } = useShoppingCart()

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const itemsInBag = getAllItemsQuantity();

  const customStyles = {
    backgroundColor:theme.colors.gray800,
    color:theme.colors.white,
    paddingLeft:'3rem',
    width:'100%',
    maxWidth:'480px',
    padding:'2rem',
  }

  return (
    <>
      <button onClick={handleShow}>
        {itemsInBag !== 0 && <span>{itemsInBag}</span>}
        <Image src={bagImg} alt="sacola" />
      </button>
      
      <Offcanvas show={show} onHide={handleClose} placement="end" style={customStyles}>
        <CustomOffcanvasTitle>Sacola de compras</CustomOffcanvasTitle>
        <CustomOffcanvasCloseButton onClick={handleClose}>&times;</CustomOffcanvasCloseButton>

        <Offcanvas.Body className='mt-4'>
          <Products>
            <ProductContainer>
              <ProductImageContainer>
                <Image src={productImage} width={94} height={94} alt=''/>
              </ProductImageContainer>
              <ProductDescriptionContainer>
                  <h1>Camiseta Beyond the Limits</h1>
                  <span>R$ 79,90</span>
                  <button>Remover</button>
              </ProductDescriptionContainer>
            </ProductContainer>
            <ProductContainer>
              <ProductImageContainer>
                <Image src={productImage} width={94} height={94} alt=''/>
              </ProductImageContainer>
              <ProductDescriptionContainer>
                  <h1>Camiseta Beyond the Limits</h1>
                  <span>R$ 79,90</span>
                  <button>Remover</button>
                </ProductDescriptionContainer>
            </ProductContainer>
          </Products>
        </Offcanvas.Body>

        <CustomOffcanvasFooter>
          <section>
            <div className='quantity'>
              <span>Quantidade</span>
              <span>3 items</span>
            </div>
            <div className='total'>
              <span>Valor Total</span>
              <div>R$ 270,00</div>
            </div>
          </section>
          <button>Finalizar compra</button>
        </CustomOffcanvasFooter>

      </Offcanvas>
    </>
  );
}
