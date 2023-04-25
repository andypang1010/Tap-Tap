import { Form } from "react-bootstrap";

function SearchBar() {
  return (
    <Form className="d-flex container">
      <Form.Control
        type="search"
        placeholder="Search menu"
        className="me-2 rounded-pill"
        aria-label="Search menu"
        style={{ "box-shadow": "0px 0px 10px -5px rgba(0,0,0,0.75)" }}
      />
    </Form>

  )
}

export default SearchBar;