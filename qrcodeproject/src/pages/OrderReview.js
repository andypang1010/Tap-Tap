import { Link } from "react-router-dom";
import OrderedItem from "../components/OrderedItem";
import backButtonIcon from "../media/Icons/round-minus.jpg"
import Order from "../models/Order";
import shrimpRollImg from "../media/marina-grynykha-FBgCgJhPO2I-unsplash.jpg"
import crabRiceBowlImg from "../media/mahmoud-fawzy-BOJ8RP7-VQA-unsplash.jpg"

const backButtonStyle = {
  margin: "20px 0 0 20px"
}

const backButtonIconStyle = {
  width: "40px",
  height: "40px",
  borderRadius: "50%",
  boxShadow: "0 0 5px 1px rgba(0, 0, 0, 0.5)"
}

const buttonStyle = {
  margin: "auto",
  marginBottom: "40px",
  padding: "10px 0",
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: "85%",
  height: "45px",
  textAlign: "center",
  textDecoration: "none",
  borderRadius: "10px",
  border: "1px solid rgba(212, 30, 30, 1)",
  backgroundColor: "rgba(212, 30, 30, 1)",
  boxShadow: "0 0 5px 1px rgba(0, 0, 0, 0.5)"
}

const buttonTextStyle = {
  color: "white",
  margin: "0px"
}

const shrimpRollImage = shrimpRollImg
const crabRiceBowlImage = crabRiceBowlImg

const orderedItems = [
  new Order(shrimpRollImage, "Shrimp Roll", 2, 10.35, ""),
  new Order(crabRiceBowlImage, "Crab Rice Bowl", 1, 21.4, "sauce on the side")
]

function OrderReview({ taxPercentage }) {
  let subTotal = orderedItems.reduce((sum, item) => sum + item.quantity * item.price, 0).toFixed(2)
  let taxedTotal = (subTotal * taxPercentage / 100).toFixed(2)
  let total = (parseFloat(subTotal) + parseFloat(taxedTotal)).toFixed(2)

  return (
    <>
      <div className={"container"}>
        <Link className={"fixed-top col"} style={backButtonStyle} to={"/menu"}>
          <img src={backButtonIcon} alt={"back"} style={backButtonIconStyle} />
        </Link>
        <br />
        <h1 className={"bold col"} style={{ "textAlign": "center" }}>Order Review</h1>
        <div className={"container"}>
          {orderedItems.map(
            (orderedItem) => <OrderedItem image={orderedItem.image} name={orderedItem.name} quantity={orderedItem.quantity} unitPrice={orderedItem.price} />)}
        </div>
        <hr />
        <h5 className={"bold"}>Price</h5>
        <p style={{ "marginBottom": "7px" }}>Subtotal <span style={{ "float": "right" }}>${subTotal}</span></p>
        <p style={{ "marginBottom": "7px" }}>Tax ({String(taxPercentage)}%)<span style={{ "float": "right" }}>${taxedTotal}</span></p>
        <p style={{ "marginBottom": "7px" }} className={"bold"}>Total<span style={{ "float": "right" }}>${total}</span></p>

        {/* Pay Button */}
        <div className="fixed-bottom">
          <Link className={"center"} style={buttonStyle} to={"/pay"}>
            <h5 className={"bold"} style={buttonTextStyle}>Place Order of ${total}</h5>
          </Link >
        </div>
      </div >

    </>
  )
}

export default OrderReview;