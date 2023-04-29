import { Form } from "react-bootstrap";

function SearchBar() {
  return (
    <Form className="d-flex container">
      <Form.Control
        type="search"
        placeholder="Search Menu"
        className="me-2 rounded-pill"
        aria-label="Search Menu"
        style={{ "box-shadow": "0px 0px 10px 0.5px rgba(0,0,0,0.1)" }}
      />
    </Form>

  )
}

export default SearchBar;