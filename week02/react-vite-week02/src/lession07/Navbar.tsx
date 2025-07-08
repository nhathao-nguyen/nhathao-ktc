import { Link } from "react-router-dom";

const Navbar: React.FC = () => (
  <nav className="bg-yellow-600 p-4 flex flex-col md:flex-row justify-between items-center text-white p-5">
    <div className="font-bold text-2xl mb-2 md:mb-0">Magazines</div>
    <div className="space-x-4 text-lg flex">
      <Link className="hover:underline hover:text-black" to="/">
        Home
      </Link>
      <Link className="hover:underline hover:text-black" to="/blog">
        Blog
      </Link>
      <Link className="hover:underline hover:text-black" to="/category">
        Category
      </Link>
      <Link className="hover:underline hover:text-black" to="/product">
        Product
      </Link>
      <Link className="hover:underline hover:text-black" to="/login">
        Login
      </Link>
      <Link className="hover:underline hover:text-black" to="/customer">
        Customer
      </Link>
      <div className="text-2xl mt-2 md:mt-0">🛒</div>
    </div>
  </nav>
);

export default Navbar;
