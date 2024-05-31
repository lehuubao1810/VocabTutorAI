import {
  faFacebook,
  faInstagram,
  faLinkedin,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

type FooterProps = {
  //
};

const Footer: React.FC<FooterProps> = () => {
  const navigate = useNavigate();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast.success("Thanks for your interest in TutorAI!");
  };

  return (
    <footer className="bg-gray-800 text-white">
      <div className=" ml-auto mr-auto max-w-screen-xl px-5 py-10 max-md:pt-10 max-md:pb-3">
        <div className="max-w-screen-xl flex flex-col gap-6 justify-center items-center">
          <div className="flex flex-col gap-4 items-center">
            {/* Logo */}
            <h1
              className="text-2xl font-bold text-cyan-500 cursor-pointer"
              onClick={() => {
                navigate("/");
              }}
            >
              TutorAI.
            </h1>
            {/* Form nhập email */}
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Type your email"
                className="bg-gray-900 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 sm:max-w-40  "
              />
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-md mt-2"
              >
                Đăng ký
              </button>
            </form>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex gap-4">
              <a
                href="https://www.facebook.com/bb.huubao"
                className="text-white hover:text-blue-500"
              >
                <FontAwesomeIcon icon={faFacebook} />
              </a>
              <a href="!#" className="text-white hover:text-blue-500">
                <FontAwesomeIcon icon={faInstagram} />
              </a>
              <a href="!#" className="text-white hover:text-blue-500">
                <FontAwesomeIcon icon={faTwitter} />
              </a>
              <a
                href="https://www.linkedin.com/in/minh-hi%E1%BB%83n-phan-30007b216/"
                className="text-white hover:text-blue-500"
              >
                <FontAwesomeIcon icon={faLinkedin} />
              </a>
            </div>
          </div>
          {/* Copyright */}
          <div className="text-center">
            <p>
              © {new Date().getFullYear()} Vocab Tutor. All rights will be
              registered
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
