const headerImgStyle = {
  width: "100%",
  marginBottom: "10px"
}

function Header({ name, altName, img }) {
  return (
    <>
      <img src={img} alt="header" style={headerImgStyle} />
      <div className="container">
        <h1 className="text-center bold">{name}</h1>
        <h3 className="text-center bold">{altName}</h3>
      </div>
    </>
  )
}

export default Header;