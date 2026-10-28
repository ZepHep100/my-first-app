import { useState, useEffect } from "react";
import "./Home.css";
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
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
  localStorage.setItem("products", JSON.stringify(products));
}, [products]);

useEffect(() => {
  localStorage.setItem("cart", JSON.stringify(cart));
}, [cart]);


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

  //Покупка продукта
  const buyProducts = (productID) => {
    const targetProduct = products.find(product => product.id === productID);
    if(targetProduct){
      setCart([...cart, targetProduct]);
    }
  }
   
  //Корзина
  function removeFromcart(index){
    setCart(cart.filter((_, i) => i !== index));
  }

  const cartTotal = cart.reduce((acc, item) => acc + item.price, 0);

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
      
        {filteredProducts.map(product  => (
          <div className="product-card" key={product.id}>
            {editingId === product.id ? (
              <div className="edit-mode">
                <input value={editName} onChange={(e) => setEditName(e.target.value)}/>
                <input value={editPrice} onChange={(e) => setEditPrice(e.target.value)} />
                <button className="btn btn-save" onClick={() => saveEdit(product.id)}>Сохранить</button>
                <button className="btn btn-cancel" onClick={cancelEdit}>Отмена</button>
              </div>
              ) : (
                <div className="product-view">
                  <h3 className="product-name">{product.name}</h3>
                  <p className="product-price">{product.price} ₽</p>
                  
                  <div className="product-actions">
                    <button className="btn btn-buy" onClick={() => buyProducts(product.id)}>Купить</button>

                  {isAdmin && (
                    <>
                  <button className="btn btn-delete" onClick={() => deleteProduct(product.id)}>Удалить</button>
                  <button className="btn btn-buy" onClick={() => startEdit(product)}>Редактировать</button>
                    </>
                )}
                </div> 
                </div>
            )}
            </div>          
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
               <span className="cart-item-name">{item.name}</span>
                <span className="cart-item-price">{item.price} ₽</span>
                <button className="btn btn-delete" onClick={() => removeFromcart(index)}>
                  Удалить
                  </button>
                  
                  </div>
            ))}
            <div className="cart-total">
              Итого: <strong>{cartTotal} ₽</strong>
            </div>
            </div>
      )}
      </div>
      </div>
  );
}
export default Home;