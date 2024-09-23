import React, { useState, useEffect } from "react";
import { ImPlus } from "react-icons/im";
import NavTitle from "./NavTitle";

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null); // State to track active category

  useEffect(() => {
    const fetchCategories = async () => {
      const token = localStorage.getItem("token"); // Get token from local storage

      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/categories`, {
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
        setCategories(data.data); // Accessing the 'data' array from the response
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []); // Empty dependency array means this effect runs once on mount

  const toggleDescription = (id) => {
    setActiveCategory(activeCategory === id ? null : id); // Toggle active category
  };

  return (
    <div className="w-full">
      <NavTitle title="Shop by Category" icons={false} />
      <div>
        <ul className="flex flex-col gap-4 text-sm lg:text-base text-[#767676]">
          {categories.map(({ ID, name, description }) => (
            <li
              key={ID}
              className="border-b-[1px] border-b-[#F0F0F0] pb-2 flex flex-col"
            >
              <div className="flex items-center justify-between">
                {name} {/* Displaying the name of the category */}
                <span
                  onClick={() => toggleDescription(ID)} // Toggle description on click
                  className="text-[10px] lg:text-xs cursor-pointer text-gray-400 hover:text-primeColor duration-300"
                >
                  <ImPlus />
                </span>
              </div>
              {activeCategory === ID && ( // Show description if it's the active category
                <p className="text-xs text-gray-500">{description}</p>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Category;
