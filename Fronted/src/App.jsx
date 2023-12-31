import { Route, Routes } from "react-router-dom";
import CreateUser from "./Components/CreateUser";
import UpdateUser from "./Components/UpdateUser";
import UsersList from "./Components/UsersList";

function App() {
  return (
    <Routes>
      <Route path="/" element={<UsersList />} />
      <Route path="/user/new" element={<CreateUser />} />
      <Route path="/user/edit/:id" element={<UpdateUser />} />
    </Routes>
  );
}

export default App;
