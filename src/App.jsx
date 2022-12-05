import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.scss';
import './AppLib.scss'
import Login from './Components/Login'
import Guest from './Components/Guest';
import ExpPage from './Components/Guest/Experience/ExpPage'
import Admin from './Components/Admin';
import { useContext } from 'react';
import { AuthContext } from './Context/AuthContext';

function App() {

  const {currentUser} = useContext(AuthContext)

  const RequireAuth = ({children}) => {
    return currentUser ? (children) : <Navigate to="/Login"/> ;
  };

  console.log(currentUser)

  return (
    <div className="App">

      <BrowserRouter>
        <Routes>
          <Route path='/'>
            <Route index path='/Guest' element={<Guest />}/>
            <Route path='/Login' element={<Login />} />
            <Route path='/ExpPage' element={<ExpPage />} />
            <Route path='/Admin' element={
              <RequireAuth>
                <Admin />
              </RequireAuth>
            } 
            />
          </Route>
        </Routes>
      </BrowserRouter>

      
    </div>
  );
}

export default App;
