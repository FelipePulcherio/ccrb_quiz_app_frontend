export interface Option {
    text: string;
    correct: boolean;
  }
  
  export interface Question {
    id: number;
    question: string;
    image: string;
    options: Option[];
  }