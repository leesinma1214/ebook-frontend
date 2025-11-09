import { type FC } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./views/Home";
import SignUp from "./views/SignUp";
import Container from "./components/common/Container";
import Verify from "./views/Verify";
import NewUser from "./views/NewUser";

const App: FC = () => {
  return (
    <Container>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="/new-user" element={<NewUser />} />
      </Routes>
    </Container>
  );
};

export default App;
