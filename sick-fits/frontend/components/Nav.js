import Link from "next/link";

const Nav = props => (
  <div>
    <Link href="/sell">
      <a>Home</a>
    </Link>
    <Link href="/">
      <a>Go to home</a>
    </Link>
  </div>
);

export default Nav;
