import SelectedItem from "../pages/SelectedItem";
import Menu from "../pages/Menu";
import {
  BrowserRouter as Router, Routes,
  Route
} from "react-router-dom";

const name = "Sushizanmai Honten"
const altName = "すしざんまい 本店"

function App() {
  document.title = name;
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Menu name={name} altName={altName} />} />
          <Route path="/item" element={<SelectedItem />} />
        </Routes>
      </Router>
    </>

  );
}

export default App;
