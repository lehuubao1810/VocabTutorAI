import React from "react";
import { Nav } from "../components/Nav";


type Props = {
  // type of the props
};

export const Home: React.FC<Props> = (props) => {
  console.log(props);
    
  return <div>
    <Nav/>
  </div>;
};
