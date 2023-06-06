import { Link } from "react-router-dom";

const linkStyle = {
  all: "unset",
  margin: "-15px, 0 -15px, 0"
}

const menuItemStyle = {
  borderStyle: "solid",
  borderColor: "lightgray",
  borderWidth: "1px",
  lineHeight: "1",
  borderRadius: "10px",
  overflow: "hidden",
  margin: "10px 0 10px 0",
  height: "150px",
  width: "100%"
};

const itemImgStyle = {
  width: "45%",
  height: "100%",
  objectFit: "cover",
  float: "right",
}

const itemTextStyle = {
  marginTop: "20px",
  width: "53%",
  float: "left"
}

function MenuItem({ image, name, description, ingredients, price }) {
  return (
    <Link to={"/item"} style={linkStyle} state={{
      itemImage: image,
      itemName: name,
      itemDescription: description,
      itemIngredients: ingredients,
      itemPrice: price
    }}>
      <div style={menuItemStyle}>
        <img src={image} alt="food" style={itemImgStyle}></img>
        <div className="container" style={itemTextStyle}>
          <h6 className="bold">{name}</h6>
          <div style={{ "fontSize": "14px" }}>
            <div style={{ "color": "gray", "lineHeight": "normal" }}>
              <p style={{ "marginBottom": "0px" }}>{description}</p>
              <p style={{ "marginBottom": "10px" }}>{ingredients}</p>
            </div>
            <p>{"$" + price.toFixed(2).toString()}</p>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default MenuItem