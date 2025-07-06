import React from "react";
import "./App.css";
import { CartProvider } from "./components/context/CartContext";
import { CartIcon } from "./components/Lesson05/ShoppingCart/CartIcon";
import { ProductGrid } from "./components/Lesson05/ShoppingCart/ProductGrid";

function App() {
  return (
    <CartProvider>
      <div className="app">
        <header className="header">
          <h1>BigMarket</h1>
          <CartIcon />
        </header>
        <h2 className="sectionTitle">Thực phẩm khô</h2>
        <ProductGrid />
      </div>
    </CartProvider>
  );
}

export default App;
