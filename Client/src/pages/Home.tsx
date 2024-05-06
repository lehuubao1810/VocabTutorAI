import React from "react";
import { Header } from "../components/header/Header";

type Props = {
  // type of the props
};

export const Home: React.FC<Props> = (props) => {
  console.log(props);

  return (
    <div >
      <header>
        <Header />
      </header>
      <main className="bg-slate-100 min-h-screen">
        
      </main>
    </div>
  );
};
