import { createBrowserRouter } from "react-router-dom";
import Products from "../views/products.js";
import ItemDetail from "../views/itemDetail.js";
import CatCom from "../views/catCom.js";
import App from '../App.js'
export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
    },
    {
        path: '/products',
        element: <Products />,
    },
    {
        path: '/products/item/:id',
        element: <ItemDetail />,
    },
    {
        path: '/categorys-companys',
        element: <CatCom />,
    }
])