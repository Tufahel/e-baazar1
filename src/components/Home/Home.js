import React, { useEffect, useState } from 'react';
import Header from '../Header/Header';
import Products from '../Products/Products';


const Home = () => {

    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        fetch('https://still-anchorage-58870.herokuapp.com/products')
        .then(res => res.json())
        .then(data => setProducts(data))
    }, [])
    
    return (
        <div className="row">
            <Header></Header>
            {
                products.map(product =><Products product={product}></Products>)
            }
        </div>
    );
};

export default Home;