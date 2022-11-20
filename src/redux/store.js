import { createStore, combineReducers } from 'redux';
import { configureStore } from "@reduxjs/toolkit";
import { loginReducer } from './loginreducer';
import { rootReducer } from './rootreducer';
import { modalShowHide, modalShowHideReducer } from './modalReducer';

const store = configureStore({
    reducer: {
      root: rootReducer,
      modalAction: modalShowHide,
      modalShowHide: modalShowHideReducer
    },
});
  
export default store;