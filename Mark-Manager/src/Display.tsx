import './display.css'
import { useState, useEffect } from 'react';
import {markDetailsModel}  from './App'
import ReactPaginate from 'react-paginate';
import BarChart from "./DataChart"
import {months}  from './App'


interface DisplayProps {
  onEditClick: (data: markDetailsModel) => void;
  
}

function Display(props: DisplayProps){   
   
  /////Storing the data in local storage to "storedData">>>>>>>>>>>>>>>

  const [storedData , setStoredData] = useState<{ [key: string]: markDetailsModel }>({});
  const [searchWord, setSearchWord] = useState('');

  useEffect( () => {
    const localStorageData: { [key: string]: markDetailsModel } = {};
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
        <td><button onClick={() => props.onEditClick(storedData[key])}>Edit</button></td>
        <td><button onClick={() => deleteClick(storedData[key].name)} >Delete</button></td>
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
  const [sortedData, setSortedData] = useState<{ [key: string]: markDetailsModel }>({});
  
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

    const sortedObject: { [key: string]: markDetailsModel } = {};
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

  const [isDialougeOpen, setDilougeOpen] = useState(false)
  const [deleteKey, setDeleteKey] = useState<string>('')

  function deleteClick (key:string){
    setDilougeOpen(true);
    setDeleteKey(key)
    
  }

  function handleConfirm  ()  {
    localStorage.removeItem(deleteKey);
    window.location.reload()
  };

  const handleCancel = () => {
      setDilougeOpen(false);
  };
  //<<<<<<<<<<<<<<<<<<<<<<delete warning//

  
    
  ////<<<<Creiteria for  finding Best student<<<<<<<<

  const [startMonth, setStartMonth] = useState<string>('');
  const [endMonth, setEndMonth] = useState<string>('');
  const [bestStudent, setBestStudent] = useState<markDetailsModel | null>(null);
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
      <h2>Details</h2>
      <label>Search for a student :</label>

      <input type="text" value={searchWord} onChange={handleChangeSearch} />
      <table>
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

      {isDialougeOpen && (
        <div id="myDialog">
          <p>Are you sure you want to delete?</p>
          <button onClick={handleConfirm}>Yes</button>
          <button onClick={handleCancel}>Cancel</button>
        </div>
      )}

      <div className='container'>
        <h3>Select number of rows</h3>
        <select value={itemsPerPage} onChange={handleChange}>
          <option value={2}>2</option>
          <option  value={4}>4</option>
          <option  value={6}>6</option>
        </select>
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
        <div>
          <label>Select start month:</label>
          <select value={startMonth} onChange={(e) => setStartMonth(e.target.value)}>
            <option value="" disabled selected hidden>select start month</option>
            {months.map((month, index) => (
              <option key={index} value={month}>
                {month}
              </option>
            ))}

          </select>
        </div>

        <div>
          <label>Select end month:</label>
          <select value={endMonth} onChange={(e) => setEndMonth(e.target.value)}>
            <option value="" disabled selected hidden>select end month</option>
            {months.map((month, index) => (
              <option key={index} value={month}>
                {month}
              </option>
            ))}
          </select>
        </div>

        <button onClick={handleSearch}>Search</button>      
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
