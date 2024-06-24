
import './App.css';

import { Routes, Route } from'react-router-dom';
import Home from './Components/Home/Home';
import Dashboard from './Components/Dashboard/Dashboard';
import Summary from './Components/Summary/Summary';
import Code from './Components/Code/Code';
import Chat from './Components/Chat/Chat';
import ImageReader from './Components/ImageReader/ImageReader';

function App() {
  return (
    <div >
     
       <Routes>
          <Route  path='/' element={<Home/>}/>
          <Route  path='/dashboard' element={<Dashboard/>}/>
          <Route  path='/summary' element={<Summary/>}/>
          <Route  path='/code' element={<Code/>}/>
          <Route  path='/chat' element={<Chat/>}/>
          <Route  path='/imageReader' element={<ImageReader/>}/>

       </Routes>
    </div>
  );
}

export default App;
