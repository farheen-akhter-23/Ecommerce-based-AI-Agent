import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function CardGrid() {
  const [products, setProducts] = useState([]); // State to store products
  const [loading, setLoading] = useState(true); // State to handle loading state
  const [error, setError] = useState(null); // State to handle errors
  const [isClicked, setIsClicked] = useState({}); // State to track clicked status for each product
  const [scrollLength, setScrollLength] = useState(0); // State to track scroll length
  
  // Track scroll length
    useEffect(() => {
      const handleScroll = () => {
        setScrollLength(window.scrollY); // Update scroll length
      };
  
      window.addEventListener("scroll", handleScroll); // Add scroll event listener
      return () => {
        window.removeEventListener("scroll", handleScroll); // Cleanup
      };
    }, []);
  // Fetch products from the API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/products/");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setProducts(data); // Update the products state

        // Initialize isClicked state for each product
        const initialClickState = data.reduce((acc, product) => {
          acc[product.id] = false; // Set initial state to false
          return acc;
        }, {});
        setIsClicked(initialClickState);
      } catch (error) {
        setError(error.message); // Handle errors
      } finally {
        setLoading(false); // Set loading to false
      }
    };

    fetchProducts();
  }, []);

  // Handle product click
  const handleProductClick = (productId) => {
    // Toggle the clicked state for the product
    setIsClicked((prevState) => ({
      ...prevState,
      [productId]: !prevState[productId], // Toggle between true and false
    }));

    // Log the interaction to the backend
    logInteraction(productId, !isClicked[productId]);
  };

  // Log interaction to the backend
  const logInteraction = async (productId, isClicked) => {
    const interactionData = {
      user_id: "rjidp6uplj", // Replace with dynamic user ID or session ID
      product_id: productId,
      scroll_length: 0, // Replace with actual scroll length if needed
      dwell_time: 0, // Replace with actual dwell time if needed
      is_clicked: isClicked,
    };

    try {
      const response = await fetch("http://127.0.0.1:8000/api/interaction/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(interactionData),
      });
      if (!response.ok) {
        throw new Error("Failed to log interaction");
      }
      const data = await response.json();
      console.log("Interaction logged successfully:", data);
    } catch (error) {
      console.error("Error logging interaction:", error);
    }
  };

  // Display loading state
  if (loading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  // Display error state
  if (error) {
    return <div className="text-center py-12 text-red-500">Error: {error}</div>;
  }

  // Render the product grid
  return (
    <div className="container mx-auto py-12">
      <h2 className="text-3xl font-bold text-center mb-8">Our Products</h2>
      <div className="grid grid-cols-1 text-center md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
          >
            <Link
             to={{
              pathname: `/product/${product.id}`,
              state: { scrollLength }, // Pass scroll length as state
            }}
              onClick={() => handleProductClick(product.id)} // Track product click
            >
              <h3 className="text-xl font-bold mb-2">{product.name}</h3>
              <img
                src={`http://127.0.0.1:8000/${product.image}`} // Construct the full image URL
                alt={product.name}
                className="product-image "
              />
              <p className="text-gray-700 mb-4">{product.category}</p>
              <p className="text-blue-600 font-bold">${product.price}</p>
            </Link>
            <p className="text-sm text-gray-500">
              Clicked: {isClicked[product.id] ? "Yes" : "No"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CardGrid;