import React, { useContext, useState } from 'react';
import { UserContext } from "../../App";
import { Link, useHistory, useLocation } from "react-router-dom";
import { initializeLoginFramework, signInWithEmailAndPassword, handleGoogleSignIn, handleSignOut, handleFbSignIn, createUserWithEmailAndPassword } from './loginManager';
import Gmail from '../../images/gmail.png';
import Header from '../Header/Header';

function Login() {
    const [newUser, setNewUser] = useState(false);
    const [user, setUser] = useState({
        isSignedIn: false,
        name: '',
        email: '',
        photo: ''
    });

    initializeLoginFramework();
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const history = useHistory();
    const location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };

    const googleSignIn = () => {
        handleGoogleSignIn()
            .then(res => {
                handleResponse(res, true);
            })
    }

    const signOut = () => {
        handleSignOut()
            .then(res => {
                handleResponse(res, false);
            })
    }

    const handleResponse = (res, redirect) => {
        setUser(res);
        setLoggedInUser(res);
        if (redirect) {
            history.replace(from);
        }
    }

    const handleBlur = (event) => {
        //debugger;
        //console.log();
        //console.log(event.target.name+': '+event.target.value);
        let isFieldValid = true;
        if (event.target.name === 'email') {
            isFieldValid = /\S@\S+\.\S+/.test(event.target.value);
            //console.log(isEmailValid);
        }
        if (event.target.name === 'password') {
            const isPasswordValid = event.target.value.length > 6;
            const passwordHasNumber = /\d{1}/.test(event.target.value);
            isFieldValid = isPasswordValid && passwordHasNumber;
        }
        if (isFieldValid) {
            const newUserInfo = { ...user };
            newUserInfo[event.target.name] = event.target.value;
            setUser(newUserInfo);
        }
    }
    const handleSubmit = (event) => {
        //console.log(user.email, user.password)
        if (newUser && user.email && user.password) {
            //console.log('submitting');
            createUserWithEmailAndPassword(user.name, user.email, user.password)
                .then(res => {
                    handleResponse(res, true);
                })

        }
        if (!newUser && user.email && user.password) {
            signInWithEmailAndPassword(user.email, user.password)
                .then(res => {
                    handleResponse(res, true);
                })
        }

        event.preventDefault();
    }



    return (
        <div>
            <Header></Header>
            <div style={{ textAlign: 'center' }}>
                <form action="" onSubmit={handleSubmit}>
                    <div className="form-group">
                        {newUser && <input className="w-25 mb-2" type="text" onBlur={handleBlur} name="name" placeholder="Name" />}
                    </div>
                    <div className="form-group">
                        <input className="w-25 mb-2" type="text" onBlur={handleBlur} name="email" placeholder="Email" required />
                    </div>
                    <div className="form-group">
                        <input className="w-25 mb-2" type="password" onBlur={handleBlur} name="password" placeholder="Password" required />
                    </div>
                    <div className="form-group">
                        {newUser && <input className="w-25 mb-2" type="password" onBlur={handleBlur} name="password" placeholder="Confirm Password" required />}
                    </div>
                    <div className="form-group">
                    <input className="btn btn-primary w-25 mb-2" type="submit" value={newUser ? 'Create an Account' : 'Login Using Email'} />
                    </div>
                    <div className="form-group justify-content-center align-items-center d-flex">
                    {!newUser && <p className="bg-light w-25 round">Do not have an account? <Link> <input type="checkbox" onChange={() => setNewUser(!newUser)} name="newUser" id="" />
                            <label htmlFor="newUser">Create an account.</label></Link></p>}
                    {newUser && <p className="bg-light w-25 round">Already have an account? <a href="">Login</a></p>}
                    </div>
                </form>
                <p style={{ color: 'red' }} >{user.error}</p>
                {
                    user.success && <p style={{ color: 'green' }} >User {newUser ? 'created' : 'Logged In'} succesfully.</p>
                }
            </div>
            <div style={{ textAlign: 'center' }}>
                <img src={Gmail} style={{width: '45px', marginRight: '10px', textAlign : 'center'}} alt="" />
                {
                    user.isSignedIn ? <button onClick={signOut} >Log out</button> :
                        <button className="btn btn-danger" onClick={googleSignIn} >Log in using Google</button>
                }                
                <br />
                

            </div>

        </div>
    );
}

export default Login;
