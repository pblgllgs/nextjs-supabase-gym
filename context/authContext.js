import { createContext, useReducer } from "react";

export const Authcontext = createContext();

export const ACTION_TYPE = {
  LOGIN: "LOGIN",
  LOGOUT: "LOGOUT",
};

const authReducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPE.LOGIN:
      return {
        isAuthenticated: true,
      };

    case ACTION_TYPE.LOGOUT:
      return {
        isAuthenticated: false,
      };
    default:
      state;
  }
};

export const AuthProvider = ({ children }) => {
  const initial_state = {
    isAuthenticated: false,
  };
  const [state, dispatch] = useReducer(authReducer, initial_state);
  return (
    <Authcontext.Provider value={{ state, dispatch }}>
      {children}
    </Authcontext.Provider>
  );
};
