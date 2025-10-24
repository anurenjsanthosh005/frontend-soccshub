import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import AddProducts from "./pages/AddProducts";
import About from "./pages/About";
import Contact from "./pages/Contact";
import SubLayout from "./layouts/SubLayout";
import Login from "./pages/Login";
import ProtectedRoute from "./routes/ProtectedRoute";
import ListProducts from "./pages/ListProducts";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Home />} />
          <Route path="/add-products" element={<AddProducts />} />
          <Route path="/list-products" element={<ListProducts/>} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Route>
        <Route element={<SubLayout />}>
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
