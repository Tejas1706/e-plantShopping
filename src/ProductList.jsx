import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';
import CartItem from './CartItem';

const plantsArray = [
  {
    category: 'Air Purifying Plants',
    plants: [
      { name: 'Snake Plant', image: 'https://placehold.co/300x200/4caf50/ffffff?text=Snake+Plant', description: 'Produces oxygen at night.', cost: 15 },
      { name: 'Spider Plant', image: 'https://placehold.co/300x200/4caf50/ffffff?text=Spider+Plant', description: 'Filters formaldehyde.', cost: 12 },
      { name: 'Peace Lily', image: 'https://placehold.co/300x200/4caf50/ffffff?text=Peace+Lily', description: 'Removes mold spores.', cost: 18 },
      { name: 'Boston Fern', image: 'https://placehold.co/300x200/4caf50/ffffff?text=Boston+Fern', description: 'Adds humidity to the air.', cost: 20 },
      { name: 'Rubber Plant', image: 'https://placehold.co/300x200/4caf50/ffffff?text=Rubber+Plant', description: 'Absorbs airborne toxins.', cost: 17 },
      { name: 'Aloe Vera', image: 'https://placehold.co/300x200/4caf50/ffffff?text=Aloe+Vera', description: 'Purifies air, soothing gel.', cost: 14 },
    ],
  },
  {
    category: 'Aromatic Plants',
    plants: [
      { name: 'Lavender', image: 'https://placehold.co/300x200/8e6bbf/ffffff?text=Lavender', description: 'Calming scent.', cost: 20 },
      { name: 'Jasmine', image: 'https://placehold.co/300x200/8e6bbf/ffffff?text=Jasmine', description: 'Sweet fragrance.', cost: 18 },
      { name: 'Rosemary', image: 'https://placehold.co/300x200/8e6bbf/ffffff?text=Rosemary', description: 'Herbal, woody aroma.', cost: 15 },
      { name: 'Mint', image: 'https://placehold.co/300x200/8e6bbf/ffffff?text=Mint', description: 'Refreshing, fast growing.', cost: 12 },
      { name: 'Lemon Balm', image: 'https://placehold.co/300x200/8e6bbf/ffffff?text=Lemon+Balm', description: 'Citrus scent, calming.', cost: 14 },
      { name: 'Hyacinth', image: 'https://placehold.co/300x200/8e6bbf/ffffff?text=Hyacinth', description: 'Strong floral perfume.', cost: 22 },
    ],
  },
  {
    category: 'Low Maintenance Plants',
    plants: [
      { name: 'ZZ Plant', image: 'https://placehold.co/300x200/2e7d32/ffffff?text=ZZ+Plant', description: 'Thrives on neglect.', cost: 25 },
      { name: 'Pothos', image: 'https://placehold.co/300x200/2e7d32/ffffff?text=Pothos', description: 'Tolerates low light.', cost: 10 },
      { name: 'Cast Iron Plant', image: 'https://placehold.co/300x200/2e7d32/ffffff?text=Cast+Iron+Plant', description: 'Nearly indestructible.', cost: 28 },
      { name: 'Jade Plant', image: 'https://placehold.co/300x200/2e7d32/ffffff?text=Jade+Plant', description: 'Stores water in its leaves.', cost: 16 },
      { name: 'Cactus', image: 'https://placehold.co/300x200/2e7d32/ffffff?text=Cactus', description: 'Needs very little water.', cost: 9 },
      { name: 'Chinese Evergreen', image: 'https://placehold.co/300x200/2e7d32/ffffff?text=Chinese+Evergreen', description: 'Easy in shade.', cost: 19 },
    ],
  },
];

function ProductList({ onHomeClick }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const [showCart, setShowCart] = useState(false);

  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const isInCart = (name) => cartItems.some((item) => item.name === name);

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
  };

  return (
    <div>
      {/* Navbar: shows on BOTH plants and cart views */}
      <nav className="navbar">
        <div className="navbar-brand" onClick={onHomeClick}>
          <h3>Paradise Nursery</h3>
        </div>
        <div className="navbar-links">
          <a href="#" onClick={(e) => { e.preventDefault(); onHomeClick(); }}>Home</a>
          <a href="#" onClick={(e) => { e.preventDefault(); setShowCart(false); }}>Plants</a>
          <a href="#" onClick={(e) => { e.preventDefault(); setShowCart(true); }} className="cart-link">
            🛒 <span className="cart-count">{totalQuantity}</span>
          </a>
        </div>
      </nav>

      {!showCart ? (
        <div className="product-grid">
          {plantsArray.map((group) => (
            <div key={group.category}>
              <h2 className="category-title">{group.category}</h2>
              <div className="category-plants">
                {group.plants.map((plant) => (
                  <div className="product-card" key={plant.name}>
                    <img className="product-image" src={plant.image} alt={plant.name} />
                    <h3>{plant.name}</h3>
                    <p>{plant.description}</p>
                    <p className="product-price">${plant.cost}</p>
                    <button
                      className="product-button"
                      disabled={isInCart(plant.name)}
                      onClick={() => handleAddToCart(plant)}
                    >
                      {isInCart(plant.name) ? 'Added to Cart' : 'Add to Cart'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <CartItem onContinueShopping={() => setShowCart(false)} />
      )}
    </div>
  );
}

export default ProductList;