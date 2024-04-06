import { createContext, useState } from "react";

export const AuthContext = createContext<any>(null);
const AuthContextProvider = ({ children }: any) => {
  // global states
  const [passwordType, setPasswordType] = useState<boolean>(true);
  // global function
  const changePassType = () => {
    setPasswordType(!passwordType);
  };
  return (
    <AuthContext.Provider value={{ passwordType, changePassType }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
