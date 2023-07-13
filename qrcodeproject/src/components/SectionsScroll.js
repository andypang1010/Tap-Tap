const sectionScrollStyle = {
  overflow: "hidden",
  backgroundColor: "white",
  opacity: "97%",
}

const sectionStyle = {
  color: "rgba(212, 30, 30, 1)",
  fontWeight: "500",
}

function SectionsScroll({ sections }) {
  return (
    <>
      <nav id={"section-scroll"} className={"navbar container container-fluid sticky-top"} style={sectionScrollStyle}>
        <ul className="nav nav-pills flex-row flex-nowrap" style={{ "overflowX": "auto", "overflowY": "hidden" }} >
          {
            sections.map(sec =>
              <li className="nav-item">
                <a className="nav-link" href={"#" + sec} style={sectionStyle}>{sec}</a>
              </li>)
          }
        </ul>
      </nav>
      <div className="container" style={{ "marginBottom": "-20px" }}>
        <hr />
      </div>
    </>
  )
}

export default SectionsScroll;