import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import CreateUser from "./components/CreateUser";
import UpdateUser from "./components/UpdateUser";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/adduser" element={<CreateUser />} />
        <Route exact path="/users/:id" element={<UpdateUser />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
