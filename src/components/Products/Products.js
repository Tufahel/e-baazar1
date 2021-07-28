import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
import Header from '../Header/Header';

const Products = ({product}) => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    return (
        <div className="col-md-4 mt-3">
            <img className="h-75 w-100" src={product.imageURL} alt=""/>
            <div className="d-flex justify-content-around">
                <h3>{product.name}</h3>
                <h3>{product.cost}</h3>
                {/* <h3>{product._id}</h3> */}
                {loggedInUser.name === undefined && <Link className="nav-link btn btn-warning" to="/login">Buy</Link>}
                {loggedInUser.name && <Link className="nav-link btn btn-warning" to="/orderList">Buy</Link>}
                </div>
            {/* <h3>{product.name} <button onClick={() => deleteEvent(product._id)}>Delete</button></h3>
             */}
        </div>
    );
};

export default Products;