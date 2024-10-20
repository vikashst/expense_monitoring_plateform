import './App.css';
import {Routes, Route, Navigate} from 'react-router-dom' /* 1. "Routes" works as a container.  2. We can add path in "Route" */
import HomePage from './pages/HomePage.js';
import Register from './pages/Register.js';
import Login from './pages/Login.js';

function App() {
  return (
    <>
      <Routes>  {/* It works as a "container" where we store our "every single Route". */}
        <Route path='/' element= {<ProtectedRoutes><HomePage /></ProtectedRoutes>} />
        <Route path='/register' element= {<Register />} />
        <Route path='/login' element= {<Login />} />
      </Routes>
    </>
  );
}

export function ProtectedRoutes(props){   //If " 'user' ==>(means user data)" is stored in the "local storage" then you have to return "children(means children data)" and children are  "Header" and "Footer".
  if(localStorage.getItem('user')){
    return props.children
  }else{
    return <Navigate to="/login" />;
  }
}

export default App;
