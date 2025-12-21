import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import './App.css'
import Login from "./pages/Auth/Login";
import Sign from "./pages/Auth/Sign";
import Home from "./pages/Dashboard/Home";
import Income from "./pages/Dashboard/Income";
import Expense from "./pages/Dashboard/Expense";

function App() {
  

  return (
    <>
     <div>
      <Router>
        <Routes>
          <Route path="/" element={<Root/>} ></Route>
          <Route path="/login" exact element={<Login/>}></Route>
          <Route path="/sign" exact element={<Sign/>}></Route>
          <Route path="/home" exact element={<Home/>}></Route>
          <Route path="/income" exact element={<Income/>}></Route>
          <Route path="/expense" exact element={<Expense/>}></Route>

        </Routes>
      </Router>
     </div>
    </>
  )
}

export default App


const Root = () => {
  const isAuthenticated = !!localStorage.getItem("token");

  return isAuthenticated ? (
    <Navigate to="/home" />
  ) : (
    <Navigate to="/login" />
  )
}