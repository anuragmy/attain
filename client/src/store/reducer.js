import * as actionTypes from "./actionTypes";

const initialStateAuth = {
  signedIn: false,
  user: "",
  token: "",
  authLoading: false,
  error: "",
};

export const authReducer = (state = initialStateAuth, action) => {
  const { payload } = action;

  switch (action.type) {
    case actionTypes.SIGNEDIN:
      return {
        ...state,
        token: payload.token,
        user: payload.user,
        signedIn: true,
      };
    case actionTypes.SIGNOUT:
      return {
        ...state,
        token: "",
        user: "",
        signedIn: false,
      };

    default:
      return state;
  }
};
