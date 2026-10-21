import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="container font-semibold text-dark-gray text-sm bg-gray/30 flex items-center justify-between">
      <p>© 2024 ShortLink. The Digital Architect.</p>
      <nav className="flex gap-4 list-none">
        <li>
          <Link to="" className="hover:underline">
            PRIVACY POLICY
          </Link>
        </li>
        <li>
          <Link to="" className="hover:underline">
            TERMS OF SERVICE
          </Link>
        </li>
        <li>
          <Link to="" className="hover:underline">
            API DOCUMENTATION
          </Link>
        </li>
        <li>
          <Link to="" className="hover:underline">
            SUPORT
          </Link>
        </li>
      </nav>
    </footer>
  );
};

export default Footer;
