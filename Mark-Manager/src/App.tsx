// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import { ChangeEvent, useRef, useState } from 'react';
import Display from './Display';

export  interface markDetailsModel {
  month: string;
  name: string;
  rollno: number;
  attendence: number;
  malayalam: number;
  maths: number;
  english: number;
  [key: string]: string | number;
}



function App() {
   
   
  
     const [MarkDetails, setDetails] = useState<markDetailsModel>({
      month:"",
      name:"",
      rollno:0,
      attendence:0,
      malayalam:0,
      maths:0,
      english:0,
     });

     
      const [isEditing, setIsEditing] = useState(false);
      const [editingStudent, setEditingStudent] = useState<markDetailsModel | null>(null);


     const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {name,value} = e.target;
        setDetails((prev) => ({
           ...prev, [name]: value,
        }));
     
      };

      const formRef = useRef<HTMLFormElement >(null);
      const  handleSubmit = (e: React.FormEvent) => {
          e.preventDefault();
          if (isEditing && editingStudent) {

            localStorage.setItem(editingStudent.name, JSON.stringify(MarkDetails));
          } else {
            localStorage.setItem(MarkDetails.name, JSON.stringify(MarkDetails));
          }
        
          
          formRef.current?.reset();
          setIsEditing(false);
          setEditingStudent(null);
          window.location.reload()
      };
  

      const handleEditClick = (data: markDetailsModel) => {
        setIsEditing(true);
        setEditingStudent(data);
        setDetails(data);
      };

      const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
      ];
      
      
  return (

    <div>
        <h2>Enter Details</h2>
      <div className="container"> 
        <form id="Form" onSubmit={handleSubmit} ref={formRef}>
        <div className='formBox'>
            <label >Month</label>
           
            <select name="month" onChange={handleChange}>
  <option value="" disabled selected hidden>
    Select a Month
  </option>
  {months.map((month, index) => (
    <option key={index} value={month}>
      {month}
    </option>
  ))}
</select>
          </div>
          <div className='formBox'>
            <label htmlFor="">Name</label>
            <input type="text" name="name" placeholder="Full Name" onChange={handleChange} value={MarkDetails.name}/>
          </div>
          <div className='formBox'>
            <label htmlFor="">Roll Number</label>
            <input type="number" name="rollno"  placeholder="Roll No." onChange={handleChange} value={MarkDetails.rollno}/>
          </div>
          <div className='formBox'>
            <label htmlFor="">Attendence</label>
            <input type="number" name="attendence" min='1' max='100'  placeholder="%" onChange={handleChange} value={MarkDetails.attendence}/>
          </div>
          <h3>Enter Marks</h3>
          <div className='formBox'>
            <label htmlFor="">Malayalam</label>
            <input type="number" name="malayalam" placeholder="0" onChange={handleChange} value={MarkDetails.malayalam}/>
          </div>
          <div className='formBox'>
            <label htmlFor="">Maths</label>
            <input type="number" name="maths" placeholder="0" onChange={handleChange} value={MarkDetails.maths}/>
          </div>
          <div className='formBox'>
            <label htmlFor="">English</label>
            <input type="number" name="english" placeholder="0" onChange={handleChange} value={MarkDetails.english}/>
          </div>
          
          <div>
          <button type='submit'>Submit</button>
          </div>
        </form>     
      </div>
      <Display onEditClick={handleEditClick} />   
    </div>
        
  );

}

export default App
