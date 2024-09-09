import { BrowserRouter, Route, Routes } from "react-router-dom"
import Footer from "./components/footer/Footer.tsx"
import Navbar from "./components/nav/Navbar.tsx"
import Home from "./components/pages/home/Home.tsx"
import Contact from "./components/pages/contact/Contact.tsx"
import ErrorPage from "./components/pages/not-found/ErrorPage.tsx"
import ProductList from "./components/pages/admin/products/ProductList.tsx"
import CreateProduct from "./components/pages/admin/products/CreateProduct.tsx"
import EditProduct from "./components/pages/admin/products/EditProduct.tsx"
import ProductDetails from "./components/pages/admin/products/ProductDetails.tsx"
import Register from "./components/pages/auth/Register.tsx"
import Login from "./components/pages/auth/Login.tsx"

function App() {

  return (
    <div className="h-full bg-slate-100 container mx-auto">
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/contact" element={<Contact/>}/>
          <Route path="/products/:id" element={<ProductDetails/>}/>

          <Route path="/auth/register" element={<Register/>}/>
          <Route path="/auth/login" element={<Login/>}/>
          
          <Route path="/admin/products" element={<ProductList/>}/>
          <Route path="/admin/products/create" element={<CreateProduct/>}/>
          <Route path="/admin/products/edit/:id" element={<EditProduct/>}/>
          <Route path="*" element={<ErrorPage/>}/>
        </Routes>
        <div className="static bottom-0 left-0 right-0">
          <Footer/>
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App
