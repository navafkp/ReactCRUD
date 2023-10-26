
import './App.css';
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './User/Pages/Login'
import Register from './User/Pages/Register';
import Home from './User/Pages/Home';
import AdminLogin from './Admin/Pages/AdminLogin'
import AdminHome from './Admin/Pages/AdminHome'

function App() {
  return (
    <Router>
      <Routes>
   {/* user */}
        <Route path='/' exact element={<Login/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/home' element={<Home/>}/>

{/* admin */}
        <Route path='/admin' element={<AdminLogin/>} />
        <Route path='/admin-home' element={<AdminHome/>} />


      </Routes>
    </Router>
  );
}

export default App;
