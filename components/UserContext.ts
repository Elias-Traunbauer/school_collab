import { createContext } from "react";
import User from "../models/User";

interface UserContextData {
  userContext: User | null;

  setUserContext: React.Dispatch<React.SetStateAction<User | null>>;
}
  
  const UserContext = createContext<UserContextData>({
    userContext: null,
    setUserContext: () => {},
  });

export default UserContext;