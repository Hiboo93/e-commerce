import { BrowserRouter, Route, Routes } from "react-router-dom"
import Footer from "./components/footer/Footer.tsx"
import Navbar from "./components/nav/Navbar.tsx"
import Home from "./components/pages/home/Home.tsx"
import Contact from "./components/pages/contact/Contact.tsx"
import ErrorPage from "./components/pages/not-found/ErrorPage.tsx"
import ProductList from "./components/pages/admin/products/ProductList.tsx"

function App() {

  return (
    <div className="h-full bg-slate-100 container mx-auto">
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/contact" element={<Contact/>}/>
          <Route path="/admin/products" element={<ProductList/>}/>
          <Route path="*" element={<ErrorPage/>}/>
        </Routes>
        <Footer/>
      </BrowserRouter>
    </div>
  )
}

export default App
