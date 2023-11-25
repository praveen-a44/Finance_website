import React from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';

const CenteredForm = () => {
  // Your state and event handlers go here

  return (
    <>
    <Container>
        <h2 className="heading_font" style={{textAlign:'center',position:'relative',top:'30px'}}>Add your Budget planing</h2>
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <Card className="p-4 my-5">
            <h4 className="text-center mb-4">Add your total travel planning to allocate a budget</h4>
            <Form>
              <Form.Group controlId="date">
                <Form.Label>Date</Form.Label>
                <Form.Control type="date" required />
              </Form.Group>

              <Form.Group controlId="place">
                <Form.Label>Travelling Continent</Form.Label>
                <Form.Control as="select" required>
                  <option>Choose the Continent Name you wish to travel</option>
                </Form.Control>
              </Form.Group>

              <Form.Group controlId="expenditure">
                <Form.Label>Expenditure</Form.Label>
                <Form.Control type="number" placeholder="Add total expenditures of travel (approximately)" required />
              </Form.Group>

             

              <Button  type="submit" style={{backgroundColor:'#8748F8',border:'none'}} className="mt-3">
                Submit
              </Button>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
    </>
  );
};

export default CenteredForm;
