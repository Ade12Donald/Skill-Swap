// Layout.jsx
import { Suspense } from "react";
import { Outlet } from "react-router";
import Navbar from "./Navbar.jsx";
import Loader from "./Loader.jsx";

export default function Layout() {
  return (
    <>
      <Navbar />
      <main>
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </main>
    </>
  );
}
