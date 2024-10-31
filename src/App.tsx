import { Route, Routes } from "react-router-dom";
import Pages from "./container/Pages/Pages.tsx";
import { Container } from "@mui/material";
import Navbar from "./components/Navbar/Navbar.tsx";
import AdminForm from "./components/AdminForm/AdminForm.tsx";

const App = () => {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <Container>
        <Routes>
          <Route path="/pages/:contentPage" element={<Pages />} />
          <Route path="/" element={<Pages />} />
          <Route path="/pages/Admin" element={<AdminForm />} />
          <Route path="*" element={<h1>Not found</h1>} />
        </Routes>
      </Container>
    </>
  );
};

export default App;
