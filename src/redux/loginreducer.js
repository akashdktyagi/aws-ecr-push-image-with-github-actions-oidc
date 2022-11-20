import { LOGIN, LOGOUT } from "./action";

const initialState = {
    login: false,
    userToken: '',
    usertype: ''
}

export const loginReducer= (state = initialState, action) =>{
    // debugger;
    switch (action.type) {
      case LOGIN : {
        return {
        ...state,
        userToken: action.userToken,
        login: action.login,
        usertype: action.usertype
      }
    };
    case LOGOUT : {
        return {
        ...state,
        userToken: action.userToken,
        login: action.login
        }
    };
    default:
        return state;
        break;
    }
}