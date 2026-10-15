import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Categories from "./components/Categories";
import RestaurantCard from "./components/RestaurantCard";
import Footer from "./components/Footer";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [cart, setCart] = useState([]);
  const [showLogin, setShowLogin] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [fullName, setFullName] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [authMessage, setAuthMessage] = useState("");
const [authLoading, setAuthLoading] = useState(false);
const [currentUser, setCurrentUser] = useState(null);
  useEffect(() => {
  fetch("http://localhost:5000/api/restaurants")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to load restaurants");
      }
      return response.json();
    })
    .then((data) => {
      setRestaurants(
        data.map((restaurant) => ({
          ...restaurant,
          cuisine: restaurant.cuisine.replace(/, /g, " • "),
          rating: String(restaurant.rating),
          time: restaurant.deliveryTime,
          price: `₹${restaurant.price} for two`,
          emoji: restaurant.image || "🍽️",
         menu: restaurant.menu || [], 
        }))
      );
      setLoading(false);
    })
    .catch((err) => {
      setError("Restaurants load nahi ho paaye. Backend check karo.");
      setLoading(false);
      console.error(err);
    });
}, []);
  

  const filteredRestaurants = restaurants.filter((restaurant) => {
    const search = searchTerm.toLowerCase();

    const matchesSearch =
      restaurant.name.toLowerCase().includes(search) ||
      restaurant.cuisine.toLowerCase().includes(search);

    const matchesCategory =
      selectedCategory === "" ||
      restaurant.cuisine
        .toLowerCase()
        .includes(selectedCategory.toLowerCase());

    return matchesSearch && matchesCategory;
  });

  const fetchMyOrders = async () => {
  if (!currentUser) {
    alert("Please login first!");
    setShowLogin(true);
    return;
  }

  try {
    const response = await fetch(
      `http://localhost:5000/api/orders/user/${currentUser.id}`
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch orders");
    }

    setMyOrders(data);
    setShowOrders(true);
  } catch (error) {
    alert(error.message || "Could not load orders.");
  }
};

  return (
    <div className="app">
      {selectedRestaurant && (
        <div className="restaurant-details">
          <h2>{selectedRestaurant.name}</h2>
          <p>{selectedRestaurant.cuisine}</p>
          <p>⭐ {selectedRestaurant.rating}</p>
          <p>🕐 {selectedRestaurant.time}</p>
          <p>{selectedRestaurant.price}</p>
          {selectedRestaurant.menu && (
            <div className="menu-section">
              <h3>Menu</h3>

              {selectedRestaurant.menu.map((item) => (

                <div className="menu-item" key={item.name}>
                  <div>
                    <span>
                      {item.emoji} {item.name}
                    </span>
                    <p>₹{item.price}</p>
                  </div>

                  <button
                    className="add-cart-btn"
                    
onClick={() => {
  const existingItem = cart.find(
    (cartItem) => cartItem.name === item.name
  );

  if (existingItem) {
    setCart(
      cart.map((cartItem) =>
        cartItem.name === item.name
          ? { ...cartItem, quantity: (cartItem.quantity || 1) + 1 }
          : cartItem
      )
    );
  } else {
    setCart([...cart, { ...item, quantity: 1 }]);
  }
}}

                  >
                    Add +
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      <Navbar
  onLoginClick={() => setShowLogin(true)}
/>
{showLogin && (
  <div className="login-overlay">
    <div className="login-popup">
      <button
        className="close-login"
        onClick={() => setShowLogin(false)}
      >
        
      </button>

      <h2>{isSignup ? "Create Account" : "Welcome Back!"}</h2>
      <p>
  {isSignup
    ? "Sign up to FoodieHub"
    : "Login to FoodieHub"}
</p>

      
<form
  onSubmit={async (e) => {
    e.preventDefault();
    setAuthMessage("");
    setAuthLoading(true);

    try {
      const response = await fetch(
        `http://localhost:5000/api/auth/${isSignup ? "signup" : "login"}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...(isSignup ? { name: fullName } : {}),
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      setAuthMessage(data.message || "Success!");

    
if (isSignup) {
  setIsSignup(false);
  setFullName("");
  setPassword("");
} else {
  setCurrentUser(data.user);
  setShowLogin(false);
  setPassword("");
}

    } catch (error) {
      setAuthMessage(
        error.message === "Failed to fetch"
          ? "Backend check karo. Server running hai?"
          : error.message
      );
    } finally {
      setAuthLoading(false);
    }
  }}
>
  {isSignup && (
    <input
      type="text"
      placeholder="Enter your full name"
      value={fullName}
      onChange={(e) => setFullName(e.target.value)}
      required
    />
  )}

  <input
    type="email"
    placeholder="Enter your email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    required
  />

  <input
    type="password"
    placeholder="Enter your password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    minLength={8}
    required
  />

  <button
    type="submit"
    className="login-submit"
    disabled={authLoading}
  >
    {authLoading
      ? "Please wait..."
      : isSignup
      ? "Create Account"
      : "Login"}
  </button>

  {authMessage && <p>{authMessage}</p>}
</form>

          



      
    </div>
  </div>
)}

<p className="signup-text">
  {isSignup
    ? "Already have an account? "
    : "Don't have an account? "}

  <button
    type="button"
    onClick={() => setIsSignup(!isSignup)}
  >
    {isSignup ? "Login" : "Sign Up"}
  </button>
</p>

<div className="cart-summary" id="cart">
  <h3>🛒 Your Cart ({cart.reduce((sum, item) => sum + (item.quantity || 1), 0)})</h3>

  {cart.length === 0 ? (
    <p>Your cart is empty.</p>
  ) : (
    cart.map((item, index) => (
      <div className="cart-item" key={`${item.name}-${index}`}>
        <div>
          <span>
            {item.emoji} {item.name}
          </span>
          <p>₹{item.price} each</p>

          <div className="quantity-controls">
            <button
              onClick={() => {
                if ((item.quantity || 1) > 1) {
                  setCart(
                    cart.map((cartItem, i) =>
                      i === index
                        ? { ...cartItem, quantity: (cartItem.quantity || 1) - 1 }
                        : cartItem
                    )
                  );
                } else {
                  setCart(cart.filter((_, i) => i !== index));
                }
              }}
            >
              −
            </button>

            <span>{item.quantity || 1}</span>

            <button
              onClick={() =>
                setCart(
                  cart.map((cartItem, i) =>
                    i === index
                      ? { ...cartItem, quantity: (cartItem.quantity || 1) + 1 }
                      : cartItem
                  )
                )
              }
            >
              +
            </button>
          </div>
        </div>

        <button
          className="remove-cart-btn"
          onClick={() => setCart(cart.filter((_, i) => i !== index))}
        >
          Remove
        </button>
      </div>
    ))
  )}

  {cart.length > 0 && (
    <>
      <h4>
        Total: ₹
        {cart.reduce(
          (sum, item) => sum + item.price * (item.quantity || 1),
          0
        )}
      </h4>

<button
  className="checkout-btn"
  onClick={async () => {
    if (!currentUser) {
      alert("Please login before placing an order.");
      setShowLogin(true);
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: currentUser.id,
          items: cart.map((item) => ({
            name: item.name,
            price: Number(String(item.price).replace(/[^\d.]/g, "")),
            quantity: item.quantity,
            emoji: item.emoji,
          })),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Order failed");
      }

      alert("Order placed successfully! 🎉");
      setCart([]);
    } catch (error) {
      alert(error.message || "Could not place order. Please try again.");
    }
  }}
>
  Proceed to Checkout
</button>

    
    </>
  )}
</div>


  

      <Hero
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      <Categories
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      <section
        className="section restaurants-section"
        id="restaurants"
      >
        <div className="section-heading">
          <div>
            <p className="small-title">TOP PICKS FOR YOU</p>
            <h2>Popular Restaurants</h2>
          </div>

          <button className="view-btn">View All →</button>
        </div>
          
<div className="restaurant-grid">
  {loading ? (
    <p>Loading restaurants...</p>
  ) : error ? (
    <p>{error}</p>
  ) : filteredRestaurants.length === 0 ? (
    <p>No restaurants found.</p>
  ) : (
    filteredRestaurants.map((restaurant) => (
      <RestaurantCard
        key={restaurant._id || restaurant.name}
        restaurant={restaurant}
        onOrder={setSelectedRestaurant}
      />
    ))
  )}
</div>

      
      </section>

      <Footer />
    </div>
  );
}

export default App;