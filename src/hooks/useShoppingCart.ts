import { useContext }from 'react'

import  { ShoppingCartContext } from '../context/shoppingCartContext'

export function useShoppingCart(){
    return useContext(ShoppingCartContext)
}