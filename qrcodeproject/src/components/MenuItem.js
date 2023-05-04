function MenuItem({ image, name, description, ingredients, price }) {
  return (
    <div style={{ "borderStyle": "solid", "borderColor": "lightgray", "lineHeight": "1.5", "borderRadius": "5px", "overflow": "hidden", "margin": "10px 0 10px 0", "height": "10%" }}>
      <img src={image} alt="food" height={"100%"} width={"45%"} style={{ "float": "right" }}></img>
      <div className="container" style={{ "height": "100%", "marginTop": "15px" }}>
        <h6><b>{name}</b></h6>
        <div style={{ "fontSize": "14px" }}>
          <div style={{ "color": "gray" }}>
            <text>{description}</text>
            <br />
            <text>{ingredients}</text>
          </div>
          <text>{"$" + price.toFixed(2).toString()}</text>
        </div>
      </div>
    </div>
  )
}

export default MenuItem