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
import Button from 'react-bootstrap/Button';
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

    const [balance, setBalance] = useState(() => {
      return parseFloat(localStorage.getItem('balance'))|| 0;
    });
  const history = useNavigate();
  const [showSpinner, setShowSpinner] = useState(false);
  const [fact, setFact] = useState('');
  const [date, setDate] = useState('');
  const[highlight,setHighlight] = useState('')

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
  

  



  const handleClick = (path) => {
    setShowSpinner(true);
    setTimeout(() => {
      setShowSpinner(false);
      history(path);
    }, 1700);
  }

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
        setTimeout(type, 30);
      }
    }
  
    type();
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
           <Button id="chat">Chat with us</Button>
          </div>
        </div>
      </div>

  <div className='Daily_facts_portion'>
  <div className="card fact_part">
  <h3 className="card-title fact_heading">Daily Fact</h3>
  <div className='image_wrapper1'>
  <img src={fact_img} height="100px" width="100px" alt='fact icon'/>
  </div>
  <p className="card-text fact_txt" dangerouslySetInnerHTML={{ __html: fact }}></p>
  <p className="card-date"> -- {date}</p>
</div>
<div class="vr" id="vertical_rule"></div>
<div class="hr"></div>
<div className="card balance_card">
<div>
  
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
          <Typography>
            
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
</div>
</div>

<div className="timeline">
      {steps.map((step, index) => (
        <div className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`} key={index}>
          <div className="point"></div>
          <div className="content">
            <h3>{step.title}</h3>
            <p>{step.description}</p>
          </div>
        </div>
      ))}
    </div>
<br>
</br>
<br></br>
<br></br>
<br></br>
<br></br>
<br></br>

<h1>Hello</h1>
    </>
  )
}

export default  Midpage




