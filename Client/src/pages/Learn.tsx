import React from "react";
import { Nav } from "../components/common/Nav";

type Props = {
  // type of the props
};

export const Learn: React.FC<Props> = (props) => {
  console.log(props);
  return (
    <div>
      <header>
        <Nav />
      </header>
    </div>
  );
};
