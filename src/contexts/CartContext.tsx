import { createContext, ReactNode, useState  } from 'react';
import { productsPrps } from "../pages/home"

interface CartContextData {
  cart: CartProps[];
  cartAmount: number;
  addItemCart: (newItem: productsPrps) => void;
  removeItemCart: (product: CartProps) => void;
  total:string
}

interface CartProps{
  id: number;
  title: string;
  description: string;
  price: number;
  cover: string;
  amount: number;
  total: number;
}

interface CartProviderProps{
  children: ReactNode;
}

export const CartContext = createContext({} as CartContextData)

function CartProvider({ children }: CartProviderProps){
  const [cart, setCart] = useState<CartProps[]>([]);
  const [total, setTotal] = useState("");


  //funçao para adicionar item no carrinho

  function addItemCart(newItem: productsPrps){
    const indexItem = cart.findIndex(item => item.id === newItem.id)

    //verifica se o item ja existe no carrinho() e depois quando clicar num item 2 vezes ele nao adiona o mesmo item 2 ou mais vezes , simplesmente só muda a quantidade desse produto
    if(indexItem !== -1){

     // se entrou aqui apenas soma +1 na quantidade e calculamos o total desse carrinho.
   /*   let cartList = cart; */
   let cartList = [...cart];

     cartList[indexItem].amount = cartList[indexItem].amount +1;
      cartList[indexItem].total = cartList[indexItem].amount * cartList[indexItem].price;
      setCart(cartList);
      totalResultCart(cartList);
      return;
     //outra forma de simplificar isso é:
      //cartList[indexItem].amount += 1;
      //cartList[indexItem].total = cartList[indexItem].amount * cartList[indexItem].price;
    }
   
    //adicionar esse item na nossa lista .
    let data = {
      ...newItem, // copia da lista
      amount: 1,
      total: newItem.price
    }

    setCart(products => [...products, data]);
    totalResultCart([...cart, data])
  

  }

  // funçao para remover item do carinho

  function removeItemCart(product : CartProps){
    //remove item do carrinho
    const indexItem = cart.findIndex(item => item.id === product.id)

    if(cart[indexItem]?.amount > 1){
      // diminuir apenas amaount do que voce tem de item em cada clique
     /*  let cartList = cart; */
     let cartList = [...cart];
     
      cartList[indexItem].amount = cartList[indexItem].amount -1

      cartList[indexItem].total = cartList[indexItem].total - cartList[indexItem].price
      setCart(cartList);
      totalResultCart(cartList);
      return;

      //outra forma de fazer é:
      //cartList[indexItem].amount -= 1;
    }

    //se tiver apenas 1 item ele remove o item do carrinho
    const removeItem = cart.filter(item => item.id !== product.id)
    setCart(removeItem);
    totalResultCart(removeItem);
  }


  //funçao para exibir o total

  function totalResultCart(item: CartProps[]){
    let myCart = item;
    let result = myCart.reduce((acc, item)=> { return acc + item.total }, 0);
 
     const formatResult = result.toLocaleString("pt-PT", {
        style: "currency",
        currency: "EUR"
     })
     
      setTotal(formatResult);
  }


  return (
    <CartContext.Provider
      value={{
        cart,
        cartAmount: cart.length,
        addItemCart,
        removeItemCart,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;