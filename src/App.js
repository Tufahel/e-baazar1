import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import { createContext, useState } from 'react';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import AddProducts from './components/AddProducts/AddProducts';
import Products from './components/Products/Products';
import OrderList from './components/Order/OrderList';

export const UserContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
       {/* <h3>Email: {loggedInUser.email}</h3> */}
      <Router>
        <Switch>
          <Route exact path="/">
            <Home></Home>
          </Route>
          <Route path="/home">
            <Home></Home>
          </Route>
          <Route path="/login">
            <Login></Login>
          </Route>
          <PrivateRoute path="/orderList">
            <OrderList></OrderList>
          </PrivateRoute>
          <Route path="/addProducts">
            <AddProducts></AddProducts>
          </Route>
          {/* <PrivateRoute path="/myOrders">
            <MyOrders  user={loggedInUser}/>
          </PrivateRoute>
          <PrivateRoute path="/allBooks">
            <AllBookInfo />
          </PrivateRoute>
          <PrivateRoute path="/addBook">
            <AddBook />
          </PrivateRoute> */}
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
