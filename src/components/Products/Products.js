import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
import Header from '../Header/Header';

const Products = ({product}) => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const orderInfo = (id, name, price, imageURL) => {
        console.log("kunta kow")
        console.log(id, name, price, imageURL);
        const Order = {
            order_id: id,
            order_name: name,
            order_price: price,
            order_image: imageURL
        }
        const url = `https://still-anchorage-58870.herokuapp.com/orderList`
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(Order)
        })
        .then(res => console.log('server side response'))
    
    }
    return (
        <div className="col-md-4 mt-3">
            <img className="h-75 w-100 rounded" src={product.imageURL} alt=""/>
            <div className="d-flex justify-content-around mt-2 bg-primary pt-2 pb-2 rounded">
                <h4 className="text-light text-uppercase">Name: {product.name}</h4>
                <h4 className="text-light">Price: {product.cost}$</h4>
                {/* <h3>{product._id}</h3> */}
                {loggedInUser.name === undefined && <Link className="nav-link btn btn-light text-danger fw-bold fs-5 text" to="/login">Buy</Link>}
                {loggedInUser.name && <Link className="nav-link btn btn-light text-danger fw-bold fs-5 text" onClick={() => orderInfo(product._id, product.name, product.cost, product.imageURL)}>Add To List</Link>}
                </div>
            {/* <h3>{product.name} <button onClick={() => deleteEvent(product._id)}>Delete</button></h3>
             */}
        </div>
    );
};

export default Products;