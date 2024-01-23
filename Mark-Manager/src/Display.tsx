import './display.css'

import { useState, useEffect } from 'react';
import {markDetailsModel} from './App'
import ReactPaginate from 'react-paginate';



interface DisplayProps {
  onEditClick: (data: markDetailsModel) => void;
}


function Display(props: DisplayProps){

    
   
    const [startMonth, setStartMonth] = useState<string>('');
    const [endMonth, setEndMonth] = useState<string>('');
    const [bestStudent, setBestStudent] = useState<markDetailsModel | null>(null);
    const [storedData , setStoredData] = useState<{ [key: string]: markDetailsModel }>({});

    const readData = () => {
      const localStorageData: { [key: string]: markDetailsModel } = {};
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key) {
          const data = JSON.parse(localStorage.getItem(key) || '');
          {
            localStorageData[key] = data;
          }
        }
      }
      setStoredData(localStorageData);
    };
    const months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    
    const [pageNumber, setPageNumber] = useState(0);
    const itemsPerPage = 5;
    const pageCount = Math.ceil(Object.keys(storedData).length / itemsPerPage);
    useEffect(() => {
        readData();
      }, []);


      const handlePageClick = (data: { selected: number }) => {
        setPageNumber(data.selected);
     };

     function deleteClick (key:string){
      localStorage.removeItem(key);
      window.location.reload()
     }



     

    
    
     const renderData = () => {
      const keys = Object.keys(sortedData).length > 0 ? Object.keys(sortedData) : Object.keys(storedData);
        const start = pageNumber * itemsPerPage;
        const end = start + itemsPerPage;
        const slicedData = keys.slice(start, end);
  
        return slicedData.map((key) => (
            <tr key={key}>
            <td><text>{storedData[key].month}</text></td>
            <td>{storedData[key].name}</td>
            <td>{storedData[key].rollno}</td>
            <td>{storedData[key].attendence}</td>
            <td>
            <td id='Mark'>{storedData[key].malayalam}</td>
            <td id='Mark'>{storedData[key].maths}</td>
            <td id='Mark'>{storedData[key].english}</td>
            <td id='Mark'>{Number(storedData[key].malayalam)+Number(storedData[key].maths)+Number(storedData[key].english)}</td>
            </td>
            <td><button onClick={() => props.onEditClick(storedData[key])}>Edit</button></td>
            <td><button onClick={() => deleteClick(storedData[key].name)}>Delete</button></td>
          </tr>
        ));
     };
     
    //  const [editingIndex, setEditingIndex] = useState(String);
    //  const [editedData, setEditedData] = useState<markDetailsModel | null>(null);
      
    //  const handleEditClick = (key: string) => {
    //    setEditingIndex(key);
    //  setEditedData(storedData[key]);
    //  props.onEditClick(storedData[key]);
    //   };
      
    
    const [sortedColumn, setSortedColumn] = useState<string>('');
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
    const [sortedData, setSortedData] = useState<{ [key: string]: markDetailsModel }>({});

      const sortData = (column: string, direction: 'asc' | 'desc') => {
      const sorted = Object.keys(storedData).sort((a, b) => {
        if (column === 'month') {
          
          
          const indexA = months.indexOf(storedData[a][column]);
          const indexB = months.indexOf(storedData[b][column]);
    
          return direction === 'asc' ? indexA - indexB : indexB - indexA;
        } else {
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

const handleClick = (column: string) => {
  const newDirection = column === sortedColumn && sortDirection === 'asc' ? 'desc' : 'asc';
  setSortDirection(newDirection);
  setSortedColumn(column);
  sortData(column, newDirection);
};




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
    (prev.malayalam + prev.maths + prev.english) / 3 >
    (current.malayalam + current.maths + current.english) / 3
      ? prev
      : current
  );

  setBestStudent(best);
};

    return(                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
        <>
        <h2>Details</h2>

        
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
         <h2>Select the brightest student</h2>
         <div>
        <label>Select start month:</label>
        <select value={startMonth} onChange={(e) => setStartMonth(e.target.value)}>
        <option value="" disabled selected hidden>
    select start month
  </option>
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
        <option value="" disabled selected hidden>
    select end month
  </option>
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
          <p>Average Marks: {Number(bestStudent.malayalam) +
           Number(bestStudent.maths) + Number(bestStudent.english)/3 }</p>
        </div>
      )}
      </div>
        </>
    )

}

export default Display 
