const sectionScrollStyle = {
  color: "rgba(212, 30, 30, 1)"
}

function SectionsScroll({ sections }) {
  return (
    <nav id="section-scroll" class="container container-fluid" style={{ "overflow": "hidden" }}>
      <ul class="nav sticky-top flex-row flex-nowrap" style={{ "overflow-x": "auto" }} >
        {
          sections.map(sec =>
            <li className="nav-item">
              <a class="nav-link" href={"#" + sec} style={sectionScrollStyle}>{sec}</a>
            </li>)
        }
      </ul>
    </nav>


  )
}

export default SectionsScroll;