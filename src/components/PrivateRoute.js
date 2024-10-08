import { Navigate } from "react-router";

function PrivateRoute({ token ,children}){
            if(token){
                return children;
            }
            else{
                return <Navigate to="/login"/>
            }

}

export default PrivateRoute;