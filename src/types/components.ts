import { Product } from './product';

export interface ProductActionsProps {
  product: Product;
}

export interface ProductRatingProps {
  rating: number;
  count?: number;
}

export interface FavoriteButtonProps {
  product: Product;
}

export interface AddToCartButtonProps {
  product: Product;
  selectedVariantIndex?: number;
}
