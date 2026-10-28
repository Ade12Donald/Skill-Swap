import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router";
import Loader from "./components/Loader.jsx";
import Layout from "./components/Layout.jsx";

const Home = lazy(() => import("./pages/Home.jsx"));
const SignUp = lazy(() => import("./pages/signUp.jsx"));
const Customize = lazy(() => import("./pages/customize.jsx"));

function App() {
  return (
    <Suspense fallback={<Loader fullScreen />}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/customize" element={<Customize />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
