import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Salary from "./pages/Salary";
import AppoimentDetail from "./pages/AppoinmentDetail";
import Error404 from "./pages/Error404";
import LayoutDefault from "./layout/LayoutDefault";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LayoutDefault />}>
          <Route index element={<Home />} />
          <Route path="profile" element={<Profile />} />
          <Route path="salary" element={<Salary />} />
          <Route path="appoinmentDetail/:id" element={<AppoimentDetail />} />
        </Route>
        <Route path="*" element={<Error404 />} />
      </Routes>
    </>
  );
}

export default App;
