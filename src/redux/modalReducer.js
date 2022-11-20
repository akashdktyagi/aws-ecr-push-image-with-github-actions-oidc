import { createReducer } from "@reduxjs/toolkit";
import { ISHIDE, ISOPEN } from "./action";

const initialState = {
    isOpenHide: false
}

export const modalShowHide = createReducer(
    { isOpen: false },
    {
        showModal: (state) => {
            state.isOpen = true;
        },
        hideModal: (state) => {
            state.isOpen = false;
        },
    }
);

export const modalShowHideReducer = (state = initialState, action) => {
    switch (action.type) {
        case ISOPEN:
            return {
                ...state,
                isOpenHide: true,
            }
        case ISHIDE:
            return {
                ...state,
                isOpenHide: false,
            }

        default:
            return state
            break;
    }
}
