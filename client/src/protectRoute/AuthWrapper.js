
// removing the wrapper from APP because when userAuth is being updated,

import { useContext } from "react";
import DataContext from "../context/DataContext";
import { Navigate } from "react-router-dom";

// it is continuously updating Dashboard.
const AuthWrapper = ({ children }) => {
    const { userAuth } = useContext(DataContext);

    if (userAuth.isLoggedIn) {
        return children;
    } else {
        return <Navigate to="/" />;
    }
};

export default AuthWrapper;