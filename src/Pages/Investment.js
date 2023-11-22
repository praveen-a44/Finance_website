import React from 'react'
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';

 function Investment() {
  return (
    <div>
       <Container fluid className="p-3"> 

    <Form>
      <Row>
        <Col md={6} lg={9}>
          <Card className="p-4 p-xl-5 my-3 my-xl-4">
            <div className="d-flex flex-row align-items-start justify-content-between mb-3">
              
            <div className="d-flex justify-content-between align-items-center mb-3 w-100">
            <span className="fw-bold">Add your Investment spending either monthwise or anually</span>
            <Button className="action_button">Login</Button>
          </div>

            </div>
            <hr className="my-4"/>
            <Row className="mb-5">
              <Col>
              <Form.Label className="fw-bold">Travelling Details:</Form.Label>
                <Form.Select aria-label="Type" name="place" className="my-2 input_field drop" required="required" >
                  <option>Choose the Continent Name you wish to travel</option>
                  <option value="Asia">Asia</option>
                  <option value="South America">South America</option>
                  <option value="North America">North America</option>
                  <option value="Antarctica">Antarctica</option>
                  <option value="Europe">Europe</option>
                  <option value="Africa">Africa</option>
                  <option value="Antartica">Antartica</option>
                  
                </Form.Select>
                <Form.Control placeholder={"Add total expenditures of travel (approximately)"} type="number" name="expenditure" className="my-2 input_field" autoComplete="email" required="required" />
                <span style={{marginLeft:'3px',color:'#8748F8'}}>**Either solid or liquid</span>
              </Col>
            </Row>
         
            <Row className="mt-4 justify-content-end">
              <Col lg={6}>
                <div className="d-flex flex-row align-items-start justify-content-between">
                  <span className="fw-bold">Type:
                  </span>
                  
                </div>
                <hr/>
                <div className="d-flex flex-row align-items-start justify-content-between" style={{
                    fontSize: '1.125rem'
                  }}>
                  <span className="fw-bold">Total:
                  </span>
                  
                </div>
              </Col>
            </Row>
            <hr className="my-4"/>
          </Card>
        </Col>
        <Col md={4} lg={3}>
          <div className="sticky-top pt-md-3 pt-xl-4">
            <Button type="submit" className="d-block w-100 action_button">Submit</Button>
         
            <Form.Group className="my-3">
              <Form.Label className="fw-bold">Balance:</Form.Label>
              <InputGroup className="my-1 flex-nowrap">
                <Form.Control  name="taxRate" type="number" className="bg-white border input_field"  readOnly/>
              </InputGroup>
             
            </Form.Group>
         
          </div>
        </Col>
      </Row>
    </Form>

    </Container>
    </div>
  )
}
export default Investment