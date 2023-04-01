import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotesStates from './context/NotesStates';
import ViewNotes from './components/ViewNotes';
import AddNotes from './components/Notes/AddNotes';
import Login from './components/Login';
import SignUp from './components/SignUp';
import PublicArticles from './components/PublicArticles';

function App() {

  return (
  <NotesStates>
    <div className="App">
        <BrowserRouter>
          <Routes>          
            <Route path="/" element={<Login/>} />
            <Route path="/PublicArticles" element={<PublicArticles/>} />
            <Route path="/Home" element={<ViewNotes/>} />
            <Route path="/About" element={<AddNotes/>} />
            <Route path="/Login" element={<Login/>} />
            <Route path="/SignUp" element={<SignUp/>} />
            

          </Routes>
      </BrowserRouter>
    </div>
  </NotesStates>
  );
}

export default App;
