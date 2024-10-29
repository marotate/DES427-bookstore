// types.ts
export type RootStackParamList = {
    Home: undefined;
    BookDetails: { book: Book };
  };
  
  export interface Book {
    id: string;
    title: string;
    author: string;
    category: string;
    publisher: string;
    ISBN: string;
    stock: number;
    price: string;
    description: string;
    picture: string;
  }
  