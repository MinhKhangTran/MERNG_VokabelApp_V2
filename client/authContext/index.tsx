//statt redux
import { useLogged_In_UserQuery } from "lib/graphql/loggedInUser.graphql";
import { useSigninMutation } from "lib/graphql/signin.graphql";
import { useSignupMutation } from "lib/graphql/signup.graphql";
import { useContext, createContext } from "react";
import { useApolloClient } from "@apollo/client";
import { useRouter } from "next/router";

interface IUser {
  __typename: "User";
  _id: string;
  email: string;
  username: string;
}
interface IContextProps {
  //query state
  user: IUser;
  loginLoading: boolean;
  registerLoading: boolean;
  //mutation methods
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (username: string, email: string, password: string) => Promise<void>;
  signOut: () => void;
}

const AuthContext = createContext<Partial<IContextProps>>({});

export const AuthProvider = ({ children }) => {
  const router = useRouter();
  const client = useApolloClient();
  //Query: user from apollo => get logged in user

  const { data } = useLogged_In_UserQuery({
    fetchPolicy: "network-only",
    errorPolicy: "ignore",
  });
  const user = data?.getLoggedUser;
  //Mutation: signin, signup, sign out (just remove token from storage) => signin, signup
  // query and state into the value object of the provider

  const [signinMutation, { loading: loginLoading }] = useSigninMutation();
  const [signupMutation, { loading: registerLoading }] = useSignupMutation();

  const signIn = async (email, password) => {
    try {
      //signinMutation returns a Promise therefor we need async/await
      const { data } = await signinMutation({ variables: { email, password } });
      if (data.login.token && data.login.user) {
        sessionStorage.setItem("token", data.login.token);
        //client resetStore at login to refetch and set to cache
        client.resetStore().then(() => {
          router.push("/");
        });
      } else {
        throw new Error("Login schlug fehl");
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const signUp = async (email, username, password) => {
    try {
      const { data } = await signupMutation({
        variables: { password, email, username },
      });
      if (data.register.token && data.register.user) {
        sessionStorage.setItem("token", data.register.token);
        //client resetStore
        client.resetStore().then(() => {
          router.push("/");
        });
      } else {
        throw new Error("Registrierung schlug fehl");
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const signOut = () => {
    sessionStorage.removeItem("token");
    client.resetStore().then(() => {
      router.push("/");
    });
  };
  return (
    <AuthContext.Provider
      value={{ user, signIn, signUp, signOut, loginLoading, registerLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
