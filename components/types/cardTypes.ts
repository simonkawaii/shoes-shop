export interface TproductCard {
  title: string;
  id: number;
  thumbnail: string;
  category: string;
  price: number;
  brand: string;
  description?: string;
  stock?: string;
  images?: string[];
}

export type cardPreview = {
  title: string;
  thumbnail: string;
  category: string;
  price: number;
  brand: string;
};

type positionTypes = {
  top?: number;
  left?: number;
};

export type TproductComponentCard = TproductCard & positionTypes;
