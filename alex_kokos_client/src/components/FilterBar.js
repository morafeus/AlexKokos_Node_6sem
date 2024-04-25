import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Container, Dropdown, Navbar, Button, Form } from 'react-bootstrap';
import { Context } from '../index';

const FilterBar = observer(() => {
  const { descipline } = useContext(Context);
  console.log(descipline.selectedType)
  return (
    <Container className="mt-3 justify-content-center align-items-center">
      <Navbar   className="navbar navbar-expand-lg navbar-light bg-light">
        <Dropdown className="me-3">
          <Dropdown.Toggle variant="white" id="dropdown-basic">
            Price
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item href="#action1">Before Cheap</Dropdown.Item>
            <Dropdown.Item href="#action2">Before Expensive</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Dropdown className="me-3">
          <Dropdown.Toggle variant="white" id="dropdown-basic">
            Discipline
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {descipline.desciplines.map((discipline) => (
              <Dropdown.Item onClick={() => descipline.setSelectedType(discipline)} key={discipline.descipline_id} href="#action1}">
                {discipline.descipline_name}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
        <Dropdown className="me-3">
          <Dropdown.Toggle variant="white" id="dropdown-basic">
            Popular
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item href="#action1">Before Popular</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Form inline className="d-flex">
          <Form.Control type="search" placeholder="Search" className="mr-sm-2" />
          <Button variant="outline-success" type="submit">
            Search
          </Button>
        </Form>
      </Navbar>
    </Container>
  );
});

export default FilterBar;