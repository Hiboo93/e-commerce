import { useEffect, useState } from "react";
import { BsCart4 } from "react-icons/bs";
import { Link, useParams } from "react-router-dom";
import { ProductsType } from "../../../../types.ts";

function ProductDetails() {
  const { id } = useParams()
  const [ product, setProduct ] = useState<Partial<ProductsType>>({})

  const getProductDetails = async () => { 
    try {
      let response = await fetch(`http://localhost:4000/products/${id}`)
      let data = await response.json()

      if (response.ok) {
        setProduct(data)
      }else {
        alert("unable to get the product details")
      }
    } catch (error) {
      alert("unable to connect to the server")
    }
   }

   useEffect(() => {
    getProductDetails()
   }, [])
   
  return (
    <div className="h-full container mx-auto my-4">
      <div className="grid grid-flow-col-dense px-3 gap-10">
        <div className="grid grid-cols-1 text-center ">
          <img src={`http://localhost:4000/images/${product.imageFilename}`} alt="..." className="mb-3" width={350}/>
        </div>
        <div className="text-3xl ">
          <h3 className="mb-3">{product.name}</h3>
          <h3 className="mb-3">{product.price}$</h3>
          <button type="button" className="btn btn-sm btn-warning mb-4">
            Add to Cart <BsCart4 />
          </button>

          <hr />

          <div className="grid grid-cols-2 my-3">
            <div className="font-semibold">
              Brand
            </div>
            <div>
              {product.brand}
            </div>
          </div>

          <div className="grid grid-cols-2 my-3 mb-3">
            <div className="font-semibold">
              Category
            </div>
            <div>
              {product.category}
            </div>
          </div>

          <div className="font-semibold">Description</div>
          <div className="text-base whitespace-pre-line">
            {product.description}
          </div>
        </div>
      </div>

      <Link to={"/"} className="btn btn-neutral ml-3">Retour</Link>
    </div>
  )
}

export default ProductDetails