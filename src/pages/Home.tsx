import { useState, useEffect, FormEvent } from "react";
import "./Home.css";
import ProductCard from "../components/ProductCard";
import { useCart } from "../context/CartContext";
import { Product } from "../types";
import AddProductForm from "../components/AddProductForm";

function Home() {
  const isAdmin = localStorage.getItem("isAdmin") === "true";
  
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem("products");
    return saved ? JSON.parse(saved) : [
      { id: 1, name: "Штаны", price: 2500, category: "одежда" },
      { id: 2, name: "Кофта", price: 1500, category: "одежда" },
      { id: 3, name: "Обувь", price: 5500, category: "обувь" }
    ];
  });
  

  
  const [search, setSearch] = useState<string>("");
  const [editingId, setEditingId] = useState<number | null>(null); // Может быть число или null
  const [editName, setEditName] = useState<string>("");
  const [editPrice, setEditPrice] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("все");
  
  const { cart, addToCart, removeFromCart, clearCart } = useCart();

  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

  const total = products.reduce((acc, n) => acc + n.price, 0);

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === "все" || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  //Удаление продукта 
  function deleteProduct(id: number) {
    setProducts(products.filter(t => t.id !== id));
  }

  //Редактирование продукта 
  function startEdit(product: Product) {
    setEditingId(product.id);
    setEditName(product.name);
    setEditPrice(product.price.toString()); // Переводим число в строку для инпута
  }

  function saveEdit(id: number) {
    setProducts(products.map(p => 
      p.id === id
        ? { ...p, name: editName, price: parseFloat(editPrice) }
        : p
    ));
    setEditingId(null);
  }

  function cancelEdit() {
    setEditingId(null);
  }

  const cartTotal = cart.reduce((acc, item) => acc + (item.price * (item.quantity || 1)), 0);
  
    
   
  const checkout = () => {
    if (cart.length === 0) return;
    alert(`Заказ на сумму ${cartTotal} ₽ успешно оформлен!`);
    clearCart();
  }

  return ( 
    <div>
      <h1 className="title">Магазин одежды</h1>

      <div className="shop-stats">
        <div className="stat">
          <span className="stat-label">Товаров</span>
          <span className="stat-value">{products.length}</span>
        </div>
        <div className="stat">
          <span className="stat-label">Общая стоимость</span>
          <span className="stat-value">{total}</span>
        </div>
        <div className="stat">
          <span className="stat-label">В корзине</span>
          <span className="stat-value">{cart.length}</span>
        </div>
        <div className="stat">
          <span className="stat-label">Сумма корзины</span>
          <span className="stat-value">{cartTotal} руб.</span>
        </div>
      </div>

    {isAdmin && (
  <AddProductForm 
    onAdd={(data) => {
      const newProduct: Product = {
        id: Date.now(),
        name: data.name,
        price: data.price,
        category: data.category,
      };
      setProducts([...products, newProduct]);
    }} 
  />
  )}

      <div className="shop-controls">
        <input 
          placeholder="Поиск товара..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="filter-buttons">
          <button onClick={() => setSelectedCategory("все")}>Все</button>
          <button onClick={() => setSelectedCategory("одежда")}>Одежда</button>
          <button onClick={() => setSelectedCategory("обувь")}>Обувь</button>
        </div>
      </div>

      <div className="shop-list">
        {filteredProducts.map(product => (
          product.id === editingId ? (
            <div className="product-card" key={product.id}>
              <div className="edit-mode">
                <input value={editName} onChange={(e) => setEditName(e.target.value)}/>
                <input value={editPrice} onChange={(e) => setEditPrice(e.target.value)} />
                <button className="btn btn-save" onClick={() => saveEdit(product.id)}>Сохранить</button>
                <button className="btn btn-cancel" onClick={cancelEdit}>Отмена</button>
              </div>
            </div>
          ) : (
            <ProductCard 
              key={product.id} 
              product={product} 
              isAdmin={isAdmin}
              onBuy={addToCart}
              onDelete={deleteProduct}
              onEdit={startEdit}
            />
          )
        ))}
      </div>

      <div className="cart-section">
        <h2 className="cart-title">🛒 Корзина</h2>
        {cart.length === 0 ? (
          <p className="cart-empty">Ваша корзина пока пуста</p>
        ) : (
          <div className="cart-list">
            {cart.map((item, index) => (
              <div className="cart-item" key={index}>
                <span className="cart-item-name">
                  {item.name} <strong>x {item.quantity || 1}</strong>
                </span>
                <span className="cart-item-price">{item.price * (item.quantity || 1)} ₽</span>
                <button className="btn btn-delete" onClick={() => removeFromCart(index)}>
                  Удалить
                </button>
              </div>
            ))}
            <div className="cart-total">
              Итого: <strong>{cartTotal} ₽</strong>
            </div>
            <button className="btn-checkout" onClick={checkout}>Оформить заказ</button>
          </div>
        )}
      </div>
    </div>
  );
}
export default Home;