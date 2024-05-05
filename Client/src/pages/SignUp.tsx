import React, { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import ggIcon from "../assets/icon/ggIcon.png";
import bgIcon from "../assets/icon/book_hardset.png";
import { Link } from "react-router-dom";
import { NavAuth } from "../components/auth/NavAuth";
import { regPassword } from "../utils/validate";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { LoadingScreen } from "../components/LoadingScreen";
import { signUpEmailPassword } from "../redux/authSlice";

type LoginProps = {
  //
};

type FormState = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const schema = yup.object().shape({
  username: yup.string().required("Username is required"),
  email: yup.string().email("Email is not valid").required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters")
    .matches(
      regPassword,
      "Password must contain at least 1 uppercase, 1 lowercase, 1 number and 1 special character"
    ),
  confirmPassword: yup
    .string()
    .required("Confirm Password is required")
    .oneOf([yup.ref("password")], "Passwords must match"),
});

export const SignUp: React.FC<LoginProps> = () => {
  const { user, loading } = useAppSelector((state) => state.authReducer);

  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormState>({
    resolver: yupResolver(schema),
  });

  const handleSignUp: SubmitHandler<FormState> = (data) => {
    const { username, email, password } = data;
    console.log("data sign up", { username, email, password });
    dispatch(signUpEmailPassword({ username, email, password }))
      .unwrap()
      .then((result) => {
        console.log("Sign up success", result);
      });
  };

  useEffect(() => {
    if (user) {
      console.log("User", user);
    }
  }, [user]);

  return (
    <>
      {loading && <LoadingScreen />}
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
          <div className="flex flex-col w-1/2 px-20 pt-10 overflow-y-auto max-lg:w-full max-md:w-full max-md:px-4">
            <NavAuth />
            <button className="flex items-center justify-center gap-2 w-full border-2 border-gray-500 bg-transparent text-gray-500 hover:text-gray-800 hover:border-gray-800 py-2 px-4 rounded-lg">
              <img className="w-7 h-7" src={ggIcon} alt="" />
              Continue with Google
            </button>
            <div className="my-8 flex items-center justify-center">
              <span className="block w-full h-0.5 bg-slate-500"></span>
              <p className="w-full whitespace-nowrap px-4 text-center text-slate-500 font-medium">
                Or sign up with email
              </p>
              <span className="block w-full h-0.5 bg-slate-500"></span>
            </div>

            <form
              onSubmit={handleSubmit(handleSignUp)}
              className="flex flex-col gap-4"
            >
              <div>
                <p className="mb-2 font-bold text-slate-500 text-sm">
                  Username
                </p>
                <input
                  type="text"
                  placeholder="Username"
                  className="border-2 border-gray-500 rounded-lg py-3 px-4 w-full"
                  {...register("username")}
                />
                <p className="text-red-500 text-sm font-semibold">
                  {errors.username?.message}
                </p>
              </div>

              <div>
                <p className="mb-2 font-bold text-slate-500 text-sm">Email</p>
                <input
                  type="email"
                  placeholder="Email"
                  className="border-2 border-gray-500 rounded-lg py-3 px-4 w-full"
                  {...register("email")}
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
                  {...register("password")}
                />
                <p className="text-red-500 text-sm font-semibold">
                  {errors.password?.message}
                </p>
              </div>

              <div>
                <p className="mb-2 font-bold text-slate-500 text-sm">
                  Confirm Password
                </p>
                <input
                  type="password"
                  placeholder="Confirm Password"
                  className="border-2 border-gray-500 rounded-lg py-3 px-4 w-full"
                  {...register("confirmPassword")}
                />
                <p className="text-red-500 text-sm font-semibold">
                  {errors.confirmPassword?.message}
                </p>
              </div>
              <button
                type="submit"
                className="bg-blue-500 text-white py-3 rounded-lg font-bold mt-4"
              >
                Sign Up
              </button>
            </form>

            <div className="py-6 flex items-center justify-center gap-2">
              <p className="text-slate-500">Did you have an account ?</p>{" "}
              <Link className="text-blue-500 underline" to="/signup">
                Login
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default SignUp;
