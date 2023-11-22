import React from 'react'
import Modal from 'react-modal';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import { useEffect } from 'react';
import axios from 'axios';

function Travel() {

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [showMobileLogin, setShowMobileLogin] = useState(false);
  const [balance, setBalance] = useState(() => {
    return parseFloat(localStorage.getItem('balance'))|| 0;
  });
  const openModal = () => {
    setModalIsOpen(true);
  };
  const [formData, setFormData] = useState({
    place: '',
    expenditure: '',
   

  });
  useEffect(() => {
    if (!localStorage.getItem('hasRefreshed')) {
      localStorage.setItem('hasRefreshed', 'true');
      window.location.reload();
    }
  }, []);


  const handleChange = (event) => { 
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {


    event.preventDefault();
    
    let travelHistory = JSON.parse(localStorage.getItem('travelHistory')) || [];
    travelHistory.push(formData);
    localStorage.setItem('travelHistory', JSON.stringify(travelHistory));
  
    let expenditure = parseFloat(event.target.expenditure.value);
    let currentBalance = parseFloat(localStorage.getItem('balance')) || 0;
    let newBalance = currentBalance - expenditure;
  
    setBalance(newBalance);
    localStorage.setItem('balance', newBalance.toString());
  };
  
  
  const travelHistory = JSON.parse(localStorage.getItem('travelHistory')) || [];
  
  const handleClick = () => {
    localStorage.removeItem('travelHistory');
    window.location.reload();
  }
  

  return (
    <Container fluid className="p-3"> 
              <button onClick={handleClick}>Clear</button>

    <Form onSubmit={handleSubmit}>
      <Row>
        <Col md={6} lg={9}>
          <Card className="p-4 p-xl-5 my-3 my-xl-4">
            <div className="d-flex flex-row align-items-start justify-content-between mb-3">
              
            <div className="d-flex justify-content-between align-items-center mb-3 w-100">
            <span className="fw-bold">Add your total travel planning to allocate a budget</span>
            <Button className="action_button" onClick={openModal}>Login</Button>
          </div>

            </div>
            <hr className="my-4"/>
            <Row className="mb-5">
              <Col>
              <Form.Label className="fw-bold">Travelling Details:</Form.Label>
                <Form.Select aria-label="Type" name="place" className="my-2 input_field drop" required="required" onChange={handleChange}>
                  <option>Choose the Continent Name you wish to travel</option>
                  <option value="Asia">Asia</option>
                  <option value="South America">South America</option>
                  <option value="North America">North America</option>
                  <option value="Antarctica">Antarctica</option>
                  <option value="Europe">Europe</option>
                  <option value="Africa">Africa</option>
                  <option value="Antartica">Antartica</option>
                  
                </Form.Select>
                <Form.Control placeholder={"Add total expenditures of travel (approximately)"} type="number" name="expenditure" className="my-2 input_field" autoComplete="email" required="required" onChange={handleChange}/>
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
                <Form.Control value={balance} name="taxRate" type="number" className="bg-white border input_field"  readOnly/>
              </InputGroup>
              <ul>
      {travelHistory.map((travel, index) => (
        <li key={index}>
          <span>{travel.place}</span> - <span>{travel.expenditure}</span>
        </li>
      ))}
    </ul>
            </Form.Group>
         
          </div>
        </Col>
      </Row>
    </Form>

    </Container>
  )
}

export default Travel