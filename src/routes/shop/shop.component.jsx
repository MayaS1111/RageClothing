import './shop.styles.scss';
import { useContext } from "react";

import { ProductsContext } from "../../contexts/products.context";
import ProductCard from "../../components/product-cart/product-card.component";

const Shop = () => {
    const {products} = useContext(ProductsContext);


    return(
        <div className='products-container'>
            {products.map((product) =>(
                <ProductCard key={products.id} product={product}/>
            ))}
        </div>
    )
}

export default Shop;