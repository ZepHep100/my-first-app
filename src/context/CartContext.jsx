import { createContext, useState, useContext, useEffect } from "react";

// 1. Создаем сам Контекст
const CartContext = createContext();

// 2. Создаем Провайдер (он будет оборачивать приложение)
export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect (() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

  // Функции для работы с корзиной
  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      setCart(cart.map(item =>
        item.id === product.id ? { ...item, quantity: (item.quantity || 1) + 1 } : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (index) => {
    setCart(cart.filter((_, i) => i !== index));
  };

  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

// 3. Создаем хук для удобного использования
export function useCart() {
  return useContext(CartContext);
}