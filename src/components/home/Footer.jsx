import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="container text-xs font-semibold text-dark-gray bg-gray/30 flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-0">
      <p>© 2024 ShortLink. The Digital Architect.</p>
      <nav className="hidden lg:flex flex-col lg:flex-row gap-4 list-none">
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
