import MenuItem from "./MenuItem"

function MenuSection({ sectionName, items }) {
  return (
    <div className="container" id={sectionName} >
      <br />
      <h4><b>{sectionName}</b></h4>
      {items.map(item => (
        <button style={{ "all": "unset" }} onClick={() => console.log("Selected " + item.name)}><MenuItem
          image={item.picture}
          name={item.name}
          description={item.description}
          ingredients={item.ingredients}
          price={item.price}
        /></button>
      ))}
    </div>
  )
}

export default MenuSection