import './App.css'
import { ChangeEvent, useRef, useState } from 'react';
import Display from './Display';

export  interface markDetailsModel {
  month: string;
  name: string;
  rollno: number;
  workingDays: number;
  attendence: number;
  attPercentage: number;
  malayalam: number;
  maths: number;
  english: number;
  total:number;
  [key: string]: string | number;
}



function App() {
   
   
  
     const [MarkDetails, setDetails] = useState<markDetailsModel>({
      month:"",
      name:"",
      rollno:0,
      workingDays: 0,
      attendence:0,
      attPercentage: 0,
      malayalam:0,
      maths:0,
      english:0,
      total:0
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
          
          const Percentage=Number(((MarkDetails.attendence)/(MarkDetails.workingDays))*100);
          MarkDetails.attPercentage=Number(Percentage.toFixed(2));
          MarkDetails.total=((Number(MarkDetails.malayalam))+(Number(MarkDetails.maths))+(Number(MarkDetails.english)))
          
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
      
      const defaultMonth = isEditing ? editingStudent?.month :  MarkDetails.month ;
      
  return (

    <div>
      <h2>Enter Details</h2>
      <div className="container"> 
        <form id="Form" onSubmit={handleSubmit} ref={formRef} >
          <div id="label">
            <label >Month</label>
          </div>
          <div className='formBox'> 
            <select name="month"  value={defaultMonth}  onChange={handleChange} required>
              <option value={defaultMonth}  disabled selected >
                {defaultMonth}
              </option>
              {months.map((month, index) => (
                <option key={index} value={month}>
                  {month}
                </option>
              ))}
            </select>
          </div>

          <div id="label">
            <label htmlFor="">Name</label>
          </div>
          <div className='formBox'>
            <input type="text" name="name" placeholder="Full Name" onChange={handleChange} value={MarkDetails.name} required/>
          </div>

          <div id="label">
            <label htmlFor="">Roll Number</label>
          </div>
          <div className='formBox'>
            <input type="number" name="rollno"  placeholder="Roll No." onChange={handleChange} value={MarkDetails.rollno} required/>
          </div>

          <div id="label">
            <label htmlFor="">Number of working days</label>
          </div>
          <div className='formBox'> 
            <input type="number" name="workingDays" min='1' max='100'  onChange={handleChange} value={MarkDetails.workingDays} required/>
          </div>

          <div id="label">
            <label htmlFor="">Attendence</label>
          </div>
          <div className='formBox'>
            <input type="number" name="attendence" min='1' max='100'  placeholder="%" onChange={handleChange} value={MarkDetails.attendence} required/>
          </div>

          <h3>Enter Marks</h3>
          <div id='label'>
            <label htmlFor="">Malayalam</label>
          </div>
          <div className='formBox '>
            <input type="number" name="malayalam" placeholder="0" onChange={handleChange} value={MarkDetails.malayalam} required/>
          </div>

          <div id='label'>
            <label htmlFor="">Maths</label>
          </div>
          <div className='formBox '>
            <input type="number" name="maths" placeholder="0" onChange={handleChange} value={MarkDetails.maths} required/>
          </div>

          <div id='label'>
            <label htmlFor="">English</label>
          </div>
          <div className='formBox '>
            <input id="mark" type="number" name="english" placeholder="0" onChange={handleChange} value={MarkDetails.english} required/>
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
