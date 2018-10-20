import Link from "next/link";

const Home = props => (
  <div>
    hey!
    <Link href="/sell">
      <a>Go to sell</a>
    </Link>
  </div>
);

export default Home;
