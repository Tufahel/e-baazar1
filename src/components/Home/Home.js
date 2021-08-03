import React, { useEffect, useState } from 'react';
import Header from '../Header/Header';
import Products from '../Products/Products';


const Home = () => {

    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5055/products')
            .then(res => res.json())
            .then(data => setProducts(data))
    }, [])

    return (
        <div className="bg-light mw-100 mh-100">
            <Header></Header>
            <div className="mt-2 row container-fluid">

                {
                    products.map(product => <Products product={product}></Products>)
                }

            </div>
        </div>
    );
};

export default Home;