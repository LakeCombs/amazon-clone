export const initialState = {
  basket: [],
  user: null,
};

// selector;

//please when using the reduce method make sure you don't return with a curly bracket ()=>{}
export const getBasketTotal = (basket) =>
  basket?.reduce((amount, item) => item.price + amount, 0);

//the for look didn't work
// export const getBasketTotal = (basket) => {
//   let amount = 0;
//   for (let item = 0; item < basket?.length; item++) {
//     let itemPrice = item.price;
//     amount += itemPrice;
//   }
//   return amount;
//   console.log(amount);
// };

export const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_BASKET":
      return {
        ...state,
        basket: [...state.basket, action.item],
      };

    case "EMPTY_BASKET":
      return {
        ...state,
        basket: [],
      };

    case "REMOVE_FROM_BASKET":
      //this code will remove all the item with the id and that is not what we want
      //in case of we have the same id
      // return {
      //   ...state,
      //   basket: state.basket.filter((item) => item.id !== action.id),
      // };
      const index = state.basket.findIndex(
        (basketItem) => basketItem.id === action.id
      );
      let newBasket = [...state.basket];
      if (index >= 0) {
        newBasket.splice(index, 1);
      } else {
        console.warn(
          `cant remove product (id: ${action.id})  as its not in basket!`
        );
      }

      return {
        basket: newBasket,
      };

    case "SET_USER":
      return {
        ...state,
        user: action.user,
      };

    default:
      return state;
  }
};
