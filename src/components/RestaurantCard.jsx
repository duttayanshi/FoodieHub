function RestaurantCard({ restaurant, onOrder }) {
  const foodImages = {
    "The Food House":
      "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=800&q=80",
    "Pizza Paradise":
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80",
    "Burger Station":
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80",
    "Sweet Cravings":
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80",
  };

  return (
    <article className="restaurant-card">
      <div className="restaurant-image">
        <img
          src={foodImages[restaurant.name]}
          alt={restaurant.name}
          loading="lazy"
        />

        <span className="offer">20% OFF</span>

        
      </div>

      <div className="restaurant-info">
        <div className="restaurant-title">
          <h3>{restaurant.name}</h3>

          <span className="rating">
            <span>★</span> {restaurant.rating}
          </span>
        </div>

        <p className="restaurant-cuisine">
          {restaurant.cuisine}
        </p>

        <div className="restaurant-meta">
          <span className="delivery-time">
            <span>◷</span> {restaurant.time}
          </span>

          <span className="restaurant-price">
            {restaurant.price}
          </span>
        </div>

        <div className="card-divider"></div>

        <div className="restaurant-card-bottom">
          <span className="fresh-label">
            ✦ Delicious & fresh
          </span>

          <button
            className="order-btn"
            onClick={() => onOrder(restaurant)}
          >
            Order Now <span>→</span>
          </button>
        </div>
      </div>
    </article>
  );
}

export default RestaurantCard;