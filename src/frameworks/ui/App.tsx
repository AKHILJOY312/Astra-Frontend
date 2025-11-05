// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { Provider } from "react-redux";
// import { store } from "./store";
// import Home from "./pages/Home"
// import LoginPage from "./pages/LoginPage";
// import Dashboard from './pages/Dashboard';
// import ProtectedRoute from "./components/ProtectedRoute";

// function App() {
//   return (
//     <Provider store={store}>
//       <BrowserRouter>
//         <Routes>
//           <Route path="/home"></Route>
//           {/* <Route path="/login" element={<LoginPage />} /> */}
//           {/* <Route
//             path="/*"
//             element={<ProtectedRoute>{<Dashboard /> }</ProtectedRoute>}
//           /> */}
//         </Routes>
//       </BrowserRouter>
//     </Provider>
//   );
// }
// src/frameworks/ui/App.tsx
import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "@/frameworks/ui/redux/store/index";
import routes from "@/interface-adapters/routes/config.ts";
import MainLayout from "./layout/MainLayout";
import AuthLayout from "./layout/AuthLayout";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

const App = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {routes.map((routeItem) => {
            const LazyComponent = lazy(
              () => import(`../../frameworks/ui/pages/${routeItem.component}`)
            );

            let element = <LazyComponent />;

            // Wrap with ProtectedRoute if needed
            if (routeItem.protected) {
              element = <ProtectedRoute>{element}</ProtectedRoute>;
            }

            // Wrap with layout
            if (routeItem.layout === "auth") {
              element = <AuthLayout>{element}</AuthLayout>;
            } else {
              // default to main layout
              element = <MainLayout>{element}</MainLayout>;
            }

            return (
              <Route
                key={routeItem.path}
                path={routeItem.path}
                element={element}
              />
            );
          })}

          <Route path="*" element={<div>404</div>} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
