function Categories({ selectedCategory, setSelectedCategory }) {
  const categories = [
    { name: "Pizza", emoji: "🍕" },
    { name: "Burgers", emoji: "🍔" },
    { name: "Biryani", emoji: "🍛" },
    { name: "Chinese", emoji: "🥡" },
    { name: "Desserts", emoji: "🍰" },
    { name: "Drinks", emoji: "🥤" },
  ];

  return (
    <section className="section" id="categories">
      <div className="section-heading">
        <div>
          <p className="small-title">WHAT ARE YOU CRAVING?</p>
          <h2>Explore Categories</h2>
        </div>
      </div>

      <div className="categories">
        {categories.map((category) => (
            <div
               className="category-card"
               key={category.name}
                onClick={() => setSelectedCategory(category.name)}
>
            <div className="category-icon">{category.emoji}</div>
            <h3>{category.name}</h3>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Categories;