import './App.css';
import { BrowserRouter,
        Routes,
        Route,
    }
from 'react-router-dom'; 

import Home from './pages/Home/Home.component';
import Register  from './pages/Register/Register.component';
import Login from './pages/Login/Login.component';
import Navigation from './components/shared/Navigation/Navigation.component';

const App = () => {
  
  return (
    <BrowserRouter>
      <Navigation/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
      </Routes>
    </BrowserRouter>
  );
  
}

export default App;
