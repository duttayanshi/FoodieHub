function Navbar({ onLoginClick }) {
  return (
    <nav className="navbar">
      <div className="logo">
        Foodie<span>Hub</span> 🍔
      </div>

      <div className="nav-links">
        <a href="#home">Home</a>
        <a href="#restaurants">Restaurants</a>
        <a href="#categories">Categories</a>
        <a href="#about">About</a>
      </div>

      <div className="nav-actions">
        <button className="login-btn" onClick={onLoginClick}>
  Login
</button>
        <button
  className="cart-btn"
  onClick={() => {
    document.getElementById("cart").scrollIntoView({
      behavior: "smooth",
    });
  }}
>
  🛒 Cart
</button>
      </div>
    </nav>
  );
}

export default Navbar;