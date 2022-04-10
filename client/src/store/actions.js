import * as actionTypes from "./actionTypes";
import axios from "axios";

export const SignedIn = (data) => ({
  type: actionTypes.SIGNEDIN,
  payload: data,
});

export const SignedOut = () => ({
  type: actionTypes.SIGNOUT,
});

export const restraunts = (data) => ({
  type: actionTypes.RESTRAUNTS,
  payload: data,
});

export const signIn = (payload) => async (dispatch) => {
  const { data, signIn } = payload;

  await axios
    .post(`http://localhost:3001/api/auth/${signIn ? "sign-in" : "signup"}`, {
      email: data.email,
      password: data.password,
    })
    .then((res) => {
      if (res.data && res.data.token) {
        return dispatch(
          SignedIn({ user: res.data.user, token: res.data.token })
        );
      }
    })
    .catch((err) => console.log(err));
};
