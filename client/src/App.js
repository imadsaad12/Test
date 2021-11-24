import { BrowserRouter as Router , Routes,Route} from "react-router-dom"
import Home from "./Components/Home";
import 'semantic-ui-css/semantic.min.css'
import Navbar from "./Components/NavBar/NavBar";
import Profile from "./Components/Profile";

function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route  path="/" element={< Home/>} />
        <Route  path="/models/:id" element={< Profile/>} />
      </Routes>
    </Router>
  );
}

export default App;
