import { Link, useNavigate } from "react-router-dom";
import { ProductsType } from "../../types.ts";

type PropsType = {
  product: ProductsType;
};

const ProductItem = ({ product }: PropsType) => {
  const navigate = useNavigate();
  const productShow = () => {
    navigate(`/products/${product.id}`);
  };
  return (
    <div
      className="rounded border shadow-lg transition ease-in-out hover:shadow-blue-600 p-4 h-auto w-[220px] text-center mx-auto cursor-pointer hover:-translate-y-6"
      onClick={productShow}
    >
      <img
        src={`http://localhost:4000/images/${product.imageFilename}`}
        alt="device"
        className="object-contain h-48 w-96 my-5"
      />
      <hr />
      <h4 className="my-3">{product.name}</h4>
      <p>
        Brand: {product.brand}, Category: {product.category} <br />
        {product.description
          ? product.description.slice(0, 50) + "..."
          : "No description available"}
      </p>
      <h4 className="my-3">{product.price}$</h4>
      <Link
        role="button"
        className="btn btn-sm btn-primary"
        to={`/products/${product.id}`}
      >
        Details
      </Link>
    </div>
  );
};

export default ProductItem;
