import SearchIcon from "@material-ui/icons/Search";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import { useStateValue } from "./StateProvider";
import { auth } from "./firebase";

const Header = () => {
  const [{ basket, user }, dispatch] = useStateValue();

  const handleAuthentication = () => {
    if (user) {
      auth.signOut();
    }
  };

  return (
    <div className="header">
      <Link to="/">
        <img className="header__logo" src="logo.png" alt="" />
      </Link>

      <div className="header__search">
        <input className="header__searchInput" type="text" />
        <SearchIcon className="header__searchIcon" />
      </div>
      <div className="header__nav">
        <Link to={!user && "/login"} style={{ textDecoration: "none" }}>
          <div className="header__option" onClick={handleAuthentication}>
            <span className="header__optionLineOne">
              {" "}
              Hello {!user ? "Guest" : user?.email}
            </span>
            <span className="header__optionLineTwo">
              {" "}
              {user ? "Sign Out" : "Sign In"}
            </span>
          </div>
        </Link>
        <div className="header__option">
          <span className="header__optionLineOne">Returns</span>
          <span className="header__optionLineTwo">Orders</span>
        </div>
        <div className="header__option">
          <span className="header__optionLineOne">Your</span>
          <span className="header__optionLineTwo">Price</span>
        </div>
        <div className="header__optionBasket">
          <Link to="/checkout">
            <ShoppingBasketIcon />
          </Link>
          <span className="header__optionLineTwo header__basketCount">
            {basket?.length}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Header;
