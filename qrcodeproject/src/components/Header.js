import headerImage from "../media/Sushizanmai Honten.png"

function Header({ name, altName }) {
  return (
    <>
      <img src={headerImage} alt="header" style={{ "width": "100%" }} />
      <div className="container">
        <h1 className="text-center bold">{name}</h1>
        <h3 className="text-center bold">{altName}</h3>
        <hr />
      </div>
    </>
  )
}

export default Header;