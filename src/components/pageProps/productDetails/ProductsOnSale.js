import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const ProductsOnSale = () => {
  const [products, setProducts] = useState([]); // State to store fetched products
  const [loading, setLoading] = useState(true); // State for loading status
  const [error, setError] = useState(null); // State to handle errors
  const navigate = useNavigate(); // Initialize useNavigate

  // Fetch products on sale from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem("token"); // Get token from localStorage
        const response = await fetch(`${process.env.REACT_APP_API_URL}/product/sales`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`, // Add token in the request header
            'Content-Type': 'application/json',
          },
        });

        const data = await response.json();
        console.log(data); // Log the data to check its structure

        if (data.status === "success") {
          setProducts(data.data); // Set products from API
        } else {
          setError("Failed to fetch products");
        }
      } catch (error) {
        setError("An error occurred while fetching products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleNavigateToShop = () => {
    navigate('/shop'); // Redirect to the shop page
  };

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h3 
        className="font-titleFont text-xl font-semibold mb-6 underline underline-offset-4 decoration-[1px] cursor-pointer"
        onClick={handleNavigateToShop} // Handle click event to navigate
      >
        Products on Sale
      </h3>
      <div className="flex flex-col gap-2">
        {products.map((item) => (
          <div
            key={item.ID}
            className="flex items-center gap-4 border-b-[1px] border-b-gray-300 py-2"
          >
            <div>
              <img className="w-24" src={item.image_url} alt={item.name} /> {/* Use API data for image */}
            </div>
            <div className="flex flex-col gap-2 font-titleFont">
              <p className="text-base font-medium">{item.name}</p> {/* Product Name */}
              <p className="text-sm font-semibold">${item.price}</p> {/* Product Price */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsOnSale;
