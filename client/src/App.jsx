import { Routes, Route } from "react-router";
import Home from "./pages/Home.jsx";
import signUp from "./pages/signUp.jsx";
import Layout from "./components/layout.jsx";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/signUp" element={<signUp />} />
      </Route>
    </Routes>
  );
}

export default App;
