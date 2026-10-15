function Hero({ searchTerm, setSearchTerm }) {
  return (
    <section className="hero" id="home">
      <div className="hero-content">
        <p className="hero-tag">
          <span className="hero-tag-dot"></span>
          YOUR FAVOURITE FOOD, DELIVERED
        </p>

        <h1>
          Good food.
          <br />
          <span>Good mood.</span>
        </h1>

        <p className="hero-text">
          Discover delicious meals from the best restaurants
          around you. Fresh flavours, happy moments, delivered
          straight to your door.
        </p>

        <div className="search-box">
          <span className="search-icon">⌕</span>

          <input
            type="text"
            placeholder="Search restaurants or dishes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <button
            onClick={() =>
              document
                .getElementById("restaurants")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            Search →
          </button>
        </div>

        <div className="hero-highlights">
          <div>
            <strong>⚡ Fast</strong>
            <span>Quick delivery</span>
          </div>
          <div>
            <strong>🍽️ Fresh</strong>
            <span>Made with love</span>
          </div>
          <div>
            <strong>❤️ Tasty</strong>
            <span>Every single bite</span>
          </div>
        </div>
      </div>

      <div className="hero-food">
        <div className="hero-image-wrap">
          <img
            className="hero-main-image"
            src="https://images.unsplash.com/photo-1571091718767-18b5b1457add?auto=format&fit=crop&w=1000&q=85"
            alt="Delicious gourmet burger with fresh ingredients"
          />

          <div className="hero-image-shade"></div>

          <div className="hero-offer">
            <span>✨ SPECIAL OFFER</span>
            <strong>20% OFF</strong>
            <small>On your next order</small>
          </div>
        </div>

        <div className="floating-food food-one">🍕</div>
        <div className="floating-food food-two">🍟</div>
        <div className="floating-food food-three">🥤</div>

        <div className="hero-delivery-card">
          <span className="delivery-icon">🛵</span>
          <div>
            <strong>Fast delivery</strong>
            <small>Good food is on its way!</small>
          </div>
          <span className="delivery-check">✓</span>
        </div>
      </div>
    </section>
  );
}

export default Hero;