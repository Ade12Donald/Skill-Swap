import { Routes, Route } from "react-router";
import Home from "./pages/Home.jsx";
import SignUp from "./pages/signUp.jsx";
import Layout from "./components/layout.jsx";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/signUp" element={<SignUp />} />
      </Route>
    </Routes>
  );
}

export default App;
