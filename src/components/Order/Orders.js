import React from 'react';

const Orders = (props) => {
    const { order_name, order_price, order_image } = props.order;
    const dekhikhajkoreni = props.orderLength;
    console.log("props: ", props.order);
    console.log("props length: ", dekhikhajkoreni);
    let sum = 0;
    for(let i = 0; i < dekhikhajkoreni; i++) {
        sum = sum + parseInt(order_price);
    }
    return (
        <div>
            <div className="d-flex align-items-center justify-content-around mt-2 pt-2 pb-2">
            <h4 className="text-light text-uppercase bg-info pt-2 pb-2 rounded">Name: {order_name}</h4>
                <h4 className="text-light bg-success pt-2 pb-2 rounded">Price: {order_price}$</h4>
                <img className="h-25 w-25 rounded-circle border border-warning" src={order_image} alt="" />
            </div>
        </div>
        
    );
};

export default Orders;