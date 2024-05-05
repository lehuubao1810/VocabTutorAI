import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";

import ggIcon from "../assets/icon/ggIcon.png";
import bgIcon from "../assets/icon/book_hardset.png";
import { Link } from "react-router-dom";
import { NavAuth } from "../components/auth/NavAuth";

type LoginProps = {
  //
};

type FormState = {
  email: string;
  password: string;
};

export const Login: React.FC<LoginProps> = (props) => {
  console.log("props", props);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormState>();

  const onSubmit: SubmitHandler<FormState> = (data) => {
    console.log(data);
  };

  return (
    <>
      <header></header>
      <main className="lg">
        <div className="flex h-screen ">
          {/* Left page */}
          <div className="w-1/2 h-screen relative bg-gradient-to-r from-cyan-300 to-blue-300 max-lg:hidden max-md:hidden">
            <img className="w-full h-full object-contain" src={bgIcon} alt="" />

            <div className="absolute flex flex-col bottom-0 left-0 p-10 gap-2">
              <h1 className=" text-4xl font-bold text-white">VocabTutor</h1>
              <p className="text-xl font-semibold font-serif text-gray-500">
                Today a reader, tomorrow a leader ...
              </p>
            </div>
          </div>
          {/* Right page */}
          <div className="flex flex-col w-1/2 px-20 mt-10 max-lg:w-full max-md:w-full max-md:px-4">
            <NavAuth />
            <button className="flex items-center justify-center gap-2 w-full border-2 border-gray-500 bg-transparent text-gray-500 hover:text-gray-800 hover:border-gray-800 py-2 px-4 rounded-lg">
              <img className="w-7 h-7" src={ggIcon} alt="" />
              Login with Google
            </button>
            <div className="my-8 flex items-center justify-center">
              <span className="block w-full h-0.5 bg-slate-500"></span>
              <p className="w-full whitespace-nowrap px-4 text-center text-slate-500 font-medium">
                Or login with email & password
              </p>
              <span className="block w-full h-0.5 bg-slate-500"></span>
            </div>
            <p className="pb-5 text-4xl text-center text-gray-500 font-bold mx-5">
              Welcome back !
            </p>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
            >
              <div className="flex flex-col gap-4">
                <div>
                  <p className="mb-2 font-bold text-slate-500 text-sm">Email</p>
                  <input
                    type="email"
                    placeholder="Email"
                    className="border-2 border-gray-500 rounded-lg py-3 px-4 w-full"
                    {...register("email", {
                      required: "Email is required",
                    })}
                  />
                  <p className="text-red-500 text-sm font-semibold">
                    {errors.email?.message}
                  </p>
                </div>

                <div>
                  <p className="mb-2 font-bold text-slate-500 text-sm">
                    Password
                  </p>
                  <input
                    type="password"
                    placeholder="Password"
                    className="border-2 border-gray-500 rounded-lg py-3 px-4 w-full"
                    {...register("password", {
                      required: "Password is required",
                    })}
                  />
                  <p className="text-red-500 text-sm font-semibold">
                    {errors.password?.message}
                  </p>
                </div>
              </div>

              <button
                type="submit"
                className="bg-blue-500 text-white py-3 rounded-lg font-bold mt-4"
              >
                Login
              </button>
            </form>

            <div className="py-6 flex items-center justify-center gap-2">
              <p className="text-slate-500">Did you have an account yet ?</p>{" "}
              <Link className="text-blue-500 underline" to="/signup">
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </main>
      <footer></footer>
    </>
  );
};

export default Login;
