import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import UpdateUser from './component/UpdateUser';
import User from './component/User';
import CreateUser from './component/CreateUser';


function App() {
  return (
   <div>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<User />}/>
        <Route path='/create' element= {<CreateUser/>}/>
        <Route path='/updateUser/:id' element= {<UpdateUser/>}/>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
