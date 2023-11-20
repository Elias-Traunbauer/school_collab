import { createContext } from "react";
import User from "../models/User";
import LoadingState from "../models/Loadingstate";

interface UserContextData {
  userContext: User,
  setUserContext: any,
  loadingState: LoadingState,
  setLoadingState: any,
}
  
  const UserContext = createContext<UserContextData>({
    userContext: {
      id: 0,
      version: '0',
      username: "",
      email: "",
      firstName: "",
      lastName: "",
    },
    setUserContext: () => {},
    loadingState: {
      isLoaded: false,
      triedLoading: false,
      reload: false,
    },
    setLoadingState: () => {},
  });

export default UserContext;