import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import Home from './components/Home';
import About from './components/About';
import Navbar from './components/Navbar';
import NoteState from "./context/notes/NoteState";
import Alert from "./components/Alert";
import { useState } from "react";
import Login from "./components/Login";
import Signup from "./components/Signup";

function App() {
  const [alert, setAlert] = useState(null)
  const showAlert=(msg,type)=>{
    setAlert({
      msg: msg,
      type: type
    })
  }
  
  setTimeout(() => {
    setAlert(null)
  }, 2000);

  return (
    <NoteState>
      <BrowserRouter>
        <Navbar/>
        <Alert alert={alert}/>
        <Routes>
          <Route exact path="/" element= {<Home showAlert={showAlert}/>} />
          <Route exact path="/about" element= {<About showAlert={showAlert}/>} />
          <Route exact path="/login" element= {<Login showAlert={showAlert}/>} />
          <Route exact path="/signup" element= {<Signup showAlert={showAlert}/>} />
        </Routes>
      </BrowserRouter>
    </NoteState>
  );
}

export default App;