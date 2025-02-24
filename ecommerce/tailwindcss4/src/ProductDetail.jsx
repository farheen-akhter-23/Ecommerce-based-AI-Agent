import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ProductDetail() {
  const { id } = useParams(); // Get the product ID from the URL
  const [product, setProduct] = useState(null); // State to store product details
  const [loading, setLoading] = useState(true); // State to handle loading state
  const [error, setError] = useState(null); // State to handle errors
  const [dwellTime, setDwellTime] = useState(0); // State to track dwell time
  const scrollLength = location.state?.scrollLength || 0; // Get scroll length from location state

  const getSessionId = () => {
    let sessionId = localStorage.getItem('sessionId');
    if (!sessionId) {
      sessionId = Math.random().toString(36).substring(2, 15); // Generate a random session ID
      localStorage.setItem('sessionId', sessionId);
    }
    return sessionId;
  };
  
  // Track dwell time
  useEffect(() => {
    const startTime = new Date().getTime(); // Record start time

    return () => {
      const endTime = new Date().getTime(); // Record end time
      const timeSpent = (endTime - startTime) / 1000; // Calculate dwell time in seconds
      setDwellTime(timeSpent);
      const sessionId = getSessionId(); // Use session ID as user_id

      // Send interaction data to the backend
      const interactionData = {
        user_id: sessionId,
        product_id: id,
        scroll_length: scrollLength, // Scroll length is tracked in CardGrid
        dwell_time: timeSpent,
      };

      fetch("http://127.0.0.1:8000/api/interaction/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(interactionData),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to send interaction data");
          }
          return response.json();
        })
        .then((data) => {
          console.log("Interaction data sent successfully:", data);
        })
        .catch((error) => {
          console.error("Error sending interaction data:", error);
        });
    };
  }, [id]);
  // Fetch product details from the API
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/product/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: id }), // Send the product ID in the request body
        });
        if (!response.ok) {
          throw new Error("Failed to fetch product details");
        }
        const data = await response.json();
        setProduct(data); // Update the product state
      } catch (error) {
        setError(error.message); // Handle errors
      } finally {
        setLoading(false); // Set loading to false
      }
    };

    fetchProduct();
  }, [id]);

  // Display loading state
  if (loading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  // Display error state
  if (error) {
    return <div className="text-center py-12 text-red-500">Error: {error}</div>;
  }

  // Render the product details
  return (
    <div className="container mx-auto py-12">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
        <img
          src={`http://127.0.0.1:8000${product.image}`} // Construct the full image URL
          alt={product.name}
          className="w-full h-auto rounded-lg mb-6"
        />
        <p className="text-gray-700 mb-4">{product.description}</p>
        <p className="text-blue-600 font-bold">${product.price}</p>
        <p className="text-gray-600 mt-4">Category: {product.category}</p>
      </div>
    </div>
  );
}

export default ProductDetail;