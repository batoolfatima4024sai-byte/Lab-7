import { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(
    () => localStorage.getItem("loggedIn") === "true"
  );

  const updateLogin = (value) => {
    setLoggedIn(value);
    localStorage.setItem("loggedIn", String(value));
  };
  return (
    <UserContext.Provider
      value={{ loggedIn, setLoggedIn: updateLogin }}
    >
      {children}
    </UserContext.Provider>
  );
};
