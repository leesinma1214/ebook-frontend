import { type FC } from "react";
import useAuth from "../hooks/useAuth";

interface Props {}

const Home: FC<Props> = () => {
  const authStatus = useAuth();
  console.log(authStatus);

  return (
    <div>
      <h2>Home</h2>
      {/* Home page content goes here */}
    </div>
  );
};

export default Home;
