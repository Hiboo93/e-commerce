import Footer from "./components/footer/Footer.tsx"
import Navbar from "./components/nav/Navbar.tsx"

function App() {

  return (
    <div className="h-lvh bg-slate-100">
      <Navbar/>
      <h2 className="text-3xl font-bold ">
        Welcome to our  website
      </h2>
      <Footer/>
    </div>
  )
}

export default App
