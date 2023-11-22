import React from 'react'
import { Button, Card, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { motion } from "framer-motion";
import '../Styles/Header.css'
import cardimg1 from '../assests/images/4955650.jpg'
import cardimg2 from '../assests/images/Budget.png'
import AnimationTitles from '../Components/AnimationTitles';
import Midpage from './Midpage';
function Header() {
  return (
    <div className="loading position-relative">
    <Container className="d-flex justify-content-between align-items-center gap-md-5 flex-column flex-md-row mt-3 mt-xl-4 overflow-hidden landing_page">
      <motion.div
        initial={{ x: -400 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <AnimationTitles title="Money is a tool Financial Wisdom is the craft" className="head"/>
        <p className="gray-90 mt-3 fs-5 small_txt">
        Money, a tool to enrich our lives, Financial wisdom, the craft that truly thrives.
        </p>
        <Button className="m-0 my-3 px-5 py-2 fs-5 fw-bold button">Get Started</Button>
        <div
          style={{ color: "white" }}
          className="d-none d-md-flex justify-content-between align-items-center my-4"
        >
          <div>
            <h5 className="fw-bold fs-3 text-dark">Task your way to <span className="fw-bold fs-3 " style={{color:'#8748F8'}}>success!</span></h5>
          </div>
         
        </div>
      </motion.div>
      <motion.div
        initial={{ x: 400 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.8 }}
        className="w-100 my-5"
      >
        <div className="cards">
          <Card className="bg-black-100 rounded">
            <Card.Body className="p-2">
              <div className="rounded overflow-hidden position-relative">
                <Card.Img
                  variant="top"
                  alt="img"
                  src="https://img.freepik.com/free-vector/transactional-marketing-abstract-concept_335657-3068.jpg?w=740&t=st=1699423808~exp=1699424408~hmac=cd293e470bc9e737862226c4849ab77ef9b3a0d4c2d4ffe54a760e4921eb5d90"
                />
              </div>
              <h5 className="mt-2 text-white fw-normal card_txt1">Hello</h5>
              <p className="gray-90">#Track your money</p>
              <div className="d-flex">
                <div className="me-3">
                  <span className="gray-90">Remaining Time</span>
                </div>
                
              </div>
            </Card.Body>
          </Card>
          <Card className="bg-black-100">
            <Card.Body className="p-2">
              <div className="rounded overflow-hidden position-relative">
                <Card.Img
                  variant="top"
                  alt="img"
                  src="https://img.freepik.com/premium-vector/budget-estimate-flat-illustration-customizable-design_9206-3028.jpg?size=626&ext=jpg&ga=GA1.1.741473410.1692964830&semt=ais"
                />
              </div>
              <h5 className="mt-2 text-white fw-normal card_txt">Welcome</h5>
              <p className="gray-90 card_txt_para">Budget Buddy</p>
              <div className="d-flex">
                <div className="me-3">
                  <span className="gray-90">Follow the Money Trail</span>
                </div>
                
              </div>
            </Card.Body>
          </Card>
        </div>
      </motion.div>
     
    </Container>
  </div>
  )
}

export default Header