import React, { createContext, useContext, useReducer } from "react";

//prepare data layout
export const StateContext = createContext();

//wrap out app and provide the data layer
export const StateProvider = ({ reducer, initialState, children }) => {
  return (
    <StateContext.Provider value={useReducer(reducer, initialState)}>
      {children}
    </StateContext.Provider>
  );
};

//pull informatin from the data layer
export const useStateValue = () => useContext(StateContext);
