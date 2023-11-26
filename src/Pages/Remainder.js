import React, { useState, useEffect } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';
import '../Styles/Remainder.css'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import { Card } from 'react-bootstrap';
import { Trash } from 'react-bootstrap-icons';
import Navbar1 from './Nav';

const Reminder = () => {
  const savedReminders = JSON.parse(localStorage.getItem('otherReminders')) || [];
  const [reminders, setReminders] = useState(savedReminders);
  const [reminder, setReminder] = useState({
    title: '',
    date: '',
    time: '',
    displayed: false, 
  });
  const [showSpinner, setShowSpinner] = useState(false);
  const [showModal_remainder, setShowModal_remainder] = useState(false);
  const [modalContent, setModalContent] = useState({});

  useEffect(() => {
    reminders.forEach(scheduleNotification);
  }, [reminders]);

  const handleChange = (event) => {
    setReminder({
      ...reminder,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    setShowSpinner(true);
    setTimeout(() => {
      setShowSpinner(false);
    }, 1700);
    event.preventDefault();
    const newReminders = [...reminders, reminder];
    setReminders(newReminders);
    localStorage.setItem('otherReminders', JSON.stringify(newReminders));
    scheduleNotification(reminder, newReminders.length - 1); 
    setReminder({
      title: '',
      date: '',
      time: '',
      displayed: false,
    });
  };

  const handleDelete = (index) => {
    setShowSpinner(true);
    setTimeout(() => {
      setShowSpinner(false);
    }, 1700);
    const newReminders = reminders.filter((reminder, i) => i !== index);
    setReminders(newReminders);
    localStorage.setItem('otherReminders', JSON.stringify(newReminders)); 
  };

  const handleClearAll = () => {
    setShowSpinner(true);
    setTimeout(() => {
      setShowSpinner(false);
    }, 1700);
    setReminders([]);
    localStorage.removeItem('otherReminders');
  };

  const scheduleNotification = (reminder, index) => {
    const now = new Date();
    const reminderTime = new Date(`${reminder.date}T${reminder.time}`);
    const delay = reminderTime.getTime() - now.getTime();
  
    if (delay > 0) {
      setTimeout(() => {
        const reminder = reminders[index];
        if (reminder) {
          setModalContent(reminder);
          setShowModal_remainder(true);
          const newReminders = [...reminders];
          newReminders[index].displayed = true; 
          setReminders(newReminders);
          localStorage.setItem('otherReminders', JSON.stringify(newReminders));
        }
      }, delay);
    }
  };
  
  return (
    <>
    <Navbar1 />
   <Container fluid className="p-3 container-width">

    <Row className="justify-content-center">
    <Col xs={12} md={8} lg={6}>
    <Card className="p-4 my-5">
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control as="textarea" name="title" className="input_field_remainder input_field" value={reminder.title} onChange={handleChange} required />
        </Form.Group>
        <Row>
        <Form.Group as={Col} controlId="date">
              <Form.Label>Date</Form.Label>
              <Form.Control type="date" name="date"  className="input_field_remainder input_field" value={reminder.date} onChange={handleChange} required />
            </Form.Group>

            <Form.Group as={Col} controlId="time">
              <Form.Label>Time</Form.Label>
              <Form.Control type="time" name="time" className="input_field_remainder input_field" value={reminder.time} onChange={handleChange} required />
            </Form.Group>
            </Row>
        <br></br>
        <Button type="submit"  style={{backgroundColor:'#8748F8',border:'none'}}>
          Set Reminder
        </Button>
      </Form>
      </Card>
      </Col>
      </Row>
      <Button onClick={handleClearAll}  style={{backgroundColor:'#8748F8',border:'none'}}>
        Clear All
      </Button>
      <br></br>
      <br></br>

      <div className="reminder-list">
        {reminders.map((reminder, index) => (
          <div key={index} className={`reminder-note ${reminder.displayed ? 'past-reminder' : ''}`}>
            <h4>{reminder.title}</h4>
            <p>{reminder.date} {reminder.time}</p>
            <Trash id="each_delete" onClick={() => handleDelete(index)} />
          </div>
        ))}
      </div>

      <div className={showModal_remainder ? 'shake' : ''}>
        <Modal show={showModal_remainder} onHide={() => setShowModal_remainder(false)}>
            <Modal.Header closeButton>
            <Modal.Title>Reminder</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <h4>{modalContent.title}</h4>
            <p>{modalContent.date} {modalContent.time}</p>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal_remainder(false)}>
                Close
            </Button>
            </Modal.Footer>
        </Modal>
        </div>

      </Container>
    </>
  );
};

export default Reminder;
