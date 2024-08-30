import { Link } from "react-router-dom"

const ProductItem = ({ product }) => {
  return (
    <div className="rounded border shadow-lg p-4 h-auto w-[220px] text-center mx-auto ">
      <img src={`http://localhost:4000/images/${product.imageFilename}`} alt="device"  className="object-contain h-48 w-96 my-5"/>
      <hr />
      <h4 className="my-3">{product.name}</h4>
      <p>
        Brand: {product.brand}, Category: {product.category} <br />
        {product.description.substr(0, 50) + "..."}
      </p>
      <h4 className="my-3">{product.price}$</h4>
      <Link role="button" className="btn btn-sm btn-primary" to={`/products/${product.id}`}>Details</Link>
    </div>
  )
}

export default ProductItem
