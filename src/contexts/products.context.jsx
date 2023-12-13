import { createContext, useState, useEffect } from "react";
import { onAuthStateChangedListener, createUserDocumentFromAuth} from "../utils/firebase/firebase.utils";

import PRODUCTS from '../shop-data.json';

export const ProductsContext = createContext({
    products: [],
    setproducts: () => null,
})

export const ProductsProvider = ({children}) => {
    const [products, setproducts] = useState(PRODUCTS);
    const value = {products};

    return <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>
}