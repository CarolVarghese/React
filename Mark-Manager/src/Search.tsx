import './display.css'
import { useState, useEffect } from 'react';
import {markDetailsModel} from './App'


function SearchDisplay(){

    
    const [storedData, setStoredData] = useState<{[key:string]:markDetailsModel}>({ });
    const [searchWord, setSearchWord] = useState('');

   useEffect(() => {
    const localStorageData: { [key: string]: markDetailsModel } = {};

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key) {
        const data = JSON.parse(localStorage.getItem(key) || '');
        if (data.name.toLowerCase().includes(searchWord.toLowerCase())) {
          localStorageData[key] = data;
        }
      }
    }

    setStoredData(localStorageData);
  }, [searchWord]);
     
    
  const renderData = () => {
    return Object.keys(storedData).map((key) => (
      <tr key={key}>
        <td>{storedData[key].month}</td>
        <td>{storedData[key].name}</td>
        <td>{storedData[key].rollno}</td>
        <td>{storedData[key].attendence}</td>
        <td>
        <td id='Mark'>{storedData[key].malayalam}</td>
        <td id='Mark'>{storedData[key].maths}</td>
        <td id='Mark'>{storedData[key].english}</td>
        </td>
      </tr>
    ));
  };


   
const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setSearchWord(e.target.value);
};

    return(                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
        <>
        <h2>Search for a student</h2>

        <input type="text" value={searchWord} onChange={handleChange} />
        <table>
            <thead>
                <tr>
                    <th rowSpan={2}>Month</th>
                    <th rowSpan={2} >Name</th>
                    <th rowSpan={2} >Roll No.</th>
                    <th rowSpan={2} >Attendance</th>
                    <th rowSpan={2} >
                      
                        <tr>
                            <th colSpan={3}>Marks</th>
                        </tr>
                        <tr>
                            <th id='Mark'>Malayalam</th>
                            <th id='Mark'>Maths</th>
                            <th id='Mark'>English</th>
                        </tr>
                    </th>
                </tr>
            </thead>
            <tbody>
              {renderData()}
             
            </tbody>
        </table>
        
        </>
    )


    }
export default SearchDisplay