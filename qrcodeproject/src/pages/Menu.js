import Header from "../components/Header";
import MenuSection from "../components/MenuSection";
// import SearchBar from "./SearchBar";
import SectionsScroll from "../components/SectionsScroll";
import Item from "../models/Item";
import Footer from "../components/Footer";
import salmonRollPicture from "../media/mahmoud-fawzy-EqoCUzG9200-unsplash.jpg"
import crabRiceBowlPicture from "../media/mahmoud-fawzy-BOJ8RP7-VQA-unsplash.jpg"
import avocadoTunaSushiPicture from "../media/Shrimp Roll.jpg"
import { Link } from "react-router-dom";
import { AxiosProvider, Request, Get, Delete, Head, Post, Put, Patch, withAxios } from 'react-axios'

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

function Menu({ name, altName, img }) {
  return (
    <>
      <Get url="http://localhost:8008/getMenu" params={{ "table": "1", "name": "jefferywcg1234" }}>
        {(error, response) => {
          if (error) {
            console.log(error)
          }
          else if (response !== null) {
            console.log(response.data)
          }
        }}
      </Get>
      <Header name={name} altName={altName} img={img} />
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

      {/* Checkout Button */}
      <div className="fixed-bottom">
        <Link className={"center"} style={buttonStyle} to={"/orderReview"}>
          <h5 className={"bold"} style={buttonTextStyle}>Checkout</h5>
        </Link >
      </div>

      <Footer />
    </>
  )
}

export default Menu