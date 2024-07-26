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
import image1 from '../assests/images/4955650.jpg'
import axios from 'axios';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateField } from '@mui/x-date-pickers/DateField';
import { useScreenshot } from 'use-react-screenshot'
import { createRef } from 'react';
import dayjs from 'dayjs';
import borrom from '../assests/images/broom.png'
import '../Styles/Travel.css'
import snap from '../assests/images/capture.png'
import Navbar1 from './Nav';
import { ToastContainer, toast } from 'react-toastify';
import { FaCircle } from 'react-icons/fa';
function Travel() {
  const ref = createRef(null)
  const [image, takeScreenshot] = useScreenshot()
  const[showsnapimage,setShowsnapimage]= useState(false);
  const[count,setCount]=useState(0)
  const getImage = () => {
    if(!showsnapimage){
      setShowsnapimage(true);
      takeScreenshot(ref.current, { quality: 1 })
    }
    
  }
  const [value, setValue] = React.useState(dayjs('2022-04-17'));
  const [showSpinner1, setShowSpinner1] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [showMobileLogin, setShowMobileLogin] = useState(false);
  const[showplace,setShowplace] = useState("")
  const[amount,setAmount] = useState("")
  const[date,setDate] = useState("")
  const[showsnap,setShowsnap] = useState(false);
  const [balance, setBalance] = useState(() => {
    return parseFloat(localStorage.getItem('balance'))|| 0;
  });
  const openModal = () => {
    setModalIsOpen(true);
  };
  function closeModal(){
    setModalIsOpen(false);
  }
  const [formData, setFormData] = useState({
    place: '',
    expenditure: '',
    date:''
   

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
    toast.success("Added to your history")
    event.preventDefault();
    let travelHistory = JSON.parse(localStorage.getItem('travelHistory')) || [];
    const exists = travelHistory.some(data => JSON.stringify(data) === JSON.stringify(formData));
    
    if (!exists) {
        travelHistory.push(formData);
        localStorage.setItem('travelHistory', JSON.stringify(travelHistory));
    }
  
    let expenditure = parseFloat(event.target.expenditure.value);
    let currentBalance = parseFloat(localStorage.getItem('balance')) || 0;
    let newBalance = currentBalance - expenditure;
  
    setBalance(newBalance);
    setShowplace(formData.place);
    setAmount(formData.expenditure);
    setDate(formData.date)
    setShowsnap(true)
    localStorage.setItem('balance', newBalance.toString());
  };
  const travelHistory = JSON.parse(localStorage.getItem('travelHistory')) || [];
  const handleClick = () => {
    setShowSpinner1(true);
    setTimeout(() => {
      setShowSpinner1(false);
      localStorage.removeItem('travelHistory');
      window.location.reload();
    }, 2500);
   
  }
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loggedInStatus = localStorage.getItem('isLoggedIn');

    if (loggedInStatus === 'true') {
      setIsLoggedIn(true);
    }
  }, []);
  
  return (
    <>
    <Navbar1 />
    <ToastContainer />
    <Container fluid className="p-3"> 
  <div className='clear' onClick={handleClick} title="clear Hitory">
    <img  src={borrom} alt="clear" height="40px" width="40px"/>
  </div>
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col md={6} lg={9}>
          <Card className="p-4 p-xl-5 my-3 my-xl-4">
            <div className="d-flex flex-row align-items-start justify-content-between mb-3">
              
            <div className="d-flex justify-content-between align-items-center mb-3 w-100">
            <span className="fw-bold">Add your total travel planning to allocate a budget</span>
          </div>
            </div>
            <hr className="my-4"/>
            <Row className="mb-5">
              <Col>
              <div className="d-flex flex-row align-items-center">
                  <span className="fw-bold d-block me-2">Date:</span>
                  <Form.Control type="date"  name={"date"} onChange={handleChange} style={{
                      maxWidth: '150px'
                    }} className='input_field' required="required"/>
                </div>
            <hr className="my-4"/>
              <Form.Label className="fw-bold">Travelling Continent:</Form.Label>
                <Form.Select aria-label="Type" name="place" className="my-2 input_field drop" required="required" onChange={handleChange}>
                  
              <option>Choose the Tourist Place you wish to visit</option>
              <option value="Great Wall of China">Great Wall of China</option>
              <option value="Taj Mahal">Taj Mahal</option>
              <option value="Machu Picchu">Machu Picchu</option>
              <option value="Grand Canyon">Grand Canyon</option>
              <option value="Colosseum">Colosseum</option>
              <option value="Eiffel Tower">Eiffel Tower</option>
              <option value="Pyramids of Giza">Pyramids of Giza</option>
              <option value="Statue of Liberty">Statue of Liberty</option>
              <option value="Sydney Opera House">Sydney Opera House</option>
              <option value="Christ the Redeemer">Christ the Redeemer</option>
              <option value="Angkor Wat">Angkor Wat</option>
              <option value="Petra">Petra</option>
              <option value="Stonehenge">Stonehenge</option>
              <option value="Santorini">Santorini</option>
              <option value="Great Barrier Reef">Great Barrier Reef</option>
              <option value="Niagara Falls">Niagara Falls</option>
              <option value="Victoria Falls">Victoria Falls</option>
              <option value="Mount Everest">Mount Everest</option>
              <option value="Serengeti">Serengeti</option>
              <option value="Galapagos Islands">Galapagos Islands</option>
              <option value="Yellowstone National Park">Yellowstone National Park</option>
              <option value="Matterhorn">Matterhorn</option>
              <option value="Venice Canals">Venice Canals</option>
              <option value="Amazon Rainforest">Amazon Rainforest</option>
              <option value="Banff National Park">Banff National Park</option>
              <option value="Iguazu Falls">Iguazu Falls</option>
              <option value="Chichen Itza">Chichen Itza</option>
              <option value="Dead Sea">Dead Sea</option>
              <option value="Halong Bay">Halong Bay</option>
              <option value="Table Mountain">Table Mountain</option>
              <option value="Uluru">Uluru</option>

                </Form.Select>
                <Form.Label className="fw-bold">Expenditure:</Form.Label>
                <Form.Control placeholder={"Add total expenditures of travel (approximately)"} type="number" name="expenditure" className="my-2 input_field" autoComplete="email" required="required" onChange={handleChange}/>
                <span style={{marginLeft:'3px',color:'#8748F8'}}>**Enter the amount approximately to spend for travelling</span>
              </Col>
            </Row>
            <Row className="mt-4 justify-content-end">
              <Col lg={6}>
              <div ref={ref}>
                <div className="d-flex flex-row align-items-start justify-content-between">
                  <span className="fw-bold">Place:
                  </span>
                  <span>{showplace}</span>
                </div>
                <div className="d-flex flex-row align-items-start justify-content-between">
                  <span className="fw-bold">Date:
                  </span>
                  <span>{date}</span>
                </div>
                <hr/>
                <div className="d-flex flex-row align-items-start justify-content-between" style={{
                    fontSize: '1.125rem'
                  }}>
                  <span className="fw-bold">Total:
                  </span>
                  <span>{amount}</span>
                </div>
                </div>
              </Col>
            </Row>
            <hr className="my-4"/>
            {showsnap &&
              <div class="button-overlay" style={{ marginBottom: '10px' }} onClick={(event)=>{
                getImage(event);openModal(event)
              }}>
              <img src={snap} alt="snap" height="50px" width="50px" />
              <button>snap</button>
            </div>}
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
      <Modal 
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
        style={{
          overlay:{
            zIndex:3000
          },
          
        }}
      >
        <div className='image_snap_wrap'>
      <img width="480px" height="120px" src={image} alt={'Screenshot'} />
      </div>
      </Modal>

     {showSpinner1 && 
     <section class="sec-loading">
     <div class="one">
     </div>
   </section>
     } 
    </Container>
    </>
  )
}

export default Travel