import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { productsPrps } from "../home";
import { BsCartPlus } from "react-icons/bs";
import toast from "react-hot-toast";
import { CartContext } from "../../contexts/cartContext";

import { api } from "../../services/api";

export function Deteail(){
    const [product, setProduct] = useState<productsPrps>();
    const { id } = useParams();
      const { addItemCart } = useContext(CartContext);
      const navigate = useNavigate();

    useEffect(() => {
      async function getProduct(){
        const response = await api.get(`/products/${id}`);
        setProduct(response.data);
      }
      getProduct();

    },[id])


        function handleAddCartItem(product: productsPrps) {
         toast.success("Produto adicionado ao carrinho", {
           style: {
             borderRadius: "10px",
             background: "#333",
             color: "#fff",
             marginTop: 20,
             fontSize: 12,
           },
         });
          //console.log( produto);
          addItemCart(product);
          navigate("/cart")
        }




    return (
      <div>
        <main className="w-full max-w-6xl px-4 mx-auto  my-5">
          {product && (
            <section key={product.id} className="w-full ">
              <div className="flex justify-between flex-col lg:flex-row">
                <img
                  className="w-full flex-1 rounded-lg max-h-72 object-contain"
                  src={product.cover}
                  alt={product.title}
                />

                <div className="flex-1">
                  <h1 className="font-bold text-2xl mb-2">{product?.title}</h1>
                  <p className="my-4 text-sm">{product.description}</p>
                  <div className="flex gap-2">
                    <span className="font-bold text-green-700">
                      {product.price.toLocaleString("pt-PT", {
                        style: "currency",
                        currency: "EUR",
                      })}
                    </span>
                    <button
                      className="bg-zinc-900 p-1 rounded"
                      onClick={() => handleAddCartItem(product)}
                    >
                      <BsCartPlus size={20} color="#ffff" />
                    </button>
                  </div>
                </div>
              </div>
            </section>
          )}
        </main>
      </div>
    );
}