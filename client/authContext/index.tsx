//statt redux
import { useContext, createContext } from "react";

interface IContextProps {
  //query state
  user: any;
  //mutation methods
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (username: string, email: string, password: string) => Promise<void>;
  signOut: () => void;
}

const AuthContext = createContext<Partial<IContextProps>>({});

export const AuthProvider = ({ children }) => {
  //Query: user from apollo => get logged in user
  //Mutation: signin, signup, sign out (just remove token from storage) => signin, signup
  // query and state into the value object of the provider
  return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
