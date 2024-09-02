import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ProductsType } from "../../../../types.ts";

function ProductList() {
  const [products, setProducts] = useState<ProductsType[]>([]);

   // pagination functionality
   const [currentPage, setCurrentPage] = useState(1);
   const [totalPages, setTotalPages] = useState(1);
   const pageSize = 5;

   // search functionality
   const [ search, setSearch ] = useState("")

   // sort functionality
   const [ sortColumn, setSortColumn ] = useState({column: "id", orderBy: "desc"})

 
  const getProducts = async () => {
    let url = `http://localhost:4000/products?_page=${currentPage}&_limit=${pageSize}&q=${search}&_sort=${sortColumn.column}&_order=${sortColumn.orderBy}`;

    try {
      let response = await fetch(url);
      let productsData = await response.json();
      if (response.ok) {
        let totalCount = response.headers.get("X-Total-Count");
        if (totalCount) {
          const totalItems = parseInt(totalCount, 10);
          let pages: number = Math.ceil(totalItems / pageSize);
          setTotalPages(pages);
          setProducts(productsData);
        }
      }
    } catch (error) {
      alert("Unable to get the data");
    }
  };

  useEffect(() => {
    getProducts();
  }, [currentPage, search, sortColumn]);

  const handleDelete = async (id: number) => {
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


  // search functionality
  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => { 
    event.preventDefault()

    const searchElement = event.target as HTMLFormElement;
    let text = searchElement.search.value
    setSearch(text)
    setCurrentPage(1)
   }


   // sort functionality
   const sortTable = (column: string) => { 
      let orderBy = "desc"

      if (column === sortColumn.column) {
        // reverse orderBy
        if (sortColumn.orderBy === "asc") {
          orderBy = "desc"
        }else {
          orderBy = "asc"
        }
      }

      setSortColumn({column: column, orderBy: orderBy})
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
              <th className="cursor-pointer" onClick={() => sortTable("id")}>ID</th>
              <th className="cursor-pointer" onClick={() => sortTable("name")}>Name</th>
              <th className="cursor-pointer" onClick={() => sortTable("brand")}>Brand</th>
              <th className="cursor-pointer" onClick={() => sortTable("category")}>Category</th>
              <th className="cursor-pointer" onClick={() => sortTable("price")}>Price</th>
              <th>Image</th>
              <th className="cursor-pointer" onClick={() => sortTable("createdAt")}>Created At</th>
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

