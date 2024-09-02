import './display.css';
import { useState, useEffect } from 'react';
import { MarkDetailsModel, months } from './types';
import ReactPaginate from 'react-paginate';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';

interface DisplayProps {
  onEditClick: (data: MarkDetailsModel) => void;
  isLoggedIn: boolean;
  username: string;
  handleLogin: (username: string) => void;
  handleLogout: () => void;
}

function Display(props: DisplayProps) {
  const [storedData, setStoredData] = useState<{ [key: string]: MarkDetailsModel }>({});
  const [searchWord, setSearchWord] = useState('');
  const [pageNumber, setPageNumber] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [sortedColumn, setSortedColumn] = useState<string>('');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [sortedData, setSortedData] = useState<{ [key: string]: MarkDetailsModel }>({});
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [deleteKey, setDeleteKey] = useState<string>('');
  const [startMonth, setStartMonth] = useState<string>('');
  const [endMonth, setEndMonth] = useState<string>('');
  const [bestStudent, setBestStudent] = useState<MarkDetailsModel | null>(null);
  const [point, setPoint] = useState<number>(0);

  useEffect(() => {
    const localStorageData: { [key: string]: MarkDetailsModel } = {};
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

  const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchWord(e.target.value);
  };

  const renderData = () => {
    const keys = Object.keys(sortedData).length > 0 ? Object.keys(sortedData) : Object.keys(storedData);
    const start = Number(pageNumber) * Number(itemsPerPage);
    const end = Number(start) + Number(itemsPerPage);
    const slicedData = keys.slice(start, end);

    return slicedData.map((key) => (
      <tr key={key}>
        <td>{storedData[key].month}</td>
        <td>{storedData[key].name}</td>
        <td>{storedData[key].rollno}</td>
        <td>{storedData[key].attPercentage}%</td>
        <td>
          <td className='mark'>{storedData[key].malayalam}</td>
          <td className='mark'>{storedData[key].maths}</td>
          <td className='mark'>{storedData[key].english}</td>
          <td className='mark'>{storedData[key].total}</td>
        </td>
        {props.isLoggedIn && (
          <>
            <td><Button variant='primary' onClick={() => props.onEditClick(storedData[key])}>Edit</Button></td>
            <td><Button variant="danger" onClick={() => deleteClick(storedData[key].name)}>Delete</Button></td>
          </>
        )}
      </tr>
    ));
  };

  const handlePageClick = (data: { selected: number }) => {
    setPageNumber(data.selected);
  };

  const handleChangeItemsPerPage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setItemsPerPage(Number(e.target.value));
    setPageNumber(0);
  };

  const handleClick = (column: string) => {
    const newDirection = column === sortedColumn && sortDirection === 'asc' ? 'desc' : 'asc';
    setSortDirection(newDirection);
    setSortedColumn(column);
    sortData(column, newDirection);
  };

  const sortData = (column: string, direction: 'asc' | 'desc') => {
    const sorted = Object.keys(storedData).sort((a, b) => {
      if (column === 'month') {
        const indexA = months.indexOf(storedData[a][column]);
        const indexB = months.indexOf(storedData[b][column]);
        return direction === 'asc' ? indexA - indexB : indexB - indexA;
      } else {
        const valueA = storedData[a][column];
        const valueB = storedData[b][column];
        return direction === 'asc' ? valueA - valueB : valueB - valueA;
      }
    });

    const sortedObject: { [key: string]: MarkDetailsModel } = {};
    sorted.forEach((key) => {
      sortedObject[key] = storedData[key];
    });

    setSortedData(sortedObject);
  };

  const deleteClick = (key: string) => {
    setShowDeleteAlert(true);
    setDeleteKey(key);
  };

  const handleConfirmDelete = () => {
    localStorage.removeItem(deleteKey);
    window.location.reload(); // Refresh page or update state to reflect deletion
  };

  const handleCancelDelete = () => {
    setShowDeleteAlert(false);
  };

  const handleSearch = () => {
    if (!startMonth || !endMonth) {
      alert('Please select both start and end months.');
      return;
    }

    const studentsWithinRange = Object.values(storedData).filter(
      (student) => student.month >= startMonth && student.month <= endMonth
    );

    if (studentsWithinRange.length === 0) {
      alert('No students found within the selected range.');
      return;
    }

    const best = studentsWithinRange.reduce((prev, current) =>
      ((prev.total) / 3) * 0.15 + (prev.attPercentage * 0.05) >
      ((current.total) / 3) * 0.15 + (current.attPercentage * 0.05)
        ? prev
        : current
    );

    setBestStudent(best);
    setPoint(((Number(best.malayalam) + Number(best.maths) + Number(best.english)) / 3) * 0.15 + (best.attPercentage * 0.05));
  };

  return (
    <>
      <br />
      <InputGroup className="mb-3">
        <Form.Control
          placeholder="Search for a student"
          aria-label="Search for a student"
          aria-describedby="basic-addon2"
          value={searchWord}
          onChange={handleChangeSearch}
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
                <th className='mark'>Malayalam</th>
                <th className='mark'>Maths</th>
                <th className='mark'>English</th>
                <th className='mark'>Total </th>
              </tr>
            </th>
            {props.isLoggedIn && (
              <>
                <th rowSpan={2}> Edit </th>
                <th rowSpan={2}> Delete </th>
              </>
            )}
          </tr>
        </thead>
        <tbody>
          {renderData()}
        </tbody>
      </table>

      <Alert show={showDeleteAlert} variant="warning">
        <Alert.Heading>Warning!!</Alert.Heading>
        <p>Are you sure you want to delete?</p>
        <Button variant='danger' onClick={handleConfirmDelete}>Yes</Button>
        <Button variant="warning" onClick={handleCancelDelete}>Cancel</Button>
        <hr />
      </Alert>

      <br />
      <h3 id="center">Select number of rows</h3>
      <div id="center">
        <input type="text" value={itemsPerPage} onChange={handleChangeItemsPerPage} />
      </div>
      <div id="center">
        <ReactPaginate
          previousLabel={"prev"}
          nextLabel={"next"}
          breakLabel={"..."}
          breakClassName={"break-me"}
          pageCount={Math.ceil(Object.keys(storedData).length / itemsPerPage)}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          activeClassName={"active"}
        />
      </div>
    </>
  );
}

export default Display;
