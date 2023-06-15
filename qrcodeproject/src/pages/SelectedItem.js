import { useLocation, Link } from "react-router-dom";
import backButtonIcon from "../media/Icons/round-minus.jpg"
import minusButtonIcon from "../media/Icons/round-minus.jpg"
import addButtonIcon from "../media/Icons/round-plus.jpg"
import MenuSection from "../components/MenuSection";
import deluxeSushiPlatterPicture from "../media/riccardo-bergamini-O2yNzXdqOu0-unsplash.jpg"
import Item from "../models/Item";
import { useState } from "react";
import { Button } from "react-bootstrap";


const recommendedItems = [
  new Item(deluxeSushiPlatterPicture, "Deluxe Sushi Platter", "A randomly assorted sushi platter", "Something fancy", 70),
  new Item(deluxeSushiPlatterPicture, "Deluxe Sushi Platter", "A randomly assorted sushi platter", "Something fancy", 70),
  new Item(deluxeSushiPlatterPicture, "Deluxe Sushi Platter", "A randomly assorted sushi platter", "Something fancy", 70),
]

const backButtonStyle = {
  margin: "20px 0 0 20px"
}

const buttonIconStyle = {
  width: "40px",
  height: "40px",
  borderRadius: "50%",
  boxShadow: "0 0 5px 1px rgba(0, 0, 0, 0.5)"
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

const quantitySelectorStyle = {
  border: "1px rgba(212, 30, 30, 1)",
  backgroundColor: "rgba(212, 30, 30, 1)",
  borderRadius: "30px",
  padding: "10px 10px -10px -10px",
  width: "140px",
  marginLeft: "0px"
}

const minusButtonStyle = {
  all: "unset",
  margin: "0 0 0 10px"
}

const quantityTextStyle = {
  color: "white",
  height: "40px",
  justifyContent: "center",
  display: "flex",
  alignItems: "center",
  margin: "10px 0 10px 0",
  padding: "0"
}

const addButtonStyle = {
  all: "unset",
  margin: "0 10px 0 0"
}

const addToCartButtonStyle = {
  margin: "auto",
  marginBottom: "40px",
  padding: "10px 0",
  width: "85%",
  height: "45px",
  textAlign: "center",
  textDecoration: "none",
  borderRadius: "10px",
  border: "1px solid rgba(212, 30, 30, 1)",
  backgroundColor: "rgba(212, 30, 30, 1)",
  boxShadow: "0 0 5px 1px rgba(0, 0, 0, 0.5)"
}

const addToCartTextStyle = {
  color: "white",
}

function SelectedItem() {
  const [numItems, setNumItems] = useState(1);
  const location = useLocation();
  const { itemImage, itemName, itemIngredients, itemPrice } = location.state;

  return (
    <>
      {/* Back Button */}
      <Link className={"fixed-top"} style={backButtonStyle} to={"/menu"}>
        <img src={backButtonIcon} alt={"back"} style={buttonIconStyle} />
      </Link>

      {/* Item Image */}
      <img src={itemImage} alt="header" style={itemImgStyle} />
      <div className={"container"}>

        {/* Item Name */}
        <h1 className={"bold"} style={{ "marginTop": "10px" }}>{itemName}</h1>

        {/* Item Price */}
        <h3 className={"bold"}>{"$" + itemPrice.toFixed(2).toString()}</h3>

        {/* Item Ingredients */}
        <p style={itemDescriptionStyle}>{itemIngredients}</p>

        {/* Quantity Selector */}
        <div className="row" style={quantitySelectorStyle}>

          {/* Minus Button */}
          <Button className={"col"} onClick={() => setNumItems((numItems > 1) ? numItems - 1 : numItems)} style={minusButtonStyle}>
            <img src={minusButtonIcon} alt={"minus"} style={buttonIconStyle} />
          </Button>

          {/* Quantity Text */}
          <p className={"col bold"} style={quantityTextStyle}>{numItems}</p>

          {/* Add Button */}
          <Button className={"col"} onClick={() => setNumItems((numItems < 99) ? numItems + 1 : numItems)} style={addButtonStyle}>
            <img src={addButtonIcon} alt={"add"} style={buttonIconStyle} />
          </Button>
        </div>

      </div >

      {/* Goes Well With Section */}
      <MenuSection sectionName={"Goes well with"} items={recommendedItems} />

      {/* Add Item Button */}
      <Link className="fixed-bottom" style={addToCartButtonStyle} to={"/menu"}
        onClick={() => alert("Added " + numItems.toString() + " of " + itemName.toString() + " to cart")}>
        <h5 className={"bold"} style={addToCartTextStyle}>Add {numItems} · {"$" + (itemPrice * numItems).toFixed(2).toString()}</h5>
      </Link >
    </>
  );
}

export default SelectedItem