import React, { ChangeEvent, useRef, useState, useEffect } from 'react';
import './App.css';
import Display from './Display';
import Auth from './Auth';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Accordion from 'react-bootstrap/Accordion';
import { MarkDetailsModel, months } from './types';
import { logout } from './authService';

const App: React.FC = () => {
  const [markDetails, setMarkDetails] = useState<MarkDetailsModel>({
    month: "",
    name: "",
    rollno: 0,
    workingDays: 0,
    attendence: 0,
    attPercentage: 0,
    malayalam: 0,
    maths: 0,
    english: 0,
    total: 0
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editingStudent, setEditingStudent] = useState<MarkDetailsModel | null>(null);
  const [autocompleteOptions, setAutocompleteOptions] = useState<string[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!getAccessToken());

  const handleLogout = () => {
    logout();
    setIsAuthenticated(false);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setMarkDetails(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const percentage = (markDetails.attendence / markDetails.workingDays) * 100;
    const attPercentage = parseFloat(percentage.toFixed(2));
    const total = Number(markDetails.malayalam) + Number(markDetails.maths) + Number(markDetails.english);

    const updatedMarkDetails = {
      ...markDetails,
      attPercentage,
      total
    };

    if (isEditing && editingStudent) {
      localStorage.setItem(editingStudent.name, JSON.stringify(updatedMarkDetails));
    } else {
      localStorage.setItem(markDetails.name, JSON.stringify(updatedMarkDetails));
    }

    formRef.current?.reset();
    setIsEditing(false);
    setEditingStudent(null);
    window.location.reload(); // This is not recommended; consider updating state instead
  };

  const handleEditClick = (data: MarkDetailsModel) => {
    setIsEditing(true);
    setEditingStudent(data);
    setMarkDetails(data);
  };

  const defaultMonth = isEditing ? editingStudent?.month : markDetails.month;

  useEffect(() => {
    const storedMarkDetails = localStorage.getItem('MarkDetails');
    if (storedMarkDetails) {
      const parsedMarkDetails: MarkDetailsModel[] = JSON.parse(storedMarkDetails);
      const namesArray: string[] = parsedMarkDetails.map(details => details.name);
      setAutocompleteOptions(namesArray);
    }
  }, []);

  function handleLogin(username: string): void {
    setIsAuthenticated(true);
  }

  if (!isAuthenticated) {
    return <Auth handleLogin={handleLogin} />;
  }

  return (
    <div className="App">
      <div className="container">
        <Accordion id="maxWidth">
          <Accordion.Item eventKey="0">
            <Accordion.Header>Tap to enter student details</Accordion.Header>
            <Accordion.Body>
              <h2>Enter Details</h2>
              <Form onSubmit={handleSubmit} ref={formRef} className="contact-form">
                <Form.Group className="form-field mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Select name="month" className="input-text" value={defaultMonth} onChange={handleChange} required>
                    <option value="" disabled>{defaultMonth || "Select Month"}</option>
                    {months.map((month, index) => (
                      <option key={index} value={month}>{month}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
                <Row className="mb-3">
                  <Form.Group as={Col} className="form-field mb-3" controlId="ControlNameInput1">
                    <Form.Label className="label" htmlFor="name">Name</Form.Label>
                    <Form.Control type="text" className="input-text" name="name" placeholder="Name" onChange={handleChange} value={markDetails.name} required />
                  </Form.Group>
                  <Form.Group as={Col} className="form-field mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label className="label" htmlFor="rollno">Roll Number</Form.Label>
                    <Form.Control type="number" className="input-text" name="rollno" placeholder="Roll Number" onChange={handleChange} value={markDetails.rollno} required />
                  </Form.Group>
                </Row>
                <Row>
                  <Form.Group as={Col} className="form-field mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label className="label" htmlFor="workingDays">Number of Working Days</Form.Label>
                    <Form.Control type="number" className="input-text" name="workingDays" min="1" max="31" onChange={handleChange} value={markDetails.workingDays} required />
                  </Form.Group>
                  <Form.Group as={Col} className="form-field mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label className="label" htmlFor="attendence">Attendance</Form.Label>
                    <Form.Control type="number" className="input-text" name="attendence" min="1" max="31" onChange={handleChange} value={markDetails.attendence} required />
                  </Form.Group>
                </Row>
                <Row>
                  <h3>Enter Marks</h3>
                  <Form.Group as={Col} className="form-field mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label className="label" htmlFor="malayalam">Malayalam</Form.Label>
                    <Form.Control type="number" className="input-text" name="malayalam" onChange={handleChange} value={markDetails.malayalam} required />
                  </Form.Group>
                  <Form.Group as={Col} className="form-field mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label className="label" htmlFor="maths">Maths</Form.Label>
                    <Form.Control type="number" className="input-text" name="maths" onChange={handleChange} value={markDetails.maths} required />
                  </Form.Group>
                  <Form.Group as={Col} className="form-field mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label className="label" htmlFor="english">English</Form.Label>
                    <Form.Control type="number" className="input-text" name="english" onChange={handleChange} value={markDetails.english} required />
                  </Form.Group>
                </Row>
                <div id="center">
                  <Button variant="primary" type="submit">Submit</Button>
                </div>
              </Form>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>
      <Display onEditClick={handleEditClick} isLoggedIn={isAuthenticated} username={'Current User'} handleLogin={handleLogin} handleLogout={handleLogout} />
      <Button onClick={handleLogout}>Logout</Button>
    </div>
  );
};

function getAccessToken(): string | null {
  return localStorage.getItem('accessToken');
}

export default App;
