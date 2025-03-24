import React, { useEffect, useState } from "react";

const Recommendations = ({ userId, role }) => {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch recommendations based on the user's role
    fetch(`http://127.0.0.1:8000/api/recommend/?username=${userId}&role=${role}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setRecommendations(data.recommendations);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, [userId, role]);

  if (loading) {
    return <div className="text-center py-12">Loading recommendations...</div>;
  }

  if (error) {
    return <div className="text-center py-12 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-6">Recommended Just For You</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {recommendations.map((product) => (
          <div key={product.name} className="bg-white p-4 rounded-lg shadow-md">
            <img
              src={product.image_url}
              alt={product.name}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h3 className="text-lg font-semibold">{product.name}</h3>
            <p className="text-gray-600">${product.price}</p>
            <p className="text-sm text-gray-500">{product.category}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recommendations;