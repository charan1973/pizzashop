import { Container } from "@chakra-ui/react";
import { Switch, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/navbar/Navbar.component";
import AdminRoute from "./components/private-routes/AdminRoute.component";
import PrivateRoute from "./components/private-routes/PrivateRoute.component";
import AdminAddOn from "./pages/admin-addon/AdminAddOn.page";
import AdminCategory from "./pages/admin-category/AdminCategory.page";
import AdminHome from "./pages/admin-home/AdminHome.page";
import AdminItem from "./pages/admin-item/AdminItem.page";
import CartPage from "./pages/cart/CartPage.page";
import Home from "./pages/home/Home.page";
import SignInAndSignUp from "./pages/signinandsignup/SignInAndSignUp.page";
import UserProfile from "./pages/user-profile/UserProfile.page";
import AdminOrder from "./pages/admin-order/AdminOrder.page";
import ErrorPage from "./pages/error/Error.page";

function App({ match }) {
  
  return (
    <Container maxW="1220px">
      <Navbar />
      <Switch>
        {/* Core routes */}
        <Route exact path="/" component={Home} />
        <Route exact path="/signin" component={SignInAndSignUp} />
        <Route exact path="/cart" component={CartPage} />
        <PrivateRoute exact path="/user/profile" component={UserProfile} />
        {/* Admin Routes */}
        <AdminRoute exact path="/admin" component={AdminHome} />
        <AdminRoute exact path="/admin/category" component={AdminCategory} />
        <AdminRoute exact path="/admin/addon" component={AdminAddOn} />
        <AdminRoute exact path="/admin/item" component={AdminItem} />
        <AdminRoute exact path="/admin/order" component={AdminOrder} />
        <Route component={ErrorPage} />
      </Switch>
    </Container>
  );
}

export default App;
