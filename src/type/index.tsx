export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: {
    id: number;
    name: string;
  };
  images: string[];
  slug: number;
  quantity: number;
}

export interface SearchBarProps {
  onSearch: (query: string) => void;
}

export interface ProductCardProps {
  product: Product;
}

export interface ProductListProps {
  products: Product[];
}

export interface ImageCarouselProps {
  images: string[];
}
