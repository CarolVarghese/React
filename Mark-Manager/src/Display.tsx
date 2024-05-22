import './display.css'
import { useState, useEffect } from 'react';
import {MarkDetailsModel}  from './App' 
import Accordion from 'react-bootstrap/Accordion';
import ReactPaginate from 'react-paginate';
import BarChart from "./DataChart"
import {months}  from './App'
import "../node_modules/bootstrap/dist/css/bootstrap.css"
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/esm/Row';
import { Col } from 'react-bootstrap';
import InputGroup from 'react-bootstrap/InputGroup';
interface DisplayProps {
  onEditClick: (data: MarkDetailsModel) => void;
  
}

function Display(props: DisplayProps){

  /////Storing the data in local storage to "storedData">>>>>>>>>>>>>>>

  const [storedData , setStoredData] = useState<{ [key: string]: MarkDetailsModel }>({});
  const [searchWord, setSearchWord] = useState('');

  useEffect( () => {
    const localStorageData: { [key: string]: MarkDetailsModel } = {};
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key) {
        const data = JSON.parse(localStorage.getItem(key) || '');
        {
          if (data.name.toLowerCase().includes(searchWord.toLowerCase())) {
          localStorageData[key] = data;
        }
        }
      }
    }
    setStoredData(localStorageData);
  }, [searchWord]);
  
  /////<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<....<<<<<<<<<
  

  const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchWord(e.target.value);
    
  };
  /// Data rendering after slicing according to pagination>>>>>....>>>>>>>>>

  const renderData = () => {
    const keys = Object.keys(sortedData).length > 0 ? Object.keys(sortedData) : Object.keys(storedData);
    const start = Number(pageNumber) * Number(itemsPerPage);
    const end = Number(start) + Number(itemsPerPage);
    const slicedData = keys.slice(start,end);
      
    return slicedData.map((key) => (
      <tr key={key}>
        <td><text>{storedData[key].month}</text></td>
        <td>{storedData[key].name}</td>
        <td>{storedData[key].rollno}</td>
        <td>{storedData[key].attPercentage}%</td>
        <td>
          <td id='Mark'>{storedData[key].malayalam}</td>
          <td id='Mark'>{storedData[key].maths}</td>
          <td id='Mark'>{storedData[key].english}</td>
          <td id='Mark'>{storedData[key].total}</td>
        </td>
        <td><Button variant='primary' onClick={() => props.onEditClick(storedData[key])}>Edit</Button></td>
        <td><Button variant="danger"  onClick={() => deleteClick(storedData[key].name)} >Delete</Button></td>
      </tr>
      ));
  };
  //<<<<<<<<<<<<<<<<<<<<<<<......<<<<<<<<<<<<<<<<<<<<<.....<<<<<<<<<<<<<<<<<<


  //>>>>Pagination >>>>>>>>.....>>>>>>>>>>>>>>>>>>>>>>....>>>>>>>>>>>>>>>>

  const [pageNumber, setPageNumber] = useState(0);
  const [itemsPerPage, setitemsPerPage] = useState(6);
    
  const pageCount = Math.ceil(Object.keys(storedData).length / itemsPerPage);
  

  const handlePageClick = (data: { selected: number }) => {
      setPageNumber(data.selected);
  };

  function handleChange(e) {
    setitemsPerPage(e.target.value); 
    setPageNumber(0);
  }
  //Pagination<<<<<<<<<......<<<<<<<<<<<<<<<<<<<<<<<<....<<<<<<<<<<<<<<<<<<

  //Sorting <>>>>....>>>>>>>>>>>>>>>>>>>>>>>>>>......>>>>>>>>>>>>>>>
  const [sortedColumn, setSortedColumn] = useState<string>('');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [sortedData, setSortedData] = useState<{ [key: string]: MarkDetailsModel }>({});
  
  const sortData = (column: string, direction: 'asc' | 'desc') => {
    const sorted = Object.keys(storedData).sort((a, b) => {
      if (column === 'month') {
        const indexA = months.indexOf(storedData[a][column]);
        const indexB = months.indexOf(storedData[b][column]);
        return direction === 'asc' ? indexA - indexB : indexB - indexA;
      } 
      else {
        const valueA = storedData[a][column];
        const valueB = storedData[b][column];

        if (direction === 'asc') {
          return valueA < valueB ? -1 : 1;
        } else {
          return valueA > valueB ? -1 : 1;
        }
      }
    });

    const sortedObject: { [key: string]: MarkDetailsModel } = {};
    sorted.forEach((key) => {
      sortedObject[key] = storedData[key];
    });

    setSortedData(sortedObject);
  };
    ///>>>>>>>>>>>Sort function for each column
  const handleClick = (column: string) => {
    const newDirection = column === sortedColumn && sortDirection === 'asc' ? 'desc' : 'asc';
    setSortDirection(newDirection);
    setSortedColumn(column);
    sortData(column, newDirection);
  };

  //?Sorting<<<<<<<<<<...<<<<<<<<<<<<<.......<<<<<<<<<<<<<<<<<<<<<<


  //Warnig Dilouge for Delete>>>>>>>......>>>>>>>>>>....>>>>>>>

  const [Show, setShow] = useState(false)
  const [deleteKey, setDeleteKey] = useState<string>('')
  
  function deleteClick (key:string){
    setShow(true);
    setDeleteKey(key)
    
  }

  function handleConfirm  ()  {
    localStorage.removeItem(deleteKey);
    window.location.reload()
  };

  const handleCancel = () => {
      setShow(false);
  };
  //<<<<<<<<<<<<<<<<<<<<<<delete warning//

  
    
  ////<<<<Creiteria for  finding Best student<<<<<<<<

  const [startMonth, setStartMonth] = useState<string>('');
  const [endMonth, setEndMonth] = useState<string>('');
  const [bestStudent, setBestStudent] = useState<MarkDetailsModel | null>(null);
  let [point,setPoint]=useState<Number>(0);
  const localStorageData = Object.entries(localStorage).map(([key, value]) => JSON.parse(value));
  const namesArray: string[] = localStorageData.map((obj: { name: any; }) => obj.name);
  const marksArray: number[] = localStorageData.map((obj: { total: any; attPercentage :any;}) => (((obj.total) / 3)*0.15 +(obj.attPercentage*0.05)));


  const handleSearch = () => {
    if (!startMonth || !endMonth) {
      alert('Please select both start and end months.');
      return;
    }

    const studentsWithinRange = Object.values(storedData).filter(
      (student) =>
        student.month >= startMonth && student.month <= endMonth
    );

    if (studentsWithinRange.length === 0) {
      alert('No students found within the selected range.');
      return;
    }

    const best = studentsWithinRange.reduce((prev, current) =>
      ((prev.total) / 3)*0.15 + (prev.attPercentage*0.05)>
      ((current.total) / 3)*0.15 +(current.attPercentage*0.05)
        ? prev
        : current
    );
    
    setBestStudent(best);
    setPoint(((Number(best.malayalam) +
      Number(best.maths) + Number(best.english))/3)*0.15 +(best.attPercentage*0.05) )
  };
  
  
    //>>>>>>>>>>>>>>>>>>>>><<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

  

  return(                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
    <>
      <br />
      <br /><br />
      
      

      <InputGroup className="mb-3">
        <Form.Control
          placeholder="Search for a student"
          aria-label="Search for a student"
          aria-describedby="basic-addon2"
          value={searchWord} onChange={handleChangeSearch}
        />
        </InputGroup>
      

      <table id="maxWidth" className="tablebg">
        <thead>
          <tr>
            <th rowSpan={2} onClick={() => handleClick('month')}>Month</th>
            <th rowSpan={2} onClick={() => handleClick('name')}>Name</th>
            <th rowSpan={2} onClick={() => handleClick('rollno')}>Roll No.</th>
            <th rowSpan={2} onClick={() => handleClick('attendence')}>Attendance</th>
            <th rowSpan={2} onClick={() => handleClick('maths')}>          
              <tr>
                <th colSpan={4}>Marks</th>
              </tr>
              <tr>
                <th id='Mark'>Malayalam</th>
                <th id='Mark'>Maths</th>
                <th id='Mark'>English</th>
                <th id='Mark'>Total </th>
              </tr>
            </th>
                      
            <th rowSpan={2}> Edit </th>
            <th rowSpan={2}> Delete </th>
          </tr>
        </thead>
        <tbody>
          {renderData()}  
        </tbody>
      </table>

      

      <Alert show={Show} variant="warning">
        <Alert.Heading>Warning!!</Alert.Heading>
        <p>
        Are you sure you want to delete?
        </p>
        <Button variant='Danger' onClick={handleConfirm}>Yes</Button>
        <Button variant="Warning" onClick={handleCancel}>Cancel</Button>
  
        <hr />
        
      </Alert>

      

<br />
<h3 id="center">Select number of rows</h3>

<div id="center">
  <Form.Check
   inline
    type="radio"
    id="radio1"
    label="2"
    name="itemsPerPage"
    value={2}
    checked={itemsPerPage === 2}
    onChange={handleChange}
  />
  <Form.Check
    inline
    type="radio"
    id="radio2"
    label=" 4"
    name="itemsPerPage"
    value={4}
    checked={itemsPerPage === 4}
    onChange={handleChange}
  />
  <Form.Check
    inline
    type="radio"
    id="radio3"
    label="6"
    name="itemsPerPage"
    value={6}
    checked={itemsPerPage === 6}
    onChange={handleChange}
  />
  </div>


      <ReactPaginate
        previousLabel={'Previous'}
        nextLabel={'Next'}
        breakLabel={'...'}
        breakClassName={'break-me'}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={'pagination'}
        activeClassName={'active'}
      /> 

      <div id="Search">
        <h2>Select the best student</h2>

        <Row className="mb-3">
        <Form.Group as={Col} className="mb-3" >
          <Form.Select name="month"  value={startMonth}  onChange={(e) => setStartMonth(e.target.value)}>
                <option value=""  disabled selected >
                select start month
                </option>
                {months.map((month, index) => (
                  <option key={index} value={month}>
                    {month}
                  </option>
                ))}
              </Form.Select>
          </Form.Group>

              
          <Form.Group as={Col} className="mb-3" >
          
          <Form.Select name="month"  value={endMonth}  onChange={(e) => setEndMonth(e.target.value)}>
                <option value=""  disabled selected >
                Select end month
                </option>
                {months.map((month, index) => (
                  <option key={index} value={month}>
                    {month}
                  </option>
                ))}
              </Form.Select>
          </Form.Group>
        </Row>
        <Button  variant='success' type='submit' onClick={handleSearch}>Find</Button>
              
        {bestStudent && (
          <div>
            <h3>Best Performing Student</h3>
            <p>Name: {bestStudent.name}</p>
            <p>Total Points:{point.toFixed(2)} / 20</p>
            <p>Total Points =marks/15 + attendence /5</p>
          </div>
        )}
        
      </div>
      <div>
        <h2>Data Visualisation - Bar chart</h2>
        <BarChart data={marksArray} labels={namesArray}/>
      </div>
    </>
  );

};

export default Display 
