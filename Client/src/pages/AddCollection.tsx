import React from "react";
import { Header } from "../components/header/Header";

type Props = {
  // type of the props
};

export const AddCollection: React.FC<Props> = (props) => {
  console.log(props);
  return (
    <div>
      <header>
        <Header />
      </header>
    </div>
  );
};
