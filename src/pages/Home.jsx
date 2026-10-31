import { useState, useEffect } from "react";
import "./Home.css";
import ProductCard from "../components/ProductCard";
import { useCart } from "../context/CartContext";
function Home(){
  const isAdmin = localStorage.getItem("isAdmin") === "true";
   const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem("products");
    return saved ? JSON.parse(saved) : [
    {id: 1, name: "Штаны", price: 2500, category: "одежда"},
    {id: 2, name: "Кофта", price: 1500, category: "одежда"},
    {id: 3, name: "Обувь", price: 5500, category: "обувь"}
  ]
 });
  
  const [inputValue, setInputValue] = useState("");
  const [priceInput, setPriceInput] = useState("");
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editPrice, setEditPrice] = useState("");
  const [categoryInput, setCategoryInput] = useState("одежда");
  const [selectedCategory, setSelectedCategory] = useState("все");
  const { cart, addToCart, removeFromCart, clearCart} = useCart();

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
  function deleteProduct(id){
  setProducts(products.filter(t => t.id !== id));
  }

  //Редактирование продукта 
  function startEdit(product){
    setEditingId(product.id);
    setEditName(product.name);
    setEditPrice(product.price);
  }

  function saveEdit(id){
    setProducts(products.map(p => 
      p.id === id
      ? {...p, name: editName, price: parseFloat(editPrice)}
      :p
    ));
    setEditingId(null);
  }

  function cancelEdit(){
    setEditingId(null);
  }
 

  const cartTotal = cart.reduce((acc, item) => acc + (item.price * (item.quantity || 1)), 0);

  //Добавить продукт
  const handleAddProduct = () => {
    if(inputValue.trim() === ""){
      alert("Введите название продукта!");
      return;
    }

    const parsedPrice = parseFloat(priceInput);

    if(isNaN(parsedPrice) || parsedPrice <= 0){
      alert("Введите корректную цену (число больше 0)!");
      return;
    }
    
    const newProduct = {
    id: Date.now(),
    name: inputValue,
    price: parsedPrice,
    category: categoryInput,
    };
    setProducts([...products, newProduct]);

    setPriceInput("");
    setInputValue("");
    setCategoryInput("одежда");
  }

  const checkout = () =>  {
    if(cart.length === 0) return;
    alert(`Заказ на сумму ${cartTotal} ₽ успешно оформлен!`);
    clearCart();
  }

    return( 
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
      <div className="shop-form">
        <input
        type="text"
        placeholder="Название продукта"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        />
      

        <input
        type="number"
        placeholder="Цена"
        value={priceInput}
        onChange={(e) => setPriceInput(e.target.value)}
        />

        <select 
        value={categoryInput}
        onChange={(e) => setCategoryInput(e.target.value)}
        >

          <option value="одежда">Одежда</option>
          <option value="обувь">Обувь</option>
          <option value="аксессуары">Аксессуары</option>
        </select>

        <button className="addProduct" onClick={handleAddProduct}>Добавить</button>
        </div>
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
    // Если товар редактируется — показываем форму
    <div className="product-card" key={product.id}>
      <div className="edit-mode">
        <input value={editName} onChange={(e) => setEditName(e.target.value)}/>
        <input value={editPrice} onChange={(e) => setEditPrice(e.target.value)} />
        <button className="btn btn-save" onClick={() => saveEdit(product.id)}>Сохранить</button>
        <button className="btn btn-cancel" onClick={cancelEdit}>Отмена</button>
      </div>
    </div>
  ) : (
    // Если не редактируется — показываем компонент ProductCard
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