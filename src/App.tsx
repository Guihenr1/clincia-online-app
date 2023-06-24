import {
  BrowserRouter,
  Route,
  Routes,
  createBrowserRouter,
  createRoutesFromElements,
  defer,
} from "react-router-dom";
import Doctor from "./pages/Doctor/Doctor";
import Base from "./pages/Base/Base";
import { AuthLayout } from "./components/Security/AuthLayout";
import Login from "./pages/Login";
import Patient from "./pages/Patient";
import Patner from "./pages/Patner";

const getUserData = () =>
  new Promise((resolve) => {
    const user = window.localStorage.getItem("user");
    resolve(user);
  });

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      element={<AuthLayout />}
      loader={() => defer({ userPromise: getUserData() })}
    >
      <Route path="/" element={<Login />} />

      <Route element={<Base />}>
        <Route path="/doctor" element={<Doctor />} />
        <Route path="/patient" element={<Patient />} />
        <Route path="/patner" element={<Patner />} />
      </Route>
    </Route>
  )
);
