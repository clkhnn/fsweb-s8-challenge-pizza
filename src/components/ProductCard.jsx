function ProductCard({ image, name, rating, reviewCount, price }) {
  return (
    <article className="product-card">
      <a href="#menu" className="product-image">
        <img src={image} alt={name} />
      </a>

      <h3>{name}</h3>

      <div className="product-meta">
        <span>{rating}</span>
        <span>{reviewCount}</span>
        <strong>{price}</strong>
      </div>
    </article>
  );
}

export default ProductCard;