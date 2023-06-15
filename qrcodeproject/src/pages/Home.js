import { Link } from "react-router-dom";

const imgStyle = {
  width: "70%",
  height: "50%",
  borderRadius: "20px",
  margin: "auto",
  display: "block",
  objectFit: "cover"
}

const buttonStyle = {
  margin: "auto",
  marginBottom: "20px",
  padding: "10px 0",
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: "85%",
  height: "45px",
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

function Home({ name, altName, img, tableNum }) {
  return (
    <>
      <div className="container">
        <br />
        <h1 className="text-center bold">{name}</h1>
        <h3 className="text-center bold">{altName}</h3>
        <p className="text-center">{"Table No." + String(tableNum)}</p>
        <img src={img} alt="header" style={imgStyle} />
        <br />
        <div>
          <Link className="center" style={buttonStyle} to={"/menu"}>
            <h5 className={"bold"} style={buttonTextStyle}>View Menu</h5>
          </Link >

          <Link className="center" style={buttonStyle} to={"/bill"}>
            <h5 className={"bold"} style={buttonTextStyle}>View Bill</h5>
          </Link >
        </div>

      </div>

    </>

  )
}

export default Home;