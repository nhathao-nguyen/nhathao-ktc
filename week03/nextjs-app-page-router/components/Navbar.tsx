import Link from "next/link";

const Navbar = () => {
  return (
    <nav style={{ padding: 20, borderBottom: "1px solid #ccc" }}>
      <Link href="/" style={{ marginRight: 20 }}>
        Home
      </Link>
      <Link href="/blog" style={{ marginRight: 20 }}>
        Blog
      </Link>
      <Link href="/contact" style={{ marginRight: 20 }}>
        Contact
      </Link>
      <Link href="/products" style={{ marginRight: 20 }}>
        Products
      </Link>
      <Link href="/login">Login</Link>
    </nav>
  );
};

export default Navbar;
