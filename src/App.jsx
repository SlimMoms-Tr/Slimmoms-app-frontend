import { Suspense, lazy, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Loader from "./components/Loader/Loader.jsx";
import { getUser } from "./redux/auth/auth_operation";
import { getIsAuthenticated } from "./redux/auth/auth_selector";

import routes from "./routes";

import "./App.css";
import "react-toastify/dist/ReactToastify.css";

const MainPage = lazy(() => import("./pages/MainPage/MainPage.jsx"));
const DiaryPage = lazy(() => import("./pages/DiaryPage/DiaryPage.jsx"));
const CalculatorPage = lazy(() =>
  import("./pages/CalculatorPage/CalculatorPage.jsx")
);
const LoginPage = lazy(() => import("./pages/LoginPage/LoginPage.jsx"));
const RegistrationPage = lazy(() =>
  import("./pages/RegistrationPage/RegistrationPage.jsx")
);

const App = () => {
  const dispatch = useDispatch();
  const isAccess = useSelector(getIsAuthenticated);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(getUser());
    }
  }, [dispatch]);

  return (
    <>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route
            path={routes.home}
            element={
              isAccess ? <Navigate to={routes.calculator} /> : <MainPage />
            }
          />
          <Route
            path={routes.login}
            element={
              isAccess ? <Navigate to={routes.calculator} /> : <LoginPage />
            }
          />
          <Route
            path={routes.registration}
            element={
              isAccess ? (
                <Navigate to={routes.calculator} />
              ) : (
                <RegistrationPage />
              )
            }
          />
          <Route
            path={routes.diary}
            element={isAccess ? <DiaryPage /> : <Navigate to={routes.login} />}
          />
          <Route
            path={routes.calculator}
            element={
              isAccess ? <CalculatorPage /> : <Navigate to={routes.login} />
            }
          />
          {/* Tüm bilinmeyen rotalar için fallback */}
          <Route path="*" element={<Navigate to={routes.home} />} />
        </Routes>
      </Suspense>

      <ToastContainer autoClose={2500} />
    </>
  );
};

export default App;
