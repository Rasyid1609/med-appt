import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import Landing_Page from './Components/Landing_Page/Landing_Page';
import Login from './Components/Login/Login';
import Sign_Up from './Components/Sign_Up/Sign_Up';
import InstantConsultation from './Components/InstantConsultation/InstantConsultation';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar />
        <Routes>
          <Route path='/' element={<Landing_Page/>} />
          <Route path='/Login' element={<Login/>} />
          <Route path='/Sign_Up' element={<Sign_Up/>} />
          <Route path='instant-consultation' element={<InstantConsultation/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
