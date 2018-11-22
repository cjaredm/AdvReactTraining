import React from 'react';
import CartStyles from './styles/CartStyles';
import Supreme from './styles/Supreme';
import CloseButton from './styles/CloseButton';
import SickButton from './styles/SickButton';

const Cart = props => {
  // TODO: Get apollo to handle the state of this being open
  return (
    <CartStyles open={true}>
      <header>
        <CloseButton title="close">&times;</CloseButton>
        <Supreme>Your Cart</Supreme>
        <p>You Have {'__'} Items in your cart.</p>
      </header>

      <footer>
        <p>{'$10.10'}</p>
        <SickButton>Checkout</SickButton>
      </footer>
    </CartStyles>
  );
};

export default Cart;
