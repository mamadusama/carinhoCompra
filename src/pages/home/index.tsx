import { useEffect, useState, useContext } from "react";

import { BsCartPlus } from "react-icons/bs";
import {api} from "../../services/api";
import { CartContext } from "../../contexts/cartContext"

import tostes from "react-hot-toast"
import { Link } from "react-router-dom";

export interface productsPrps {
  id: number;
  title: string;
  description: string;
  price: number;
  cover: string;
}
export function Home(){
    const [products, setProducts] = useState<productsPrps[]>([]);
    const { addItemCart } = useContext(CartContext);



    useEffect(() => {
      async function getProduct(){
        const response = await api.get("/products");
        setProducts(response.data);
      }
      getProduct();

    },[])

   function handleAddCartItem(produto: productsPrps) {
      tostes.success("Produto adicionado ao carrinho",{
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
          marginTop: 20,
          fontSize: 12
        }
      })
      //console.log( produto);
      addItemCart(produto)
    }
    // funçao para acessar o detales do item clicado e consequentemente na pagina de detalhes de produto


    return (
      <div>
        <main className="w-full max-w-6xl px-4 mx-auto">
          <h1 className="font-bold text-2xl mb-4  mt-10 text-center">
            Produtos em alta
          </h1>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-5">
            {products.map((produto) => (
              <section key={produto.id} className="w-full ">
                <Link to={`/product/${produto.id}`}>
                  <img
                    className="w-full rounded-lg max-h-70 mb-2"
                    src={produto.cover}
                    alt={produto.title}
                  />
                  <p className="font-medium mb-2 mt-1">{produto.title}</p>
                </Link>

                <div className="flex  gap-3 items-center ">
                  <strong className="text-zinc-700/90">
                    {produto.price.toLocaleString("pt-PT", {
                      style: "currency",
                      currency: "EUR",
                    })}
                  </strong>

                  <button
                    onClick={() => handleAddCartItem(produto)}
                    className="bg-zinc-900 p-1 rounded"
                  >
                    <BsCartPlus size={20} color="#ffff" />
                  </button>
                </div>
              </section>
            ))}
          </div>
        </main>
      </div>
    );
}