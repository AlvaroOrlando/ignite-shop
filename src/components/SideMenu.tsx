
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import bagImg from '../assets/bag.svg';

import { theme } from '../styles/index';

import { useShoppingCart } from '../hooks/useShoppingCart'

import { formatCurrency } from "../utilities/utilities"

import { 
  CustomOffcanvasCloseButton, 
  CustomOffcanvasFooter, 
  CustomOffcanvasTitle, 
  ProductContainer, 
  ProductDescriptionContainer, 
  ProductImageContainer, 
  Products 
} from '../styles/components/sideMenu'; 
import axios from 'axios';

interface CartItem {
  id:string
  quantity: number
  name: string;
  price: string;
  imageUrl: string;
  description: string;
}
export default function SideMenu() {

  const { getAllItemsQuantity, cartItems, removeFromCart } = useShoppingCart()
  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession ] = useState(false)

  const calculateTotalPrice = (cartItems: CartItem[]) => {
    const totalPrice = cartItems.reduce((total, item) => {
      const itemPrice = parseFloat(item.price);
      return total + itemPrice * item.quantity;
    }, 0);
  
    return formatCurrency(totalPrice);
  };

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

  const isCartEmpty = cartItems.length === 0 

  async function handleCheckout() {
    try {

      setIsCreatingCheckoutSession(true)

      const response = await axios.post('/api/checkout', {
        cartItems: cartItems.map(item => ({
          id: item.id,
          price: item.price,
          quantity: item.quantity,
          name:item.name,
          description:item.description,
          imageUrl:item.imageUrl
        })),
      });

      const { checkoutUrl } = response.data;

    window.location.href = checkoutUrl

    } catch (error) {
      setIsCreatingCheckoutSession(false)
      console.error('Erro ao processar o checkout:', error);
    }
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
          {cartItems.map((product) => (
            [...Array(product.quantity)].map((_, index) => (
           
            <ProductContainer key={`${product.id}_${index}`}>
              <ProductImageContainer>
                <Image src={product.imageUrl} width={94} height={94} alt=''/>
              </ProductImageContainer>
              <ProductDescriptionContainer>
                  <h1>{product.name}  </h1>
                  <span>{formatCurrency(parseInt(product.price))}</span>
                  <button onClick={() => removeFromCart(product.id)}>Remover</button>
              </ProductDescriptionContainer>
            </ProductContainer>
            ))
          ))}
          
          </Products>
        </Offcanvas.Body>

        <CustomOffcanvasFooter>
          <section>
            <div className='quantity'>
              <span>Quantidade</span>
              <span>{getAllItemsQuantity()}</span>
            </div>
            <div className='total'>
              <span>Valor Total</span>
              <div>{calculateTotalPrice(cartItems)}</div>
            </div>
          </section>
          <button 
            onClick={() => handleCheckout()} 
            disabled={isCreatingCheckoutSession || isCartEmpty}>
            {isCartEmpty ? 'Sacola vazia' : 'Finalizar compra'}
          </button>
        </CustomOffcanvasFooter>

      </Offcanvas>
    </>
  );
}
