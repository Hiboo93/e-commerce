import { useEffect, useState } from "react"
import ProductItem from "../../product/ProductItem.tsx"
import { ProductsType } from "../../../types.ts";
import { Link } from "react-router-dom";

function Home() {
  const [ products, setProducts ] = useState<ProductsType[]>([])

  // pagination functionality
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 5;

  // filter functionality
  const [ filterParams, setFilterParams ] = useState({brand: "", category: ""})

  const getProducts = async () => {
    let url = `http://localhost:4000/products?_sort=id&_order=desc&_page=${currentPage}&_limit=${pageSize}`;
    
    if (filterParams.brand) {
      url = `${url}&brand=${filterParams.brand}`
    }
    if (filterParams.category) {
      url = `${url}&category=${filterParams.category}`
    }

    try {
      let response = await fetch(url);
      let productsData = await response.json();
      console.log(products);
      
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
    getProducts()
  },[currentPage, filterParams])

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

  // filter functionality
  const handleBrandFilter = (event: React.ChangeEvent<HTMLSelectElement>) => { 
      let brand = event.target.value
      setFilterParams({ ...filterParams, brand: brand })
   }

  const handleCategoryFilter = (event: React.ChangeEvent<HTMLSelectElement>) => { 
    let category = event.target.value
    setFilterParams({ ...filterParams, category: category })
  }

  return (
    <div className="h-auto">
      <div className=" bg-blue-600 min-h-[200px]">
        <div className="container mx-auto py-5 text-white">
          <div className="grid md:grid-cols-2">
            <div className="flex flex-col justify-center gap-8 p-8">
              <h1 className=" text-8xl"><strong>Best Store of Electronics</strong></h1>
              <p className="text-lg">Find a large selection of newest electronic devices from most popular brands and with affordable prices.</p>
            </div>
            <div className="grid grid-cols-1 text-center py-5 px-4">
              <img src="/hero.png" alt="hero" width={700} className=""/>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="container py-5 px-5 " >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 ">
            <div>
              <h4 className="text-2xl">Products</h4>
            </div>
            <div className="my-2">
              <select className="select select-bordered w-full max-w-xs" onChange={handleBrandFilter}>
                <option disabled selected>All Brands</option>
                <option value="">All Brands</option>
                <option value="Samsung">Samsung</option>
                <option value="Apple">Apple</option>
                <option value="Nokia">Nokia</option>
                <option value="HP">Hp</option>
              </select>
            </div>

            <div className="my-2">
              <select className="select select-bordered w-full max-w-xs" onChange={handleCategoryFilter}>
                <option disabled selected>All Categories</option>
                <option value="">All Categories</option>
                <option value="Phones">Phone</option>
                <option value="Computers">Computers</option>
                <option value="Accessories">Accessories</option>
                <option value="Printers">Printers</option>
                <option value="Cameras">Cameras</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="my-2">
              <select className="select select-bordered w-full max-w-xs">
                <option disabled selected>Order By Newest</option>
                <option value="0">Order By Newest</option>
                <option value="1">Price: Low to High</option>
                <option value="2">Price: High to Low</option>
              </select>
            </div>
          </div>

          <div>
            <div className="mt-8 grid grid-cols-2 md:grid-cols-3 gap-5 lg:grid-cols-4 xl:grid-cols-5">
              {
                products.map((product, index) => (
                  <div key={index}>
                    <ProductItem product={product}/>
                  </div>
                ))
              }
            </div>
          </div>
        </div>
      </div>
      <div className="join ml-12">{paginationButtons}</div>
    </div>
  )
}

export default Home
