export interface Filters {
  brands: string[];
  price: {
    min: number;
    max: number;
  };
}
