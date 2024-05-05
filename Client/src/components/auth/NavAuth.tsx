import { NavLink } from "react-router-dom";

type Props = {
  //
};

export const NavAuth: React.FC<Props> = (props) => {
  console.log(props);
  return (
    <div className="flex mb-6 gap-4">
      <NavLink
        className={({ isActive }) =>
          `text-xl font-bold ${isActive ? "text-blue-500 border-blue-500 border-b-2 pb-2" : "text-gray-500"}`
        }
        to="/login"
      >
        Login
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          `text-xl font-bold  ${isActive ? "text-blue-500 border-blue-500 border-b-2 pb-2" : "text-gray-500"}`
        }
        to="/signup"
      >
        Sign Up
      </NavLink>
    </div>
  );
};
