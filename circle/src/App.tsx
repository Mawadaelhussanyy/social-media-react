import "./App.css";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Feed from "./pages/Feed";
import Post from "./pages/Post";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout";
import MainLayout from "./layouts/MainLayout";
import Profile from "./pages/Profile";
import Notfound from "./pages/Notfound";
import ProtectedRoute from "./protectedRoutes/ProtectedRoute";
import { HeroUIProvider } from "@heroui/react";
import CounterContextProvider from "./contexts/counterContext";
import AuthContextProvider from "./contexts/authContext";

const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    children: [
      { path: "/signup", element: <SignUp /> },
      { path: "/signin", element: <SignIn /> },
    ],
  },

  {
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: (
          <ProtectedRoute>
            <Feed />
          </ProtectedRoute>
        ),
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/post",
        element: (
          <ProtectedRoute>
            <Post />
          </ProtectedRoute>
        ),
      },
    ],
  },

  {
    path: "*",
    element: <Notfound />,
  },
]);

function App() {
  return (
    <HeroUIProvider>
      <AuthContextProvider>
        <CounterContextProvider>
          <RouterProvider router={router} />
        </CounterContextProvider>
      </AuthContextProvider>
    </HeroUIProvider>
  );
}

export default App;