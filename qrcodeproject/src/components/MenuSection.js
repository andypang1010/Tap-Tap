import MenuItem from "./MenuItem"

function MenuSection({ sectionName, items }) {
  return (
    <div className="container col" id={sectionName} >
      <br />
      <h2 style={{}} className={"bold"}>{sectionName}</h2>
      {
        items.map(item => (
          <MenuItem
            image={item.picture}
            name={item.name}
            description={item.description}
            ingredients={item.ingredients}
            price={item.price}
          />
        ))
      }
    </div >
  )
}

export default MenuSection