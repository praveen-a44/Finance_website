import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import '../Styles/Totalmoney.css'
import InputGroup from 'react-bootstrap/InputGroup';
import Container from 'react-bootstrap/Container';
import axios from 'axios';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import { FaGoogle,FaMobile } from 'react-icons/fa';
import Modal from 'react-modal';
import Confetti from 'react-confetti';



import { Button1,Form1,customStyles,GlobalStyle,Hr,Input1  } from './Styled';

export default function TotalMoney() {
  const [balance, setBalance] = useState(() => {
    return parseFloat(localStorage.getItem('balance'))|| 0;
  });
  const[showconfetti,setShowconfetti] = useState(false)

  const [data, setData] = useState(null);


  const fetchBalance = async () => {
    try {
      const response = await axios.get('http://localhost:8000/');
      if (response.data && typeof response.data.total_money === 'number') {
        setBalance(response.data.total_money);
        console.log(balance)
        localStorage.setItem('balance', response.data.total_money.toString());
      } else {
        console.error('Unexpected response:', response);
      }
    } catch (error) {
      console.error(error);
      setBalance(0);
    }
  };
  console.log(balance)
  useEffect(() => {
    localStorage.setItem('balance', balance);
    fetchBalance();
   
  }, [balance]);
  const[email,setEmail] = useState('');

  
  const [formData, setFormData] = useState({
    type: '',
    total_money: '',
    form: '',
    fname:'',
    email:'',
    job:''

  });

  const [loginData, setLoginData] = useState({
    name: '',
    email: '',
    password: '',
  });
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const loggedInStatus = localStorage.getItem('isLoggedIn');
    if (loggedInStatus === 'true') {
      setIsLoggedIn(true);
      setName(localStorage.getItem('name'));
      setEmail_main(localStorage.getItem('email'));
    }
  }, []);
  

const[name,setName] = useState("")
const[email_main,setEmail_main] = useState("")


const handleLogout = () => {
  setIsLoggedIn(false);
  toast.info("Logged Out")
  setBalance(0); 
  setName("");
  setEmail_main("");
  localStorage.removeItem('isLoggedIn');
  localStorage.removeItem('name');
  localStorage.removeItem('email');
};


const handleLogin = async (event) => {
  event.preventDefault();
  setModalIsOpen(false)

  const email = event.target.email.value;

  fetch('http://localhost:8000/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.success) {
        setName(data.user.fname);
        setEmail_main(data.user.email);
        setBalance(data.user.total_money)
        setIsLoggedIn(true);
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('name', data.user.fname);
        localStorage.setItem('email', data.user.email);
        console.log(data)
        toast.success('Logged in successfully!', { autoClose: 3000 });

      
      } else {
        toast.error('Wrong email or password!', { autoClose: 3000 });
      }
    })
    .catch((err) => console.error(err));
};

  
  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };
  


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/', formData);
      console.log(response.data);
      setBalance(formData.total_money);
      setShowconfetti(true); 
      setTimeout(() => setShowconfetti(false), 2000);
      toast.success('Data saved successfully');
    } catch (error) {
      console.error(error);
      toast.error('Error in saving data'); 
    }
  };

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [showMobileLogin, setShowMobileLogin] = useState(false);

  const handleShowMobileLogin = () => {
    setShowMobileLogin(true);
  
  };
  const handleCloseMobileLogin = () => setShowMobileLogin(false);
  
  const [isRegister, setIsRegister] = useState(false);
  const closeModal = () => {
    setModalIsOpen(false);
    setIsRegister(false);
  
  };
  const openModal = () => {
    setModalIsOpen(true);
  };
  
  const [numExpenditures, setNumExpenditures] = useState(0);


  const [userData, setUserData] = useState({});

useEffect(() => {
  fetchUserData();
}, []);

const fetchUserData = async () => {
  try {
    const response = await axios.get('http://localhost:8000/');

    if (response.data.status === 'ok') {
      setUserData(response.data.data);
    } else {
    }
  } catch (error) {
    console.error(error);
  }
};

  
  return (
    <Container fluid className="p-3"> 
    <ToastContainer />
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col md={6} lg={9}>
          <Card className="p-4 p-xl-5 my-3 my-xl-4">
            <div className="d-flex flex-row align-items-start justify-content-between mb-3">
              
            <div className="d-flex justify-content-between align-items-center mb-3 w-100">
            <span className="fw-bold">Add your total balance money or savings to track your money</span>
            {isLoggedIn ? (
  <Button className="action_button" onClick={handleLogout}>Logout</Button>
) : (
  <Button className="action_button" onClick={openModal}>Login</Button>
)}
          </div>

            </div>
            <hr className="my-4"/>
            <Row className="mb-5">
              <Col>
              <Form.Label className="fw-bold">Money Details:</Form.Label>
                <Form.Select aria-label="Type" name="type" className="my-2 input_field drop" required="required" onChange={handleChange}>
                  <option>Select annual or monthly income</option>
                  <option value="annual">Annual</option>
                  <option value="monthly">Monthly</option>
                </Form.Select>
                <Form.Control placeholder={"Enter your money"} type="number" name="total_money" className="my-2 input_field" autoComplete="email" required="required" onChange={handleChange}/>
                <Form.Select aria-label="Form of money" name="form" className="my-2 input_field drop" required="required" onChange={handleChange}>
                  <option>Select form of money</option>
                  <option value="solid">Solid</option>
                  <option value="liquid">Liquid</option>
                </Form.Select>
                <span style={{marginLeft:'3px',color:'#8748F8'}}>**Either solid or liquid</span>

              </Col>
              
              <Col>
                <Form.Label className="fw-bold">Personal Details:</Form.Label>
                <Form.Control placeholder={"what is your name?"} rows={3} type="text" name="fname" className="my-2 input_field" onChange={handleChange}autoComplete="name" required="required"/>
                <Form.Control placeholder={"Email address"}  type="email" name="email" className="my-2 input_field" onChange={handleChange}autoComplete="email" required="required"/>
                


                <Form.Select aria-label="Job" name="job" className="my-2 input_field drop" required="required" onChange={handleChange}>
                  <option>Select your job</option>
                  <option value="Teacher">Teacher</option>
                  <option value="Professor">Professor</option>
                  <option value="Software Developer">Software Developer</option>
                  <option value="Software Designer">Software Designer</option>
                  <option value="Farmer">Farmer</option>
                  <option value="Business">Business</option>
                  <option value="Salesman">Salesman</option>
                  <option value="police">Police</option>
                  <option value="Driver">Driver</option>
                  <option value="Plumber">Plumber</option>
                  <option value="Electrician">Electrician</option>




                  


                </Form.Select>
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
            <Form.Label className="fw-bold">Notes:</Form.Label>
            <Form.Control placeholder="Thanks for your business!" name="notes"  as="textarea" className="my-2 input_field" rows={1}/>
          </Card>
        </Col>
        <Col md={4} lg={3}>
          <div className="sticky-top pt-md-3 pt-xl-4">
            <Button type="submit" className="d-block w-100 action_button">Submit</Button>
         
            <Form.Group className="my-3">
              <Form.Label className="fw-bold">Balance:</Form.Label>
              <InputGroup className="my-1 flex-nowrap">
                <Form.Control value={balance}  type="number" className="bg-white border input_field"  readOnly/>
              </InputGroup>
              <br></br>
                <Form.Label className="fw-bold">Name:</Form.Label>

                <Form.Control value={name}  type="text" className="bg-white border input_field"  readOnly/>
                  <br></br>
                <Form.Label className="fw-bold">Email:</Form.Label>  
                <Form.Control value={email_main} type="text" className="bg-white border input_field"  readOnly/>
            </Form.Group>
         
          </div>
        </Col>
      </Row>
    </Form>

    <GlobalStyle />
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Auth Modal"
      >
        <img src="https://img.freepik.com/premium-vector/account-sign-up-flat-modern-illustration_9206-2777.jpg?w=740" width="150px" height="150px" alt="login_page_image"/>
       <Form onSubmit={handleLogin}>
              <label htmlFor="email" onChange={e => setEmail(e.target.value)} >Email:</label>
              <Input1 type="email" name="email" placeholder="Email" required />
           
              <Button1 type="submit" style={{ backgroundColor: "#8748F8",color:'white'}}>Login</Button1>
                </Form>
                <Hr />
           

<Modal
  isOpen={showMobileLogin}
  onRequestClose={handleCloseMobileLogin}
  style={customStyles}
  contentLabel="Mobile Login Modal"
>
  <p>We'll send you a code to the given mobile number to login into your account</p>
    
   
    <Input1 type="number" name="mobileNumber" placeholder="Mobile Number" required />
   
  <Button1 style={{backgroundColor:'#089b7d',color:'white'}} > Send OTP</Button1>
  <Hr />
  <p>Or</p>
  <Button1 style= {{backgroundColor:'#a1a1a1',color:'white'}}> Login</Button1>

</Modal>

      </Modal>

      <Form onSubmit={handleSubmit}>
  <Form.Group>
    <Form.Label>Monthly Budget</Form.Label>
    <Form.Control type="number" name="monthlyBudget" placeholder="Enter your monthly budget" required />
  </Form.Group>

  <Form.Group>
    <Form.Label>Salary</Form.Label>
    <Form.Control type="number" name="salary" placeholder="Enter your salary" required />
  </Form.Group>

  <Form.Group>
    <Form.Label>Number of Expenditures</Form.Label>
    <Form.Control type="number" name="numExpenditures" placeholder="Enter the number of expenditures" required />
  </Form.Group>

  {/* Render a form group for each expenditure */}
  {Array.from({ length: numExpenditures }, (_, i) => (
    <Form.Group key={i}>
      <Form.Label>Expenditure #{i + 1}</Form.Label>
      <Form.Control type="number" name={`expenditure${i}`} placeholder={`Enter expenditure #${i + 1}`} required />
    </Form.Group>
  ))}

  <Button type="submit">Submit</Button>
</Form>
{showconfetti && <Confetti />}
    </Container>
    
  )
}
