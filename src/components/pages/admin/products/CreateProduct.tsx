import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ValidationErrorsType } from "../../../../types.ts";

function CreateProduct() {
  const [ validationErrors, setValidationErrors ] = useState<ValidationErrorsType>({})
  const navigate = useNavigate()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => { 
    event.preventDefault()

    const formElement = event.target as HTMLFormElement;
    const formData = new FormData(formElement)
    const product = Object.fromEntries(formData.entries())
    
    if (!product.name || !product.brand || !product.category || !product.price || !product.description || !product.image.name) {
      alert("Please fill all the fields")
      return
    }

    try {
      const response = await fetch("http://localhost:4000/products", {
        method: "POST",
        body: formData,
      })

      const data = await response.json()
      
      if (response.ok) {
        navigate("/admin/products")
      }
      else if (response.status === 400) {
        setValidationErrors(data)
      }
      else {
        alert("Unable to create the product!")
      }
    } catch (error) {
      alert("Unable to connect to the server!")
    }
   }

  return (
    <div className="h-lvh container mx-auto my-8 ">
      <div className="grid grid-rows-1">
        <div className="mx-auto rounded border p-4 shadow-2xl">
          <h2 className="text-center mb-5">Create Product</h2>

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
                    required
                  />
                  <span className="text-error">{validationErrors.brand}</span>
                </label>
              </div>

              <div>
                <select
                  className="select select-bordered w-full max-w-xs"
                  name="category"
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
                  Price
                  <input
                    type="number"
                    className="grow"
                    placeholder=""
                    name="price"
                    step={0.01}
                    min={1}
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
                ></textarea>
                <span className="text-error">{validationErrors.description}</span>
              </div>

              <div>
                <input
                  type="file"
                  className="file-input file-input-bordered w-full max-w-xs"
                  name="image"
                />
                <span className="text-error">{validationErrors.image}</span>
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
        </div>
      </div>
    </div>
  );
}

export default CreateProduct;
