import React, { useEffect, useState } from 'react';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('https://fakestoreapi.com/products');
      const data = await res.json();
      setProducts(data);
    };

    fetchData();
  }, []);

  // Pagination logic
  const totalPages = Math.ceil(products.length / itemsPerPage);
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentProducts = products.slice(indexOfFirst, indexOfLast);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0); // optional: scroll to top on page change
  };

  return (
    <div className="productContainer">
      <h1>Products</h1>

      {products.length === 0 ? (
        <p>Loading...</p>
      ) : (
        <>
          <ul>
            {currentProducts.map((product) => (
              <li key={product.id}>
                <h2>{product.title}</h2>
                <img src={product.image} alt={product.title} width={100} />
                <p>{product.price} USD</p>
              </li>
            ))}
          </ul>

          {/* Pagination controls */}
          <div style={{ marginTop: '1rem', textAlign: 'center' }}>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => handlePageChange(i + 1)}
                style={{
                  margin: '0 4px',
                  padding: '0.5rem 1rem',
                  background: currentPage === i + 1 ? '#0070f3' : '#e0e0e0',
                  color: currentPage === i + 1 ? '#fff' : '#000',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                }}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
