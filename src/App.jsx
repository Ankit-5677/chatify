import { useContext } from "react";
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import { BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import { AuthContext } from "./context/AuthContext";


function App() {

  const {currentUser} = useContext(AuthContext);
  
  const ProtectedRoute = ({children}) => {
    if(!currentUser){
      return <Navigate to={"/login"} />
    }

    return children;
  };
  // children is a special prop in React that allows you to pass components as children to another component.
//   When you wrap a route with ProtectedRoute in your React Router setup, it checks if the user is logged in.
// If the user is logged in, the wrapped component is rendered normally.
// If the user is not logged in, the user is redirected to the /login page.

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
