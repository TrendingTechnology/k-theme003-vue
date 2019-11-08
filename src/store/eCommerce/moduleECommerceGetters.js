export default {
  isInCart: state => itemId => {
    return state.cartItems.some(item => item.objectID == itemId);
  },
  isInWishList: state => itemId => {
    return state.wishList.some(item => item.objectID == itemId);
  }
};
