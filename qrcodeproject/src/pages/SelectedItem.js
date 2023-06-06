import { useLocation, Link } from "react-router-dom";
import backButtonIcon from "../media/Icons/round-minus.jpg"
import MenuSection from "../components/MenuSection";
import deluxeSushiPlatterPicture from "../media/riccardo-bergamini-O2yNzXdqOu0-unsplash.jpg"
import Item from "../models/Item";

const recommendedItems = [
  new Item(deluxeSushiPlatterPicture, "Deluxe Sushi Platter", "A randomly assorted sushi platter", "Something fancy", 70),
  new Item(deluxeSushiPlatterPicture, "Deluxe Sushi Platter", "A randomly assorted sushi platter", "Something fancy", 70),
  new Item(deluxeSushiPlatterPicture, "Deluxe Sushi Platter", "A randomly assorted sushi platter", "Something fancy", 70),
]

const backButtonStyle = {
  margin: "20px 0 0 20px"
}

const backButtonIconStyle = {
  width: "40px",
  height: "40px",
  borderRadius: "50%"
}

const itemImgStyle = {
  width: "100%",
  marginBottom: "10px"
}

const itemDescriptionStyle = {
  color: "gray",
  fontSize: "14px",
  marginTop: "-5px"
}

const addToCartButtonStyle = {
  margin: "auto",
  marginBottom: "20px",
  padding: "10px 0",
  width: "85%",
  height: "45px",
  textAlign: "center",
  textDecoration: "none",
  borderRadius: "22.5px",
  border: "1px solid rgba(212, 30, 30, 1)",
  backgroundColor: "rgba(212, 30, 30, 1)",
  boxShadow: "0 0 20 rgba(0, 0, 0, 0.15)"
}

const addToCartTextStyle = {
  color: "white",
}

const numItems = 5

function SelectedItem() {
  const location = useLocation();
  const { itemImage, itemName, itemIngredients, itemPrice } = location.state;

  return (
    <>
      <Link className={"fixed-top"} style={backButtonStyle} to={"/"}>
        <img src={backButtonIcon} alt={"back"} style={backButtonIconStyle} />
      </Link>
      <img src={itemImage} alt="header" style={itemImgStyle} />
      <div className={"container"}>
        <h1 className={"bold"} style={{ "marginTop": "10px" }}>{itemName}</h1>
        <h3 className={"bold"}>{"$" + itemPrice.toFixed(2).toString()}</h3>
        <p style={itemDescriptionStyle}>{itemIngredients}</p>
      </div>
      <MenuSection sectionName={"Goes well with"} items={
        recommendedItems
      }
      />
      <Link className="fixed-bottom" style={addToCartButtonStyle} to={"/"} onClick={() => alert("Added " + numItems.toString() + " of " + itemName.toString() + " to cart")}
      >
        <h5 className={"bold"} style={addToCartTextStyle}>Add {numItems} · {"$" + (itemPrice * numItems).toFixed(2).toString()}</h5>
      </Link >
    </>
  );
}

export default SelectedItem