import {  ReactNode, createContext, useState } from 'react'

 interface ShoppinCartProviderProps {
    children: ReactNode
}

 interface ShoppingCartContext {
    getItemQuantity: (id:string) => number
    getAllItemsQuantity: () => number
    increaseCartQuantity: (product: Product) => void;
    decreaseCartQuantity: (id:string) => void
    removeFromCart: (id:string) => void
    cartItems:CartItem[]
    resetCart: () => void
}
 interface CartItem {
    id:string
    quantity: number
    name: string;
    price: string;
    imageUrl: string;
    description: string;
}

interface Product {
    id: string;
    name: string;
    price: string;
    imageUrl: string;
    description: string;
}
  

export const ShoppingCartContext = createContext({

} as ShoppingCartContext)


export function ShoppinCartProvider({ children }:ShoppinCartProviderProps){

    const [cartItems, setCartItems] = useState<CartItem[]>([])

    function getItemQuantity(id:string){
        return cartItems.find(item => item.id === id)?.quantity || 0        
    }

    function getAllItemsQuantity(){
        const quantityArr = cartItems.map(item =>{
            return item.quantity
        })

        const sum = quantityArr.reduce((acc, num)=>{
            return acc + num
        },0)
        return sum
    }

    function increaseCartQuantity(product: Product) {
        setCartItems((currItems) => {
            const existingItem = currItems.find((item) => item.id === product.id);
        
            if (existingItem) {
            
            return currItems.map((item) =>
                item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            );
            } else {
            
            return [...currItems, { ...product, quantity: 1 }];
            }
        });
    }

    function decreaseCartQuantity(id:string){
        setCartItems(currItems => {
            if(currItems.find(item => item.id === id)?.quantity === 1){
                return currItems.filter(item => item.id !== id)
            } else {
                return currItems.map(item => {
                    if(item.id === id){
                        return {...item, quantity: item.quantity - 1}
                    } else{
                        return item
                    }
                })
            }
        })
    }

    function removeFromCart(id:string) {
        setCartItems((currItems) => {
            const itemToRemove = currItems.find((item) => item.id === id);
            if (itemToRemove) {
            if (itemToRemove.quantity === 1) {
                
                return currItems.filter((item) => item.id !== id);
            } else {
                
                return currItems.map((item) =>
                item.id === id ? { ...item, quantity: item.quantity - 1 } : item
                );
            }
            }
            return currItems;
        });
    }
        
    function resetCart(){
        setCartItems([])
    }
        

    return <ShoppingCartContext.Provider 
      value={{
        getItemQuantity,
        increaseCartQuantity, 
        decreaseCartQuantity,
        removeFromCart,
        getAllItemsQuantity,
        resetCart,
        cartItems,
      }}>
        { children }
    </ShoppingCartContext.Provider>
}