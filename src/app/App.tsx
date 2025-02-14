import React, { useState } from 'react';
import { Switch, Link, Route, useLocation } from 'react-router-dom';
import HomePage from '../screens/homePage';
import OrdersPage from '../screens/ordersPage';
import UserPage from '../screens/userPage';
import HelpPage from '../screens/helpPage';
import HomeNavbar from './components/headrs/HomeNavbar';
import OtherNavbar from './components/headrs/OtherNavbar';
import Footer from './components/footer';
import Test from "../screens/Test";
import '../css/app.css';
import '../css/navbar.css';
import '../css/footer.css';
import { CartItem } from '../lib/types/search';
import useBasket from './hooks/useBasket';
import AuthenticationModal from './components/auth';
import { T } from '../lib/types/common';
import { sweetErrorHandling, sweetTopSuccessAlert } from '../lib/sweetAlert';
import { Messages } from '../lib/config';
import MemberService from './services/MemeberService';
import { useGlobals } from './hooks/useGlobals';
import JewelryPageMain from '../screens/jewelryPage';
import FavoritePage from '../screens/favoritePage';
function App() {
  const location = useLocation();
  const { setAuthMember } = useGlobals();
  const { cartItems, onAdd, onDelete, onDeleteAll, onRemove } = useBasket();
  const [signupOpen, setSignupOpen] = useState<boolean>(false);
  const [loginOpen, setLoginOpen] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);


  /* Handlers */
  const handleSignupClose = () => setSignupOpen(false);
  const handleLoginClose = () => setLoginOpen(false);
  const handleLogoutClick = (e: T) => {
    setAnchorEl(e.currentTarget);
  };
  const handleCloseLogout = () => setAnchorEl(null);
  const handleLogoutRequest = async () => {
    try {
      const member = new MemberService();
      await member.logout();
      handleCloseLogout();
      await sweetTopSuccessAlert("success", 700);
      setAuthMember(null);
    } catch (err) {
      console.log(err);
      sweetErrorHandling(Messages.error1);
      handleCloseLogout();
    }
  };



  return (
    <>
      {location.pathname === "/"
        ? <HomeNavbar
          cartItems={cartItems}
          onAdd={onAdd}
          onRemove={onRemove}
          onDeleteAll={onDeleteAll}
          onDelete={onDelete}
          setSignupOpen={setSignupOpen}
          setLoginOpen={setLoginOpen}
          anchorEl={anchorEl}
          handleLogoutClick={handleLogoutClick}
          handleCloseLogout={handleCloseLogout}
          handleLogoutRequest={handleLogoutRequest}
        />
        : <OtherNavbar
          cartItems={cartItems}
          onAdd={onAdd} onRemove={onRemove}
          onDeleteAll={onDeleteAll}
          onDelete={onDelete}
          setSignupOpen={setSignupOpen}
          setLoginOpen={setLoginOpen}
          anchorEl={anchorEl}
          handleLogoutClick={handleLogoutClick}
          handleCloseLogout={handleCloseLogout}
          handleLogoutRequest={handleLogoutRequest}
        />}
      <Switch>
        <Route path="/jewelry">
          <JewelryPageMain onAdd={onAdd} />
        </Route>
        <Route path="/orders">
          <OrdersPage />
        </Route>
        <Route path="/user">
          <UserPage />
        </Route>
        <Route path="/favorite">
          <FavoritePage />
        </Route>
        <Route path="/help">
          <HelpPage />
        </Route>
        <Route path="/">
          < HomePage />
        </Route>
      </Switch>
      <Footer />

      <AuthenticationModal
        signupOpen={signupOpen}
        loginOpen={loginOpen}
        handleLoginClose={handleLoginClose}
        handleSignupClose={handleSignupClose}
      />
    </>
  );
}

export default App;
