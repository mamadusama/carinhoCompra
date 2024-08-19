import { createBrowserRouter } from "react-router-dom";
import { Cart } from "./pages/card";
import { Home } from "./pages/home";
import { Deteail } from "./pages/detailProduct"
import { Layout } from "./components/layout";

import { Notfound } from "./pages/notfound";




const router = createBrowserRouter([
  {
    element: <Layout/>, // layout
    children:[
      {
        path: '/',
        element: <Home/>
      },
      {
        path: '/cart',
        element: <Cart/>
      },
      {
        path: '/product/:id',
        element: <Deteail/>
      },

      {
        path: '*',
        element: <Notfound/>
      }
    ]
    
  }
])

export {router}