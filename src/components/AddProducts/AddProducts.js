import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import Header from '../Header/Header';

const AddProducts = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [imageURL, setImageURL] = useState(null);


    const onSubmit = data => {
        //const cost = data.price;
        const productData = {
            name: data.name,
            imageURL: imageURL,
            cost: data.price
        };
        //const url = `https://still-anchorage-58870.herokuapp.com/addProducts`;
        const url = `https://still-anchorage-58870.herokuapp.com/addProducts`
        console.log(productData);

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productData)
        })
            .then(res => console.log('server side response'))
    }
    const handleImageUpload = event => {
        console.log(event.target.files[0]);
        const imageData = new FormData();
        imageData.set('key', '01c972fb354a5e4eb1fb46ea10f71870');
        imageData.append('image', event.target.files[0])

        axios.post('https://api.imgbb.com/1/upload',
            imageData)
            .then(function (response) {
                setImageURL(response.data.data.display_url)
            })
            .catch(function (error) {
                console.log(error);
            });

    }

    return (
        <div className="bg-light mw-100 mh-100">
            <Header></Header>
            <div className="mt-2">
            <h1 className="fw-bold fs-5 text text-dark text-center">Add your products</h1>
                <form className="text-center" onSubmit={handleSubmit(onSubmit)}>
                    <input className="w-25 mb-2" defaultValue="Product Name" {...register("name")} />
                    <br />
                    <input className="w-25 mb-2" defaultValue="Product Price" {...register("price")} />
                    <br />
                    <input className="w-25 mb-2 btn btn-info text-light fw-bold" type="file" onChange={handleImageUpload} name="exampleRequired" />
                    <br />
                    <input className="w-25 mb-2 btn btn-primary" type="submit" />
                </form>
            </div>
        </div>
    );
};

export default AddProducts;