function ProductCard({ product, isAdmin, onBuy, onDelete, onEdit }) {
  return (
    <div className="product-card">
      <div className="product-view">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-price">{product.price} ₽</p>
        
        <div className="product-actions">
          <button className="btn btn-buy" onClick={() => onBuy(product)}>Купить</button>

          {isAdmin && (
            <>
              <button className="btn btn-delete" onClick={() => onDelete(product.id)}>Удалить</button>
              <button className="btn btn-buy" onClick={() => onEdit(product)}>Редактировать</button>
            </>
          )}
        </div> 
      </div>
    </div>
  );
}
export default ProductCard;