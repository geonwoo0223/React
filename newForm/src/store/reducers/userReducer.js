
import { LOGIN,LOGOUT } from '.././actions/actionTypes'


const initialState = {
  isLogin : false,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN : {
      return {
        ...state,
        isLogin: action.isLogin,
      }
    }
    case LOGOUT : {
      return {
        ...state,
        isLogin: action.isLogin,
      }
    }
    default: {
      return state
    }
  }
}

export default userReducer
