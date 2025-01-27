export interface Student {
    id: number;
    username: string;
    password: string;
    name: string;
    age: number;
    class:number;
    marks: {
      math: number;
      science: number;
      english: number;
    };
    totalMarks: number;
  }