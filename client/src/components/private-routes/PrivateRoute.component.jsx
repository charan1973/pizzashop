import { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import { UserContext } from "../../context/user/UserContext";

const PrivateRoute = ({component: Component, ...rest}) => {
    const {user} = useContext(UserContext)
    return ( 
        <Route {...rest} render={props => (
            user.id ? (
                <Component {...props} />
            ): <Redirect to="/signin" />
        )} />
     );
}
 
export default PrivateRoute;