import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import New from "./pages/new/New";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { productInputs, userInputs } from "./formSource";
import "./style/dark.scss";
import 'react-toastify/dist/ReactToastify.css';
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { AuthContext } from "./context/AuthContext";
import { ToastContainer } from "react-toastify";
import Listprod from "./pages/p_list/Listprod";
import Newprod from "./pages/new_products/Newprod";
import Singlep from "./pages/singlep/Singlep";

function App() {
  const { darkMode } = useContext(DarkModeContext);

  const RequireAuth = ({ children }) => {
    const { currentUser } = useContext(AuthContext);
  
    if (!currentUser) {
      return <Navigate to="/login" />;
    }
  
    return children;
  };

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          {/* <Route path="/"> */}
            <Route path="login" element={
            <>
            <Login />
            <ToastContainer/>
            </>
            }/>
            <Route
              index
              element={
                <RequireAuth>
                  <Home />
                </RequireAuth>
              }
            />
            <Route path="users">
              <Route
                index
                element={
                  <RequireAuth>
                    <>
                    <List />
                    <ToastContainer/>
                    </>
                  </RequireAuth>
                }
              />
              <Route
                path="/users/:userId"
                element={
                  <RequireAuth>
                    <>
                    <Single />
                    <ToastContainer/>
                    </>
                  </RequireAuth>
                }
              />
              <Route
                path="new"
                element={
                  <RequireAuth>
                    <>
                    <New inputs={userInputs} title="Add New User" />
                    <ToastContainer/>
                    </>
                  </RequireAuth>
                }
              />
            </Route>
            <Route path="products">
              <Route
                index
                element={
                  <RequireAuth>
                    <>
                    <Listprod />
                    <ToastContainer/>
                    </>
                  </RequireAuth>
                }
              />
              <Route
                path="/products/:productId"
                element={
                  <RequireAuth>
                    <>
                    <Singlep />
                    <ToastContainer/>
                    </>
                  </RequireAuth>
                }
              />
              <Route
                path="new"
                element={
                  <RequireAuth>
                    <>
                    <Newprod inputs={productInputs} title="Add New Product" />
                    <ToastContainer/>
                    </>
                  </RequireAuth>
                }
              />
            </Route>
          {/* </Route> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
