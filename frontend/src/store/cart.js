import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

const useCartStore = create(
  persist(
    (set, get) => ({
      cartItems: [],
      cartTotal: 0,
      
      addToCart: (course) => {
        const { cartItems } = get();
        const existingItem = cartItems.find((item) => item.id === course.id);
        
        if (!existingItem) {
          const newCartItems = [...cartItems, { ...course }];
          // Calculate new total
          const newTotal = newCartItems.reduce((acc, item) => acc + parseFloat(item.price || 0), 0);
          
          set({ 
            cartItems: newCartItems,
            cartTotal: newTotal 
          });
        }
      },
      
      removeFromCart: (courseId) => {
        const { cartItems } = get();
        const newCartItems = cartItems.filter((item) => item.id !== courseId);
        // Calculate new total
        const newTotal = newCartItems.reduce((acc, item) => acc + parseFloat(item.price || 0), 0);
        
        set({ 
          cartItems: newCartItems,
          cartTotal: newTotal 
        });
      },
      
      clearCart: () => {
        set({ cartItems: [], cartTotal: 0 });
      },
    }),
    {
      name: 'cart-storage', // unique name
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useCartStore;
