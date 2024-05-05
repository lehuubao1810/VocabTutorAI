import React from "react";
import { Nav } from "../components/common/Nav";

type Props = {
  // type of the props
};

export const Home: React.FC<Props> = (props) => {
  console.log(props);

  return (
    <div >
      <header>
        <Nav />
      </header>
      <main className="bg-slate-100 min-h-screen">
        
      </main>
    </div>
  );
};
