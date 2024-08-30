import ProductItem from "../../product/ProductItem.tsx"

function Home() {
  
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
              <select className="select select-bordered w-full max-w-xs">
                <option disabled selected>All Brands</option>
                <option value="">All Brands</option>
                <option value="samsung">Samsung</option>
                <option value="apple">Apple</option>
                <option value="nokia">Nokia</option>
                <option value="hp">Hp</option>
              </select>
            </div>

            <div className="my-2">
              <select className="select select-bordered w-full max-w-xs">
                <option disabled selected>All Categories</option>
                <option value="">All Categories</option>
                <option value="phone">Phone</option>
                <option value="computer">Computers</option>
                <option value="accessories">Accessories</option>
                <option value="printers">Printers</option>
                <option value="cameras">Cameras</option>
                <option value="other">Other</option>
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
            <div className="mt-8">
              <ProductItem product={
                {
                "id": 1,
                "name": "MSI Pulse Pro",
                "brand": "MSI",
                "category": "Computers",
                "price": 1099,
                "description": "MSI Pulse GL66 15.6\" FHD 144Hz Gaming Laptop: Intel Core i7-12700H RTX 3070 16GB 512GB NVMe SSD",
                "imageFilename": "22866337.jpg",
                "createdAt": "2023-07-13T17:46:54.8900000"
                }
              }/>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
