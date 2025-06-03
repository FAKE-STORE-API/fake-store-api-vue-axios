import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

import type { CartItem } from '@/models/cart';

export const useCartStore = defineStore('cart', () => {
  const cartItems = ref<CartItem[]>([]);

  const isInCart = (itemId: number) => {
    return cartItems.value.some((item) => item.id === itemId);
  };

  const totalItems = computed(() => cartItems.value.length);

  const totalPrice = computed(() => {
    return cartItems.value
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  });

  const addToCart = (item: CartItem) => {
    if (isInCart(item.id)) {
      return;
    }

    cartItems.value.push(item);
  };

  const removeFromCart = (itemId: number) => {
    const index = cartItems.value.findIndex((item) => item.id === itemId);
    if (index !== -1) {
      cartItems.value.splice(index, 1);
    }
  };

  const addQuantity = (itemId: number) => {
    const item = cartItems.value.find((item) => item.id === itemId);
    if (item) {
      item.quantity++;
    }
  };

  const subtractQuantity = (itemId: number) => {
    const item = cartItems.value.find((item) => item.id === itemId);
    if (item && item.quantity > 1) {
      item.quantity--;
    } else if (item && item.quantity === 1) {
      removeFromCart(itemId);
    }
  };

  return {
    cartItems,
    totalItems,
    totalPrice,
    addToCart,
    isInCart,
    removeFromCart,
    addQuantity,
    subtractQuantity,
  };
});
