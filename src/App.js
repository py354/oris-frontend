import Header from "./components/header/Header";
import {Route, Routes} from "react-router-dom";
import {Fragment} from "react";
import Shop from "./components/shop/Shop";
import Basket from "./components/basket/Basket";
import Profile from "./components/profile/Profile";
import axios from "axios";

function App() {
  axios.defaults.withCredentials = true;

  return (
      <Fragment>
          <Header></Header>
          <Routes>
              <Route path="/" element={<Shop/>}></Route>
              <Route path="/basket" element={<Basket/>}></Route>
              <Route path="/profile" element={<Profile/>}></Route>
          </Routes>
      </Fragment>
  );
}

export default App;
