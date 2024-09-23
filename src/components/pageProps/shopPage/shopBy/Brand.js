import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import NavTitle from "./NavTitle";

const Brand = () => {
  const [showBrands, setShowBrands] = useState(true);
  const [brands, setBrands] = useState([]);
  const [activeBrand, setActiveBrand] = useState(null); // State to track active brand

  useEffect(() => {
    const fetchBrands = async () => {
      const token = localStorage.getItem("token"); // Get token from local storage

      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/brands`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`, // Use token from localStorage
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setBrands(data.data); // Accessing the 'data' array from the response
      } catch (error) {
        console.error("Error fetching brands:", error);
      }
    };

    fetchBrands();
  }, []); // Empty dependency array means this effect runs once on mount

  const toggleDescription = (id) => {
    setActiveBrand(activeBrand === id ? null : id); // Toggle active brand
  };

  return (
    <div>
      <div onClick={() => setShowBrands(!showBrands)} className="cursor-pointer">
        <NavTitle title="Shop by Brand" icons={true} />
      </div>
      {showBrands && (
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <ul className="flex flex-col gap-4 text-sm lg:text-base text-[#767676]">
            {brands.map(({ ID, name, description }) => (
              <li
                key={ID}
                className="border-b-[1px] border-b-[#F0F0F0] pb-2 flex flex-col"
              >
                {name}
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </div>
  );
};

export default Brand;
