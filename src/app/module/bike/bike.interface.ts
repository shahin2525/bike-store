type TCategory = "Mountain" | "Road" | "Hybrid" | "Electric";
type TBike = {
  name: string;
  brand: string;
  price: number;
  category: TCategory;
  description: string;
  quantity: number;
  inStock: boolean;
};
