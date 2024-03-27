import './App.css';
import {Routes, Route} from "react-router-dom";
import Homepage from './Pages/Homepage';
import ChatPage from './Pages/ChatPage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" Component={Homepage}/>
        <Route path='/chats' Component={ChatPage}/>
      </Routes>
    </div>
  );
}

export default App;
