import { Product } from "./product";
import { ReviewUser } from "./review-user";

export interface ReviewItem {
  _id: string;
  product: Product;
  user: ReviewUser | string;
  rating: number;
  comment: string;
  verifiedPurchase: boolean;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
}