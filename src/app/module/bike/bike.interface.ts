type TCategory = 'Mountain' | 'Road' | 'Hybrid' | 'Electric';
export type TBike = {
  name: string;
  brand: string;
  price: number;
  category: TCategory;
  description: string;
  quantity: number;
  inStock: boolean;
};
