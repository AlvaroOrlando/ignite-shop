import {  ReactNode, createContext, useState, FocusEvent } from 'react'

 interface ShoppinCartProviderProps {
    children: ReactNode
}

 interface ShoppingCartContext {
    getItemQuantity: (id:number) => number
    getAllItemsQuantity: () => number
    increaseCartQuantity: (id:number) => void
    decreaseCartQuantity: (id:number) => void
    removeFromCart: (id:number) => void
    cartItems:CartItem[]
    resetCart: () => void
}
 interface CartItem {
    id:number
    quantity: number
}

export const ShoppingCartContext = createContext({

} as ShoppingCartContext)


export function ShoppinCartProvider({ children }:ShoppinCartProviderProps){

        const [cartItems, setCartItems] = useState<CartItem[]>([])


        function getItemQuantity(id:number){
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

        function increaseCartQuantity(id:number){
            setCartItems(currItems => {
                if(currItems.find(item => item.id === id) == null){
                    return [...currItems, {id, quantity: 1}]
                } else {
                    return currItems.map(item => {
                        if(item.id === id){
                            return {...item, quantity: item.quantity + 1}
                        } else{
                            return item
                        }
                    })
                }
            })
        }

        function decreaseCartQuantity(id:number){
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

        function removeFromCart(id:number){
            setCartItems(currItems => {
                return currItems.filter(item => item.id !== id)
            }) 
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