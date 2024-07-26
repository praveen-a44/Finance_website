import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Card, Table } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { animateScroll as scroll } from 'react-scroll';
import { Modal } from 'react-bootstrap';
import { FaTrash } from 'react-icons/fa';
import '../Styles/Budget.css'
import Navbar1 from './Nav';
import { Trash } from 'react-bootstrap-icons';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf'
import { FaDownload } from 'react-icons/fa';

const CenteredForm = () => {
  const [budgets, setBudgets] = useState(JSON.parse(localStorage.getItem('budgets')) || []);
  const [groupedBudgets, setGroupedBudgets] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [balance, setBalance] = useState(() => {
    return parseFloat(localStorage.getItem('balance'))|| 0;
  });
  const monthOrder = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const yearOrder = [2023,2024,2025,2026,2027,2028,2029,2030,2031,2031,2032,2033,2034,2035,2036,2037,2040]
  useEffect(() => {
    const groups = budgets.reduce((grouped, budget) => {
      const key = `${budget.year}`;
      if (!grouped[key]) {
        grouped[key] = [];
      }
      grouped[key].push(budget);
      return grouped;
    }, {});
    setGroupedBudgets(groups);
  }, [budgets]);
  
  const [showSpinner, setShowSpinner] = useState(false);
  const handleDelete = (id) => {
    setShowSpinner(true);
    setTimeout(() => {
      setShowSpinner(false);
    }, 1700);
    const newBudgets = budgets.filter((budget, index) => index !== id);
    setBudgets(newBudgets);
    localStorage.setItem('budgets', JSON.stringify(newBudgets));
  };
  
let pdfBase64 = null;
  
function GenerateInvoice() {
  
  html2canvas(document.querySelector("#download_pdf")).then((canvas) => {
    const imgData = canvas.toDataURL('image/png', 1.0);
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'pt',
      format: [612, 792]
    });
    pdf.internal.scaleFactor = 1;
    const imgProps= pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save('invoice-001.pdf');
    pdfBase64 = pdf.output('datauristring'); 
  });
}


  const handleSubmit = (event) => {
    event.preventDefault();
    const { month, year, expenditure, amount } = event.target.elements;
    const newBudget = {
      month: month.value,
      year: year.value,
      expenditure: expenditure.value,
      amount: parseFloat(amount.value)
    };
    
    // Decrease the balance in local storage
    const newBalance = balance - newBudget.amount;
    if (newBalance < 0) {
      alert('Insufficient balance');
      event.target.reset();
      return;
    }
    setBalance(newBalance);
    localStorage.setItem('balance', newBalance.toString());
  
    const newBudgets = [...budgets, newBudget];
    newBudgets.sort((a, b) => {
      if (a.year !== b.year) {
        return a.year - b.year;
      }
      if (a.month !== b.month) {
        return monthOrder.indexOf(a.month) - monthOrder.indexOf(b.month);
      }
      return budgets.indexOf(a) - budgets.indexOf(b);
    });
    setBudgets(newBudgets);
    localStorage.setItem('budgets', JSON.stringify(newBudgets));
  
    toast.success('New entry added successfully!', {
      position: toast.POSITION.TOP_CENTER
    });
  
    scroll.scrollToBottom();
  
    event.target.reset();
  };
  
  const handleClear = (year) => {
    setShowModal(true);
  };

  const clearData = (year) => {
    const newBudgets = budgets.filter(budget => budget.year !== year);
    setBudgets(newBudgets);
    localStorage.setItem('budgets', JSON.stringify(newBudgets));
    setShowModal(false);
  };
  
  const calculateTotal = (budgets) => {
    return budgets.reduce((total, budget) => total + Number(budget.amount), 0);
  };
  return (
    <>
    <Navbar1 />
     <Modal show={showModal} onHide={() => setShowModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Confirm Delete</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure you want to delete all entries for this year? This action cannot be undone.</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowModal(false)}>
          Cancel
        </Button>
        <Button variant="danger" onClick={clearData}>
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
    <Container>
      <ToastContainer />
      <h2 className="heading_font" style={{textAlign:'center',position:'relative',top:'30px'}}>Add your Budget planing</h2>
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <Card className="p-4 my-5">
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="month">
                <Form.Label>Month</Form.Label>
                <Form.Select as="select" className='input_field'required>
                  <option>Choose...</option>
                  {monthOrder.map((month, index) => (
                    <option key={index}>{month}</option>
                  ))}
                </Form.Select>
              </Form.Group>

              <Form.Group controlId="year">
              <Form.Label>Year</Form.Label>
                <Form.Select as="select" className='input_field' required>
                  <option>Choose...</option>
                  {yearOrder.map((year, index) => (
                    <option key={index}>{year}</option>
                  ))}
                </Form.Select>
              </Form.Group>

              <Form.Group controlId="expenditure">
                <Form.Label>Expenditure</Form.Label>
                <Form.Control className='input_field' type="text" placeholder="Type your expenditure things" required />
              </Form.Group>

              <Form.Group controlId="amount">
                <Form.Label>Amount</Form.Label>
                <Form.Control  className='input_field' type="number" placeholder="Add total amount of budget" required />
              </Form.Group>

              <Button type="submit" style={{backgroundColor:'#8748F8',border:'none'}} className="mt-3">
                Submit
              </Button>
            </Form>
          </Card>
        </Col>
      </Row>
      {Object.entries(groupedBudgets).sort(([a], [b]) => yearOrder.indexOf(a) - yearOrder.indexOf(b)).map(([year, budgets]) => (
        <Row className="justify-content-center" key={year}>
          <Col xs={12} md={8} lg={6}>
            <Card className="p-4 my-5"  id="download_pdf">
              <h4 className="text-center mb-4">{`Budget Planning for ${year}`}</h4>
              <Button style={{backgroundColor:'#f44f51',border:'none',width:'40px'}} onClick={() => handleClear(year)} className="mb-3"><Trash id="trash_all" /></Button>
              <Button onClick={GenerateInvoice} className='w-25 download_btn' ><FaDownload /></Button>
              <br></br>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>&nbsp;S.No</th>
                    <th>Month</th>
                    <th>Year</th>
                    <th>Expenditure</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                {budgets.sort((a, b) => monthOrder.indexOf(a.month) - monthOrder.indexOf(b.month)).map((budget, index) => (
  <tr key={index}>
    <td> &nbsp;&nbsp;&nbsp;&nbsp;{index + 1}</td>
    <td>{budget.month}</td>
    <td>{budget.year}</td>
    <td>{budget.expenditure}</td>
    <td>{budget.amount}</td>
    <td><Trash id="each_delete"onClick={() => handleDelete(index)} /></td>
  </tr>
))}

                  <tr>
                    <td colSpan="4">&nbsp;Total</td>
                    <td>{calculateTotal(budgets)}</td>
                  </tr>
                </tbody>
              </Table>
            </Card>
          </Col>
        </Row>
      ))}
    </Container>
    {showSpinner && 
     <section class="sec-loading">
     <div class="one">
     
     </div>
   </section>
     } 

    </>
  );
};

export default CenteredForm;
