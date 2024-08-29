import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ProductsType } from "../../../../types.ts";

function ProductList() {
  const [products, setProducts] = useState<ProductsType[]>([]);

   // search functionality
   const [ search, setSearch ] = useState("")

  // pagination functionality
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 5;

  const getProducts = async () => {
    let url = `http://localhost:4000/products?_sort=id&_order=desc&_page=${currentPage}&_limit=${pageSize}&q=${search}`;

    try {
      let response = await fetch(url);
      let productsData = await response.json();
      if (response.ok) {
        let totalCount = response.headers.get("X-Total-Count");
        let pages: number | null = Math.ceil(totalCount / pageSize);
        // console.log("Total Pages:" + pages);
        setTotalPages(pages);
        setProducts(productsData);
      }
    } catch (error) {
      alert("Unable to get the data");
    }
  };

  useEffect(() => {
    getProducts();
  }, [currentPage, search]);

  const handleDelete = async (id: ProductsType) => {
    try {
      const response = await fetch(`http://localhost:4000/products/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        getProducts();
      }
    } catch (error) {
      alert("Unable to delete the product");
    }
  };

 

  // pagination functionality
  let paginationButtons = [];
  for (let i = 1; i <= totalPages; i++) {
    paginationButtons.push(
        <Link className={
          i === currentPage ? "join-item btn btn-active" : "join-item btn"
        }
        key={i} to={`?page=${i}`} onClick={event => {
          event.preventDefault()

          setCurrentPage(i)
        }}>{i}</Link>
    );
  }

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => { 
    event.preventDefault()

    const searchElement = event.target as HTMLFormElement;
    let text = searchElement.search.value
    setSearch(text)
    setCurrentPage(1)
   }

  return (
    <div className="container my-4">
      <h2 className="text-center mb-4 text-3xl">Products</h2>

      <div className="my-8">
        <div className="mx-4">
          <Link
            className="btn btn-primary mx-2"
            to="/admin/products/create"
            role="button"
          >
            Create Product
          </Link>
          <button
            className="btn btn-outline btn-primary"
            type="button"
            onClick={getProducts}
          >
            Refresh
          </button>
        </div>
        <div className="my-6 mx-4">
          <form onSubmit={handleSearch} >
            <div className="form-control">
              <input name="search" type="text" placeholder="Search" className="input input-bordered w-64 md:w-96" />
              <button className="btn btn-accent my-3 w-24">Validate</button>
            </div>
          </form>
        </div>
      </div>

      <div className="overflow-x-auto mx-4 container">
        <table className="table">
          {/* head */}
          <thead>
            <tr className="text-black">
              <th>ID</th>
              <th>Name</th>
              <th>Brand</th>
              <th>Category</th>
              <th>Price</th>
              <th>Image</th>
              <th>Created At</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {products.map((product, index) => (
              <tr key={index} className="">
                <th>{product.id}</th>
                <td>{product.name}</td>
                <td>{product.brand}</td>
                <td>{product.category}</td>
                <td>{product.price}$</td>
                <td>
                  <img
                    src={`http://localhost:4000/images/${product.imageFilename}`}
                    width={100}
                    alt="produit"
                  />
                </td>
                <td>{product.createdAt.slice(0, 10)}</td>
                <td>
                  <Link
                    className="btn btn-primary mx-2"
                    to={`/admin/products/edit/${product.id}`}
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    className="btn btn-normal btn-error"
                    onClick={() => handleDelete(product.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="join">{paginationButtons}</div>
      </div>
    </div>
  );
}

export default ProductList;
