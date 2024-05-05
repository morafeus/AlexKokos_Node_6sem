import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Container, Dropdown, Navbar, Button, Form } from 'react-bootstrap';
import { Context } from '../index';

const FilterBar = observer(() => {
  const { descipline, courses } = useContext(Context);

  const handleSetPrice = (price) => {
    courses.setPrice(price);
  };

  const reset = () => {
    courses.setSelectedDescipline({})
    courses.setPrice(0);
    courses.setName('');
  }

  return (
    <Container className="mt-3 justify-content-center align-items-center">
      <Navbar className="navbar navbar-expand-lg navbar-light bg-light">
        <Dropdown className="me-3">
          <Dropdown.Toggle variant="white" id="dropdown-basic">
            Price
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => handleSetPrice(2)}>Before Cheap</Dropdown.Item>
            <Dropdown.Item onClick={() => handleSetPrice(1)}>Before Expensive</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Dropdown className="me-3">
          <Dropdown.Toggle variant="white" id="dropdown-basic">
            Discipline
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {descipline.desciplines.map((discipline) => (
              <Dropdown.Item
                onClick={() =>  courses.setSelectedDescipline(discipline)}
                key={discipline.descipline_id}
              >
                {discipline.descipline_name}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>

        <Form inline className="d-flex">
          <Form.Control type="search" placeholder="Search" className="mr-sm-2" value={courses.name} onChange={(e) => courses.setName(e.target.value)} />
          <Button onClick={() => reset()} variant="outline-success">
            Reset
          </Button>
        </Form>
      </Navbar>
    </Container>
  );
});

export default FilterBar;