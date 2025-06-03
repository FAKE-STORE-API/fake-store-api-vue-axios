export type CartItem = {
  id: number;
  quantity: number;
  price: number;
  title: string;
  image: string;
};

export type Cart = {
  items: CartItem[];
  totalPrice: number;
};
