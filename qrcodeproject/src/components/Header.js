import headerImage from "../media/Sushizanmai Honten.png"

function Header() {
  return (
    <>
      <img src={headerImage} alt="header" style={{ "width": "100%" }} />
      <div className="container">
        <h1 className="text-center bold">Sushizanmai Honten</h1>
        <h3 className="text-center bold">すしざんまい 本店</h3>
        <hr />
      </div>
    </>
  )
}

export default Header;