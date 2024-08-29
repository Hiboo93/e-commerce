import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ProductsType } from "../../../../types.ts";

function ProductList() {
  const [ products, setProducts ] = useState<ProductsType[]>([])

  const getProducts = async () => { 
    try {
      let response = await fetch("http://localhost:4000/products?_sort=user,views&_order=desc,asc")
      let productsData = await response.json()
      setProducts(productsData)
    } catch (error) {
      alert("Unable to get the data")
    }
   }

   useEffect(() => {
    getProducts()
   }, [])

   const handleDelete = async (id: ProductsType) => { 
    try {
      const response =  await fetch(`http://localhost:4000/products/${id}`, {
        method: "DELETE",
      })
    if (response.ok) {
      getProducts()
    }
    } catch (error) {
      alert("Unable to delete the product")
    }

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
          <button className="btn btn-outline btn-primary" type="button" onClick={getProducts}>
            Refresh
          </button>
        </div>
        <div className="grid col-auto">

        </div>
      </div>

      <div className="overflow-x-auto mx-4">
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
              {
                products.map((product, index) => (
                  <tr key={index} className="">
                    <th>{product.id}</th>
                    <td>{product.name}</td>
                    <td>{product.brand}</td>
                    <td>{product.category}</td>
                    <td>{product.price}$</td>
                    <td><img src={`http://localhost:4000/images/${product.imageFilename}`} width={100} alt="produit" /></td>
                    <td>{product.createdAt.slice(0,10)}</td>
                    <td>
                      <Link className="btn btn-primary mx-2" to={`/admin/products/edit/${product.id}`}>Edit</Link>
                      <button type="button" className="btn btn-normal btn-error" onClick={() => handleDelete(product.id)}>Delete</button>
                    </td>
                  </tr>
                ))
              }
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ProductList;
