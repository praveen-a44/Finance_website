import React from 'react'
import '../Styles/Mid.css'
import travel_img from '../assests/images/travel.png'
import wallet from '../assests/images/wallet.png'
import invest_img from '../assests/images/investment.png'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import separator_img from '../assests/images/arrows.png'
import chat_img from '../assests/images/Chat.jpg'
import { useRef } from "react";
import { useEffect } from 'react'
import axios from 'axios';
import fact_img from '../assests/images/thoughts.png'
import { Card } from '@mui/material'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { motion } from "framer-motion";
import { Form, Button, Modal } from 'react-bootstrap';



function Midpage() {
    const card_date = [
        {
            title:'Total Money',
            content:"Add Your Money",
            img:wallet,
            color:"#d4edf2",
            path:"/total_balance"
        },
        {
            title:'Travelling',
            content:"Save money for travel",
            img:travel_img,
            color:"#faeced",
            path:"/travel_form"

        },
        {
            title:'Investing',
            content:'Compound your money',
            img:invest_img, 
            color:"#deeffa",
            path:"/Investment"

        }
    ]
    
    const travelHistory = JSON.parse(localStorage.getItem('travelHistory')) || [];
    const invest_history = JSON.parse(localStorage.getItem('investmentplan')) || [];

    const [balance, setBalance] = useState(() => {
      return parseFloat(localStorage.getItem('balance'))|| 0;
    });
  const history = useNavigate();
  const [showSpinner, setShowSpinner] = useState(false);
  const [fact, setFact] = useState('');
  const [date, setDate] = useState('');

  const steps = [
    { title: 'Step 1', description: 'Description for step 1...' },
    { title: 'Step 2', description: 'Description for step 2...' },
    { title: 'Step 3', description: 'Description for step 2...' },



  ];
  const category = 'money'
  useEffect(() => {
    const storedDate = localStorage.getItem('date');
    const currentDate = new Date().toLocaleDateString();
  
    if (storedDate !== currentDate) {
      axios({
        method: 'GET',
        url: 'https://api.api-ninjas.com/v1/quotes?category=' + category,
        headers: {
          'X-Api-Key': '5zzJa8fel6df8KbbkyD+Yg==Em3tWC6enFCwxsvN'
        }
      })

.then(response => {
  console.log(response.data);
  let randomIndex = Math.floor(Math.random() * response.data.length);
  let quote = response.data[randomIndex].quote;
  let words = quote.split(' ');
  let start = Math.floor(Math.random() * (words.length - 5));
  let highlight = words.slice(start, start + 5).join(' ');
  let markedQuote = quote.replace(highlight, `<mark>${highlight}</mark>`);
  setFact(markedQuote);
  setDate(currentDate);
  localStorage.setItem('date', currentDate);
  localStorage.setItem('quote', markedQuote);
})
.catch(error => console.error(error));



    } else {
      setFact(localStorage.getItem('quote'));
      setDate(storedDate);
    }
  }, []);
  

  
  const [scrollPosition, setScrollPosition] = useState(0);

  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);



  const handleClick = (path) => {
    setShowSpinner(true);
    setTimeout(() => {
      setShowSpinner(false);
      history(path);
    }, 1700);
  }
  const [showModal_chat, setShowModal_chat] = useState(false);

  const typingRef = useRef();
  useEffect(() => {
    const text = "Keeping track of your finances is like a lighthouse guiding a ship in a stormy sea. It might not prevent the storm, but it can certainly help you navigate through it.";
    let index = 0;
  
    function type() {
      if (index < text.length) {
        const nextCharacter = String.fromCharCode(text.codePointAt(index));
        if (typingRef.current) {
          const currentText = typingRef.current.textContent;
          typingRef.current.textContent = currentText.slice(0, index) + nextCharacter + currentText.slice(index + 1);
        }
        index++;
        setTimeout(type, 52);
      }
    }
  
    type();
  }, []);
 
  const show_chat_popup =()=>{
    setShowModal_chat(true)
  }
  const [showlogo, setShowlogo] = useState(true);
  const [count, setCount] = useState(() => {
    const savedCount = localStorage.getItem('count');
    return savedCount ? JSON.parse(savedCount) : 0;
  });
  
  useEffect(() => {
    if (count === 0) {
      setShowlogo(true);
      setTimeout(() => {
        setShowlogo(false);
      }, 4500);
    }
    localStorage.setItem('count', JSON.stringify(count));
  }, [count]);
  
  useEffect(() => {
    setCount(0);
  }, []);
  
  return (
    <>
    <div className='card_container'>
      {card_date.map((card,index)=>(
        <div key={index} className='cards_mid' onClick={() => handleClick(card.path)}>
            <h3>{card.title}</h3>
            <p>{card.content}</p>
            <div className='image_wrapper' style={{backgroundColor: card.color}} >
                <img src={card.img} alt='image1' style={{position: 'relative', top: '50%'}} /> 
              </div>
        </div>
      ))}

    </div>

    {showSpinner && 
     <section class="sec-loading">
     <div class="one">
     
     </div>
   </section>
     } 

<div className='hr_line'>
    <img src={separator_img} height='50px' width='50px' alt='Divider'/>
    <hr className="my-4"
        style={{
          height: '3px',
          width:'10px'
        }}
      />
      </div>

      <div className='below_cards'>
        <div className='left_part'>
          <img src={chat_img} alt='chat_img' height="350px" width="450px"/>
        </div>
        <div className='right_part'>
          <h3 ref={typingRef} className="typing">
          
          </h3>
          <div className='chat_btn'>
           <Button id="chat" onClick={show_chat_popup}>Chat with us</Button>
          </div>
        </div>
      </div>
      <Modal show={showModal_chat}>
            <Modal.Header>
            <Modal.Title>Query</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form.Control placeholder={"Your message is valuable"} as="textarea" name="total_money" className="my-2 input_field" required="required"/>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="primary" style={{backgroundColor:'#8748F8',border:'none'}}>
                Send
            </Button>
            <Button variant="secondary" onClick={() => setShowModal_chat(false)}>
                Close
            </Button>
            </Modal.Footer>
        </Modal>

  <div className='Daily_facts_portion'>
  <div className={`card fact_part ${scrollPosition > 900 ? "slideFromLeft" : ""}`}>
  <h3 className="card-title fact_heading">Daily Fact</h3>
  <div className='image_wrapper1'>
  <img src={fact_img} height="100px" width="100px" alt='fact icon'/>
  </div>
  <p className="card-text fact_txt" dangerouslySetInnerHTML={{ __html: fact }}></p>
  <p className="card-date"> -- {date}</p>
</div>
<div class="vr" id="vertical_rule"></div>
<div class="hr"></div>
<div className={`card balance_card ${scrollPosition > 900 ? "slideFromRight" : ""}`}>
<div>
<motion.div
        initial={{ x: 400 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.8 }}
        className="w-100 my-5"
      >
<h5 className="card-title">Total Balance</h5>
    <h1 className="card-text card-title">₹&nbsp;{balance}</h1>
    <p className="card-text">Your current total balance in the wallet.</p>
      <Accordion className='expenditure_card'>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Travel Expenditures</Typography>
        </AccordionSummary>
        <AccordionDetails>
        <List className='details_padding'>
      {travelHistory.map((item, index) => (
        <ListItem key={index}>
          <Typography variant="body1" component="span" style={{marginRight:'30px'}}>
            {item.place}
          </Typography>
          <span style={{textAlign:'center',position:'absolute',right:'75px'}}>-</span>
          <Typography variant="body1" component="span" style={{ marginLeft: 'auto',justifyContent:'right' }}>
            ${item.expenditure}
          </Typography>
        </ListItem>
      ))}
    </List>
  </AccordionDetails>
      </Accordion>
      <Accordion  className='expenditure_card'>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>Investment</Typography>
        </AccordionSummary>
        <AccordionDetails>
        <List className='details_padding'>
      {invest_history.map((item, index) => (
        <ListItem key={index}>
          <Typography variant="body1" component="span" style={{marginRight:'30px'}}>
            {item.platform}
          </Typography>
          <span style={{textAlign:'center',position:'absolute',right:'75px'}}>-</span>
          <Typography variant="body1" component="span" style={{ marginLeft: 'auto',justifyContent:'right' }}>
            ${item.amount}
          </Typography>
        </ListItem>
      ))}
    </List>
        </AccordionDetails>
      </Accordion>
      </motion.div>

    </div>
</div>
</div>

<section class="design-section">
  <h1>Follow these things</h1>
<div class="timeline">

         
                  <div class="timeline-empty">
                  </div>



               <div class="timeline-middle">
                   <div class="timeline-circle"></div>
               </div>
               <div className={`timeline-component timeline-content ${scrollPosition > 1300 ? "slideFromRight" : ""}`}>
                <h3 className='txt_clr_timeline'>Process 1</h3>
                <p>First add your money data to this webpage in Total money section.</p>
           </div>
                <div className={`timeline-component timeline-content ${scrollPosition > 1790 ? "slideFromLeft" : ""}`}>
                         <h3 className='txt_clr_timeline'>Process 2</h3>
                         <p>Add your Expenditures in travel + investment.</p>
                </div>
                <div class="timeline-middle">
                    <div class="timeline-circle"></div>
                </div>
                <div class="timeline-empty">
                </div>

                <div class="timeline-empty">
                </div>

               <div class="timeline-middle">
                   <div class="timeline-circle"></div>
               </div>
               <div className={` timeline-component timeline-content ${scrollPosition > 1950 ? "slideFromRight" : ""}`} >
                <h3 className='txt_clr_timeline'>Process 3</h3>
                <p>You can finally see where your money is going and some extra features<span className='txt_clr_timeline'>(bill remainders, budget form with download option, You can view a daily quotes about money)</span>.</p>
           </div>

       </div>
    </section> 
<br>
</br>
<br></br>
<br></br>
<br></br>
<br></br>
<br></br>


{showlogo  &&<div className='front_page'>
{/* <div className='rotate_logo1'>
</div>
<div>
    <div className="logo-wrap1">
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      viewBox="0 -60 1000 450"
      style={{ enableBackground: 'new 0 0 855 150' }}
      xmlSpace="preserve"
    >
      <style type="text/css">
        
      </style>
      <text transform="matrix(1 0 0 1 0 195.5508)" className="st10 st11 st12 total_txt_logo">
        Budgey buddy
      </text>
    </svg>
  </div>
  </div> */}
  <p id="p">Budget Buddy</p>

</div>
}

    </>
  )
}

export default  Midpage




