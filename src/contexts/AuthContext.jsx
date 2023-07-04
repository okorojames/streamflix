import { createContext, useState } from "react";

export const AuthContext = createContext();
const AuthContextProvider = ({ children }) => {
  // global states
  const [passwordType, setPasswordType] = useState(true);
  // global function
  const changePassType = () => {
    setPasswordType(!passwordType);
  };
  return (
    <AuthContext.Provider value={{ passwordType, changePassType }}>
      {" "}
      {children}{" "}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
