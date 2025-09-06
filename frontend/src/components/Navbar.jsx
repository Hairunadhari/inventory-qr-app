import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-blue-600 text-white px-6 py-3 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-lg font-bold">MyApp</div>
        <ul className="hidden md:flex space-x-6">
            <li><Link to="/" className="hover:text-gray-200">Home</Link></li>
            <li><Link to="/scan" className="hover:text-gray-200">Scan</Link></li>
        </ul>
        
      </div>
    </nav>
  );
}
