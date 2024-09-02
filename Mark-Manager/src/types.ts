// src/types.ts
export interface MarkDetailsModel {
    month: string;
    name: string;
    rollno: number;
    workingDays: number;
    attendence: number;
    attPercentage: number;
    malayalam: number;
    maths: number;
    english: number;
    total: number;
    [key: string]: string | number;
  }
  
  export const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  