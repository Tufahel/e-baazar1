import React from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import { UserContext } from '../../App';
import Header from '../Header/Header';
import Orders from './Orders';


const OrderList = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [orders, setOrders] = useState([]);
    //const [cart, setCarts] = useState([]);
    const dataLength = orders.length;
    //console.log("data length", datalength);

    useEffect(() => {
        fetch('http://localhost:5055/getOrder')
        .then(res => res.json())
        .then(data => {console.log("order ", data);setOrders(data)})
    }, [])

    return (
        <div>
            <Header></Header>
            <div className="d-flex align-items-center justify-content-around mt-2">
                <h2 className="text-dark text-uppercase">Your Ordered Product details are below.</h2>
            </div>
            <div className="d-flex align-items-center justify-content-around mt-2">
            <button className=" btn btn-primary text-danger fw-bold fs-5 text text-light" onClick={() => setLoggedInUser({})}>You Want To Procede? Click Here...</button>
            </div>
            <div className="bg-dark">
            {
                orders.map(order =><Orders orderLength={dataLength} order={order}></Orders>)
            }
            </div>
        </div>
    );
};

export default OrderList;