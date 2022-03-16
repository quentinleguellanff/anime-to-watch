import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import Favorites from './components/Favorites/Favorites';
import NotFound from './components/NotFound/NotFound';
import Navbar from './components/Navbar/Navbar';

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <Navbar/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/favorites' element={<Favorites/>}/>
          <Route path='*' element={<NotFound/>}/>
        </Routes>
      </header>
    </div>
  );
}




export default App;
