import { useContext } from "react";
import { CartContext } from "../../contexts/cartContext";
import { Link } from "react-router-dom";




export function Cart(){
  const { cart, total, addItemCart, removeItemCart } = useContext(CartContext);
  return (
    <div className="w-full max-w-6xl mx-auto">
      <h1 className="font-medium text-2xl text-center my-4">Meu carrinho</h1>

      {/* mostrar essa mensagem caso o carrinho estiver vazia */}
      {cart.length === 0 && (
        <div className="flex flex-col items-center justify-center">
          <p className="text-center font-medium">
            Ops! Seu carrinho está vazio...
          </p>

          <div className="bg-slate-600 my-3 rounded p-1 flex items-center justify-center px-3">
            <Link to="/" className="  text-white font-medium items-center">
              acessar lista dos produtos
            </Link>
          </div>
        </div>
      )}

      {cart.map((item) => (
        <section key={item.id}
          className="flex items-center justify-between border-b-2 border-gray-300"
        >
          <img src={item.cover} alt={item.title} className="w-28" />

          <strong>
            Preço:
            {item.price.toLocaleString("pt-PT", {
              style: "currency",
              currency: "EUR",
            })}
          </strong>

          <div className="flex items-center justify-center gap-3">
            <button
            onClick={()=> removeItemCart(item)}
            className="bg-slate-600 px-2 rounded text-white font-medium flex items-center justify-center">
              -
            </button>
            {item.amount}
            <button
              onClick={() => addItemCart(item)}
              className="bg-slate-600 px-2 rounded text-white font-medium flex items-center justify-center"
            >
              +
            </button>
          </div>

          <strong className="float-right">
            SubTotal:
            {item.total.toLocaleString("pt-PT", {
              style: "currency",
              currency: "EUR",
            })}
          </strong>
        </section>
      ))}

      {cart.length !== 0 && <p className="font-bold mt-4">Total: {total}</p>}
    </div>
  );
}