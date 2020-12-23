import ItemContextProvider from "./item/ItemContext";
import UserContextProvider from "./user/UserContext";

const RootContextProvider = ({ children }) => {
  return (
    <UserContextProvider>
      <ItemContextProvider>
        {children}
      </ItemContextProvider>
    </UserContextProvider>
  );
};

export default RootContextProvider;
