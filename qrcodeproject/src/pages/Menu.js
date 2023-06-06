import Header from "../components/Header";
import MenuSection from "../components/MenuSection";
// import SearchBar from "./SearchBar";
import SectionsScroll from "../components/SectionsScroll";
import Item from "../models/Item";
import Footer from "../components/Footer";
import salmonRollPicture from "../media/mahmoud-fawzy-EqoCUzG9200-unsplash.jpg"
import crabRiceBowlPicture from "../media/mahmoud-fawzy-BOJ8RP7-VQA-unsplash.jpg"
import avocadoTunaSushiPicture from "../media/Shrimp Roll.jpg"
function Menu({ name, altName }) {
  return (
    <><Header name={name} altName={altName} />
      {/* <SearchBar /> */}
      <SectionsScroll sections={["Popular", "Appetizers", "Rolls", "Sashimi", "Sushi", "Rice", "Drinks"]} />
      <div data-bs-spy="scroll" data-bs-target="#section-scroll" data-bs-root-margin="0px 0px -40%" data-bs-smooth-scroll="true" tabIndex="0">
        <MenuSection sectionName={"Popular"} items={
          [
            new Item(salmonRollPicture, "Salmon Roll", "8 Pieces Assorted Rolls", "Salmon, Cucumber, Rice...", 35),
            new Item(crabRiceBowlPicture, "Crab Rice Bowl", "Delicious Bowl of Rice", "Crab, Rice, Sesame...", 40),
            new Item(avocadoTunaSushiPicture, "Avocado Tuna Sushi", "12 Pieces Deluxe Sushi", "Tuna, Avocado, Rice...", 45)
          ]
        } />
        <MenuSection sectionName={"Sushi"} items={
          [
            new Item(salmonRollPicture, "Salmon Roll", "8 Pieces Assorted Rolls", "Salmon, Cucumber, Rice...", 35),
            new Item(crabRiceBowlPicture, "Crab Rice Bowl", "Delicious Bowl of Rice", "Crab, Rice, Sesame...", 40),
            new Item(avocadoTunaSushiPicture, "Avocado Tuna Sushi", "12 Pieces Deluxe Sushi", "Tuna, Avocado, Rice...", 45)
          ]
        } />
      </div>
      <Footer /></>
  )
}

export default Menu