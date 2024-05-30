import React from "react";
import { useNavigate } from "react-router-dom";

type FooterProps = {
  //
};

const Footer: React.FC<FooterProps> = () => {
  const navigate = useNavigate();

  return (
    <footer className="bg-gray-800 text-white min-h-60 flex flex-col justify-center gap-4 items-center	">
      <div>
        {/* Logo */}
        <h1
          className="text-2xl font-bold text-cyan-500 cursor-pointer"
          onClick={() => {
            navigate("/");
          }}
        >
          TutorAI.
        </h1>
      </div>
      {/* Copyright */}
      <div >
        <p>
          &copy; {new Date().getFullYear()} VocabTutor. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
