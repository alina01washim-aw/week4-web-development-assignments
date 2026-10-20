
import { useEffect, useState } from "react";
import "./App.css";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const API_URL = `${API_BASE_URL}/api/products`;

const AUTH_URL = `${API_BASE_URL}/api/auth`;


function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [authMode, setAuthMode] = useState("login");
  const [authForm, setAuthForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [user, setUser] = useState(() => {
  const savedUser = localStorage.getItem("pinkcartUser");

  return savedUser ? JSON.parse(savedUser) : null;
  });
  const [authMessage, setAuthMessage] = useState("");
  const [authLoading, setAuthLoading] = useState(false);


  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch(API_URL);

        if (!response.ok) {
          throw new Error("Could not load products");
        }

        const data = await response.json();
        setProducts(data.products);
      } catch (err) {
        setError("Unable to load products. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  
  async function handleAuthSubmit(event) {
    event.preventDefault();
    setAuthMessage("");
    setAuthLoading(true);

    try {
      const response = await fetch(`${AUTH_URL}/${authMode === "signup" ? "signup" : "login"}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(authForm),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Authentication failed");
      }

      localStorage.setItem("pinkcartToken", data.token);
      localStorage.setItem("pinkcartUser", JSON.stringify(data.user));
      setUser(data.user);
      setAuthMessage(data.message);
      setAuthForm({ name: "", email: "", password: "" });
    } catch (err) {
      setAuthMessage(err.message || "Unable to connect to the server");
    } finally {
      setAuthLoading(false);
    }
  }

  function handleLogout() {
  localStorage.removeItem("pinkcartToken");
  localStorage.removeItem("pinkcartUser");
  setUser(null);
  setAuthMessage("You have been logged out.");
  }

  function addToCart(product) {
    setCart((currentCart) => {
      const existing = currentCart.find(
        (item) => item._id === product._id
      );

      if (existing) {
        return currentCart.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...currentCart, { ...product, quantity: 1 }];
    });
  }

  function changeQuantity(id, amount) {
    setCart((currentCart) =>
      currentCart
        .map((item) =>
          item._id === id
            ? { ...item, quantity: item.quantity + amount }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }

  function removeFromCart(id) {
    setCart((currentCart) =>
      currentCart.filter((item) => item._id !== id)
    );
  }

  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const cartTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="app">
      <header className="navbar">
        <a className="logo" href="/">pinkcart.</a>
        <a className="cart-count" href="#cart">
          Cart ({cartCount})
        </a>
      </header>

      
      <section className="auth-section">
        <div className="auth-card">
          {user ? (
            <>
              <p className="eyebrow">YOUR ACCOUNT</p>
              <h2>Welcome, {user.name}!</h2>
              <p>You are signed in to PinkCart.</p>
              <button type="button" onClick={handleLogout}>
                Log Out
              </button>
            </>
          ) : (
            <>
              <p className="eyebrow">WELCOME TO PINKCART</p>
              <h2>{authMode === "signup" ? "Create an account" : "Welcome back"}</h2>
              <p>
                {authMode === "signup"
                  ? "Sign up to get started."
                  : "Log in to your account."}
              </p>

              <div className="auth-tabs">
                <button
                  type="button"
                  className={authMode === "login" ? "active" : ""}
                  onClick={() => {
                    setAuthMode("login");
                    setAuthMessage("");
                  }}
                >
                  Login
                </button>
                <button
                  type="button"
                  className={authMode === "signup" ? "active" : ""}
                  onClick={() => {
                    setAuthMode("signup");
                    setAuthMessage("");
                  }}
                >
                  Sign Up
                </button>
              </div>

              <form onSubmit={handleAuthSubmit}>
                {authMode === "signup" && (
                  <label>
                    Full name
                    <input
                      type="text"
                      value={authForm.name}
                      onChange={(event) =>
                        setAuthForm({ ...authForm, name: event.target.value })
                      }
                      placeholder="Your name"
                      required
                    />
                  </label>
                )}

                <label>
                  Email address
                  <input
                    type="email"
                    value={authForm.email}
                    onChange={(event) =>
                      setAuthForm({ ...authForm, email: event.target.value })
                    }
                    placeholder="you@example.com"
                    required
                  />
                </label>

                <label>
                  Password
                  <input
                    type="password"
                    value={authForm.password}
                    onChange={(event) =>
                      setAuthForm({ ...authForm, password: event.target.value })
                    }
                    placeholder="At least 6 characters"
                    minLength={6}
                    required
                  />
                </label>

                <button type="submit" disabled={authLoading}>
                  {authLoading
                    ? "Please wait..."
                    : authMode === "signup"
                      ? "Create Account"
                      : "Log In"}
                </button>
              </form>

              {authMessage && (
                <p className="auth-message" role="status">
                  {authMessage}
                </p>
              )}
            </>
          )}
        </div>
      </section>


      <main>
        <section className="hero">
          <p className="eyebrow">YOUR EVERYDAY FINDS</p>
          <h1>Good products.<br />Better prices.</h1>
          <p>Discover your next favourite thing.</p>
        </section>

        <section className="products-section">
          <div className="section-heading">
            <h2>Featured Products</h2>
            <span>{products.length} products</span>
          </div>

          {loading && <p>Loading products...</p>}
          {error && <p className="error-message">{error}</p>}

          {!loading && !error && (
            <div className="product-grid">
              {products.map((product) => (
                <article className="product-card" key={product._id}>
                  <div className="product-image">{product.emoji}</div>
                  <div className="product-info">
                    <h3>{product.name}</h3>
                    <p className="description">
                      {product.description}
                    </p>
                    <p className="price">
                      ₹{product.price.toLocaleString("en-IN")}
                    </p>
                    <button onClick={() => addToCart(product)}>
                      Add to Cart
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        <section className="cart-section" id="cart">
          <div className="section-heading">
            <h2>Your Shopping Cart</h2>
            <span>{cartCount} items</span>
          </div>

          {cart.length === 0 ? (
            <p className="empty-cart">
              Your cart is empty. Add something you love!
            </p>
          ) : (
            <>
              <div className="cart-items">
                {cart.map((item) => (
                  <article className="cart-item" key={item._id}>
                    <div className="cart-item-emoji">
                      {item.emoji}
                    </div>

                    <div className="cart-item-details">
                      <h3>{item.name}</h3>
                      <p>
                        ₹{item.price.toLocaleString("en-IN")} each
                      </p>

                      <div className="quantity-controls">
                        <button
                          className="quantity-button"
                          onClick={() => changeQuantity(item._id, -1)}
                          aria-label={`Decrease ${item.name} quantity`}
                        >
                          −
                        </button>

                        <span>{item.quantity}</span>

                        <button
                          className="quantity-button"
                          onClick={() => changeQuantity(item._id, 1)}
                          aria-label={`Increase ${item.name} quantity`}
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div className="cart-item-actions">
                      <strong>
                        ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                      </strong>
                      <button
                        className="remove-button"
                        onClick={() => removeFromCart(item._id)}
                      >
                        Remove
                      </button>
                    </div>
                  </article>
                ))}
              </div>

              <div className="cart-total">
                <span>Total Amount</span>
                <strong>
                  ₹{cartTotal.toLocaleString("en-IN")}
                </strong>
              </div>

              <button
                className="clear-cart-button"
                onClick={() => setCart([])}
              >
                Clear Cart
              </button>
            </>
          )}
        </section>
      </main>

      <footer>
        <p>pinkcart. — Shopping made simple.</p>
      </footer>
    </div>
  );
}

export default App;
