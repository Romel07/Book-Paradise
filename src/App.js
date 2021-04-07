import './App.css';
import React, { createContext, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Admin from './components/Admin/AddBook';
import ManageBook from './components/Admin/ManageBook';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import CheckOut from './components/CheckOut/CheckOut';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import Orders from './components/Orders/Orders';

export const UserContext = createContext()

function App() {
  const [loggedInUser, setLoggedInUser] = useState({})
  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <Router>
        <div>
          <h1>Book Paradise Dot Com</h1>
          <h5>One Stop Service for your Stydy............</h5>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/orders">Orders</Link>
              </li>
              <li>
                <Link to="/admin">Admin</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
            </ul>
          </nav>
          <Switch>
            <PrivateRoute path="/orders">
              <Orders />
            </PrivateRoute>
            <Route path="/admin">
              <Admin />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/managebook">
              <ManageBook />
            </Route>
            <PrivateRoute path={`/book/:bookId`}>
              <CheckOut />
            </PrivateRoute>
            <Route path="/">
              <Home />
            </Route>

          </Switch>
        </div>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
