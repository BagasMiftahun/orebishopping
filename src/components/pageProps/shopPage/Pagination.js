import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import Product from "../../home/Products/Product";

const Pagination = ({ itemsPerPage }) => {
  const [products, setProducts] = useState([]);
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      const token = localStorage.getItem("token"); // Get token from local storage

      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/products`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`, // Use token from localStorage
            'Content-Type': 'application/json',
          },
        });

        const data = await response.json();
        if (data.status === "success") {
          setProducts(data.data);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const endOffset = itemOffset + itemsPerPage;
  const currentItems = products.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(products.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % products.length;
    setItemOffset(newOffset);
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 mdl:gap-4 lg:gap-10">
        {currentItems && currentItems.map((item) => (
          <div key={item.ID} className="w-full">
            <Product
              _id={item.ID}
              img={item.image_url} // Use the correct field for image URL
              productName={item.name} // Use the correct field for product name
              price={item.price}
              color={item.color}
              badge={item.badge} // Assuming you want to show a badge, adjust as needed
              des={item.description} // Adjust as needed if description is needed
            />
          </div>
        ))}
      </div>
      <div className="flex flex-col mdl:flex-row justify-center mdl:justify-between items-center">
        <ReactPaginate
          nextLabel=""
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          pageCount={pageCount}
          previousLabel=""
          pageLinkClassName="w-9 h-9 border-[1px] border-lightColor hover:border-gray-500 duration-300 flex justify-center items-center"
          pageClassName="mr-6"
          containerClassName="flex text-base font-semibold font-titleFont py-10"
          activeClassName="bg-black text-white"
        />
        <p className="text-base font-normal text-lightText">
          Products from {itemOffset + 1} to {endOffset} of {products.length}
        </p>
      </div>
    </div>
  );
};

export default Pagination;
