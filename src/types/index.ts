export interface Book {
  id: string;
  volumeInfo: {
    title: string;
    authors?: string[];
    description?: string;
    imageLinks?: {
      thumbnail: string;
    };
    averageRating?: number;
    ratingsCount?: number;
  };
  saleInfo?: {
    retailPrice?: {
      amount: number;
    };
  };
}
