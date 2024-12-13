import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ProductsType, ValidationErrorsType } from "../../../../types.ts";
import { useAppContext } from "../../../../AppContext.tsx";


function EditProduct() {
  const { id } = useParams<{id: string}>()

  const [ initialData, setInitialData ] = useState<ProductsType>()
  const [validationErrors, setValidationErrors] = useState<ValidationErrorsType>({});

  const {userCredentials} = useAppContext()
  
  const navigate = useNavigate();

  async function getProduct() {
    try {
      const response = await fetch(`http://localhost:4000/products/${id}`);
      const data = await response.json()
      if (response.ok) {
        setInitialData(data)
      }
    } catch (error) {
      alert("Unable to read the product details")
    }
  }

  useEffect(() => {
    getProduct()
  }, [])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formElement = event.target as HTMLFormElement;
    const formData = new FormData(formElement);
    const product = Object.fromEntries(formData.entries());

    if (
      !product.name ||
      !product.brand ||
      !product.category ||
      !product.price ||
      !product.description
    ) {
      alert("Please fill all the fields");
      return;
    }

    try {
      const response = await fetch(`http://localhost:4000/products/${id}`, {
        method: "PATCH",
        headers: {
          "Authorization": "Bearer " + userCredentials.user.accessToken
        },
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        navigate("/admin/products");
      } else if (response.status === 400) {
        setValidationErrors(data);
      } else {
        alert("Unable to update the product!");
      }
    } catch (error) {
      alert("Unable to connect to the server!");
    }
  };

  return (
    <div className="h-lvh container mx-auto my-8 ">
      <div className="grid grid-rows-1">
        <div className="mx-auto rounded border p-4 shadow-2xl">
          <h2 className="text-center mb-5">Edit Product</h2>

          <div className="my-3">
            <label className="input input-bordered flex items-center gap-2">
              id
              <input
                type="text"
                className="grow"
                placeholder=""
                readOnly
                defaultValue={id}
              />
              <span className="text-error">{validationErrors.name}</span>
            </label>
          </div>


          {
            initialData &&
          <form action="" onSubmit={handleSubmit}>
            <div className="grid grid-rows-1 mb-3 gap-y-3">
              <div>
                <label className="input input-bordered flex items-center gap-2">
                  Name
                  <input
                    type="text"
                    className="grow"
                    placeholder=""
                    name="name"
                    defaultValue={initialData.name}
                    required
                  />
                  <span className="text-error">{validationErrors.name}</span>
                </label>
              </div>

              <div>
                <label className="input input-bordered flex items-center gap-2">
                  Brand
                  <input
                    type="text"
                    className="grow"
                    placeholder=""
                    name="brand"
                    defaultValue={initialData.brand}
                    required
                  />
                  <span className="text-error">{validationErrors.brand}</span>
                </label>
              </div>

              <div>
                <select
                  className="select select-bordered w-full max-w-xs"
                  name="category"
                  defaultValue={initialData.category}
                  aria-label="Product Category"
                >
                  <option disabled selected>
                    Category
                  </option>
                  <option value={"Other"}>Other</option>
                  <option value={"Phones"}>Phones</option>
                  <option value={"Computer"}>Computer</option>
                  <option value={"Accessories"}>Accessories</option>
                  <option value={"Printers"}>Printers</option>
                  <option value={"Cameras"}>Cameras</option>
                </select>
                <span className="text-error">{validationErrors.category}</span>
              </div>

              <div>
                <label className="input input-bordered flex items-center gap-2">
                  <input
                    type="number"
                    className="grow"
                    placeholder=""
                    name="price"
                    step={0.01}
                    min={1}
                    defaultValue={initialData.price}
                    required
                  />
                  <span className="text-error">{validationErrors.price}</span>
                </label>
              </div>

              <div>
                <textarea
                  className="textarea textarea-bordered"
                  placeholder="Description"
                  name="description"
                  defaultValue={initialData.description}
                ></textarea>
                <span className="text-error">
                  {validationErrors.description}
                </span>
              </div>

              <div>
                <img
                  src={"http://localhost:4000/image/" + initialData.imageFilename}
                  alt="..."
                  width="150"
                />
              </div>

              <div>
                <input
                  id="product-price"
                  type="file"
                  className="file-input file-input-bordered w-full max-w-xs"
                  name="image"
                />
                <span className="text-error">{validationErrors.image}</span>
              </div>

              <div>
                <input
                  className="file-input file-input-bordered w-full max-w-xs"
                  readOnly
                  defaultValue={initialData.createdAt.slice(0, 10)}
                />
              </div>

              <div className="flex gap-x-2">
                <div>
                  <button className="btn btn-primary" type="submit">
                    Submit
                  </button>
                </div>
                <div>
                  <Link
                    className="btn btn-secondary"
                    to={"/admin/products"}
                    role="button"
                  >
                    Cancel
                  </Link>
                </div>
              </div>
            </div>
          </form>
          }
        </div>
      </div>
    </div>
  );
}

export default EditProduct;
