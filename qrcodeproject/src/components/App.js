import Header from "./Header";
import MenuSection from "./MenuSection";
import SearchBar from "./SearchBar";
import SectionsScroll from "./SectionsScroll";
import Item from "../models/Item";

import itemPicture from "../media/mahmoud-fawzy-EqoCUzG9200-unsplash.jpg"
import anotherItemPicture from "../media/mahmoud-fawzy-BOJ8RP7-VQA-unsplash.jpg"
import moreItemPicture from "../media/Shrimp Roll.jpg"

function App({ name, altName }) {
  document.title = name;
  return (
    <>
      <Header name={name} altName={altName} />
      <SearchBar />
      <SectionsScroll sections={["Popular", "Appetizers", "Rolls", "Sashimi", "Sushi", "Rice", "Drinks"]} />
      <MenuSection sectionName={"Popular"} items={
        [
          Item(itemPicture, "Salmon Roll", "8 Pieces Assorted Rolls", "Salmon, Cucumber, Rice...", 35),
          Item(anotherItemPicture, "Crab Rice Bowl", "Delicious Bowl of Rice", "Crab, Rice, Sesame...", 40),
          Item(moreItemPicture, "Avocado Tuna Sushi", "12 Pieces Deluxe Sushi", "Tuna, Avocado, Rice...", 45)
        ]
      } />
    </>

  );
}

export default App;
