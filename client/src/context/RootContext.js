import UserContextProvider from "./user/UserContext";

const RootContextProvider = ({ children }) => {
  return (
    <UserContextProvider>
      {children}
    </UserContextProvider>
  );
};

export default RootContextProvider;
