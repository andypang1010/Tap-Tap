import SelectedItem from "../pages/SelectedItem";
import Home from "../pages/Home";
import Menu from "../pages/Menu";
import OrderReview from "../pages/OrderReview";
import image from "../media/Sushizanmai Honten.png"
import Bill from "../pages/Bill";
import {
  BrowserRouter as Router, Routes,
  Route
} from "react-router-dom";


const name = "Sushizanmai Honten"
const altName = "すしざんまい 本店"
const restaurantImg = image
const tax = 10

function App() {
  document.title = name;
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home name={name} altName={altName} tableNum={7} img={restaurantImg} />} />
          <Route path="/menu" element={<Menu name={name} altName={altName} img={restaurantImg} />} />
          <Route path="/item" element={<SelectedItem />} />
          <Route path="/orderReview" element={<OrderReview taxPercentage={tax} />} />
          <Route path="/bill" element={<Bill />} />

        </Routes>
      </Router>
    </>

  );
}

export default App;
