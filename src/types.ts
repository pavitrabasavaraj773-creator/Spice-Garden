export type CuisineCategory = 'All' | 'Starters' | 'Main Course' | 'Desserts' | 'Breads & Rice' | 'Beverages';

export type FoodType = 'veg' | 'non-veg';

export interface MenuItem {
  id: string;
  name: string;
  category: 'Starters' | 'Main Course' | 'Desserts' | 'Breads & Rice' | 'Beverages';
  type: FoodType;
  price: number;
  originalPrice?: number;
  description: string;
  image: string;
  isSpicy?: boolean;
  isChefSpecial?: boolean;
  isPopular?: boolean;
  preparationTime?: string;
  calories?: string;
  spiceLevel?: 1 | 2 | 3;
}

export interface SpecialOffer {
  id: string;
  name: string;
  description: string;
  originalPrice: number;
  discountedPrice: number;
  image: string;
  type: FoodType;
  discountTag: string;
  tagline: string;
  includes: string[];
}

export interface CartItem {
  item: MenuItem | SpecialOffer;
  quantity: number;
  customization?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Interior' | 'Exterior' | 'Food' | 'Chef' | 'Dining';
  image: string;
  description: string;
}

export interface ReviewItem {
  id: string;
  name: string;
  location: string;
  rating: number;
  comment: string;
  avatar: string;
  dishRecommended: string;
  date: string;
  verified: boolean;
}

export interface ReservationFormData {
  fullName: string;
  phone: string;
  email: string;
  guests: number;
  date: string;
  time: string;
  seatingArea: 'Main Dining' | 'Family Hall' | 'Rooftop Terrace' | 'Candlelight Booth';
  occasion?: string;
  specialRequests?: string;
}

export interface ReservationConfirmation extends ReservationFormData {
  bookingId: string;
  bookingTime: string;
  status: 'Confirmed' | 'Pending';
}

export interface OrderFormData {
  customerName: string;
  phone: string;
  deliveryType: 'delivery' | 'pickup' | 'dine-in';
  deliveryAddress?: string;
  tableNumber?: string;
  notes?: string;
  paymentMethod: 'razorpay_online' | 'cash_on_delivery' | 'upi_qr' | 'card_at_counter';
}

export interface PlacedOrder {
  orderId: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  gst: number;
  deliveryFee: number;
  total: number;
  customerDetails: OrderFormData;
  placedAt: string;
  estimatedTime: string;
  paymentId?: string;
  paymentStatus?: 'Paid' | 'Pending' | 'Cash on Delivery';
}
