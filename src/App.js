import { BrowserRouter, Route, Routes } from 'react-router-dom';

import './App.css';
import Navigation from './component/Navbar';
import Home from './pages/Home';
import Leaderboard from './component/Leaderboard';
import Signup from './pages/Signup';
import Otp from './pages/Otp';
import Login from './pages/Login';
import useAuthContext from './hooks/useAuthContext'

function App() {
  const YaleID = JSON.parse(localStorage.getItem('YaleID'))
  const {Auth} = useAuthContext()
  return (
    <div className="App">
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path='/' element={Auth? <Home /> : <Login/>} />
          <Route path='/leaderboard' element={Auth ? <Leaderboard /> : <Login/>} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup/otp' element={<Otp />} />
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
