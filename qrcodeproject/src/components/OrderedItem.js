import { Button } from "react-bootstrap"
import editButtonIcon from "../media/Icons/Search Icon.png"

const imageStyle = {
  padding: "0px",
  borderRadius: "10px",
  width: "50px",
  height: "50px",
  objectFit: "cover"
}

const textStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  margin: "0px"
}

const editButtonStyle = {
  width: "20px",
  height: "20px"
}

function OrderedItem({ image, name, quantity, unitPrice, comment }) {
  return (
    <>
      <div className="container row" style={{ "padding": "0px" }}>
        <img src={image} alt={name} className="col" style={imageStyle} />
        <p className="col" style={textStyle}>{name}</p>
        <p className="col" style={textStyle}>{quantity}×</p>
        <p className="col" style={textStyle}>${parseFloat(unitPrice).toFixed(2)}</p>
        <Button className="col" style={{ "all": "unset" }}><img src={editButtonIcon} alt={"edit"} style={editButtonStyle} /></Button>
      </div>
      <br />
    </>
  )
}

export default OrderedItem