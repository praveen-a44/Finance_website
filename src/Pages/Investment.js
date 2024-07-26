import React, { useState } from 'react'
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import { ToastContainer, toast } from 'react-toastify';
import Navbar1 from './Nav';
import { FaCircle } from 'react-icons/fa';
import { useEffect } from 'react';
 function Investment() {
  const [formData, setFormData] = useState({
    platform: '',
    amount: ''
   

  });
  const handleChange = (event) => { 
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };
  const invest_history = JSON.parse(localStorage.getItem('investmentplan')) || [];

  const [balance, setBalance] = useState(() => {
    return parseFloat(localStorage.getItem('balance'))|| 0;
  });
  const[showplatform,setShowplatform] = useState("")
  const[amount,setAmount] = useState("")
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loggedInStatus = localStorage.getItem('isLoggedIn');

    if (loggedInStatus === 'true') {
      setIsLoggedIn(true);
    }
  }, []);
  
  const handleSubmit = async (event) => {
    toast.success("Added to your history")
    event.preventDefault();
    let invest_history = JSON.parse(localStorage.getItem('investmentplan')) || [];
    const exists = invest_history.some(data => JSON.stringify(data) === JSON.stringify(formData));
    
    if (!exists) {
      invest_history.push(formData);
        localStorage.setItem('investmentplan', JSON.stringify(invest_history));
    }
  
    let expenditure = parseFloat(event.target.amount.value);
    let currentBalance = parseFloat(localStorage.getItem('balance')) || 0;
    let newBalance = currentBalance - expenditure;
  
    setBalance(newBalance);
    setShowplatform(formData.place);
    setAmount(formData.expenditure);
    localStorage.setItem('balance', newBalance.toString());
  };
  return (
    <div>
      <Navbar1 />
    
    <ToastContainer />
       <Container fluid className="p-3"> 
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col md={6} lg={9}>
          <Card className="p-4 p-xl-5 my-3 my-xl-4">
            <div className="d-flex flex-row align-items-start justify-content-between mb-3">
              
            <div className="d-flex justify-content-between align-items-center mb-3 w-100">
            <span className="fw-bold">Add your Investment spending either monthwise or anually</span>
            <br>
            </br>
          </div>
            </div>
            <span style={{marginLeft:'3px',color:'#8748F8'}}>Keep Trust on us we keep your data very secure </span>

            <hr className="my-4"/>
            <Row className="mb-5">
              <Col>
              <Form.Label className="fw-bold">Investment Details:</Form.Label>
                <Form.Select aria-label="Type" name="platform" className="my-2 input_field drop" required="required"onChange={handleChange}>
                <option>Choose the Long-Term Investment you wish to make</option>
              <option value="Angel One">Angel One</option>
              <option value="Zerodha">Zerodha</option>
              <option value="Vanguard 500 Index Fund">Vanguard 500 Index Fund</option>
              <option value="Schwab Total Stock Market Index Fund">Schwab Total Stock Market Index Fund</option>
              <option value="Fidelity Zero Total Market Index Fund">Fidelity Zero Total Market Index Fund</option>
              <option value="Vanguard Real Estate Index Fund">Vanguard Real Estate Index Fund</option>
              <option value="T. Rowe Price Equity Income Fund">T. Rowe Price Equity Income Fund</option>
              <option value="Vanguard Health Care Fund">Vanguard Health Care Fund</option>
              <option value="Fidelity Contrafund">Fidelity Contrafund</option>
              <option value="T. Rowe Price Global Technology Fund">T. Rowe Price Global Technology Fund</option>
              <option value="JPMorgan Chase & Co.">JPMorgan Chase & Co.</option>
              <option value="Goldman Sachs Group">Goldman Sachs Group</option>
              <option value="Morgan Stanley">Morgan Stanley</option>
              <option value="Charles Schwab Corporation">Charles Schwab Corporation</option>
              <option value="Bank of America Corp">Bank of America Corp</option>
              <option value="Wells Fargo & Co">Wells Fargo & Co</option>
              <option value="Citigroup Inc">Citigroup Inc</option>
              <option value="Berkshire Hathaway Inc">Berkshire Hathaway Inc</option>
              <option value="BlackRock Inc">BlackRock Inc</option>
              <option value="UBS Group AG">UBS Group AG</option>
              <option value="HSBC Holdings plc">HSBC Holdings plc</option>
                              
                </Form.Select>
                <Form.Control placeholder={"Investment amount"} type="number" name="amount" className="my-2 input_field" required="required" onChange={handleChange} />
              </Col>
            </Row>
         
              {/* <Row className="mt-4 justify-content-end">
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
              </Row> */}
            <hr className="my-4"/>
          </Card>
        </Col>
        <Col md={4} lg={3}>
          <div className="sticky-top pt-md-3 pt-xl-4">
          <Button type="submit" className="d-block w-100 action_button">Submit</Button>
          <div className="d-flex flex-row align-items-start justify-content-between">
                  <span className="fw-light"  title="checked in">status: &nbsp;{isLoggedIn?<FaCircle id="circle_clr_green"/>:<FaCircle id="circle_clr_red"/>}
                  </span>
                  
                </div>
            <Form.Group className="my-3">
              <Form.Label className="fw-bold">Balance:</Form.Label>
              <InputGroup className="my-1 flex-nowrap">
              {balance>0? <Form.Control value={balance} name="taxRate" type="number" className="bg-white border input_field" id="balance" readOnly/>:<Form.Control placeholder='You wanna check in to track' name="taxRate" type="number" className="bg-white border input_field" id="balance" readOnly/>}
              </InputGroup>
              <ul>
      {invest_history.map((i, index) => (
        <li key={index}>
          <span>{i.platform}</span> - <span>{i.amount}</span>
        </li>
      ))}
    </ul>
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