import { NavLink } from "react-router-dom";
import { User } from "../../type/User";

type Props = {
  // type of the props
  user: User;
  handleLogout: () => void;
};

export const UserModal: React.FC<Props> = (props) => {
  console.log(props);
  return (
    <div className="absolute top-20 right-4 bg-white shadow-lg rounded-lg p-4 pt-2 z-50">
      <div className="flex gap-2 mb-4 p-2 border-b-slate-300 border-b-2">
        <img
          src="https://randomuser.me/api/portraits/men/73.jpg"
          alt=""
          className="w-10 h-10 rounded-full"
        />
        <div className="max-w-34">
          <p className="font-semibold text-sm text-slate-500">
            {props.user?.username}
          </p>
          <p className="font-semibold text-sm text-slate-500 text-ellipsis overflow-hidden">
            {props.user?.email}
          </p>
        </div>
      </div>
      <ul className="flex flex-col gap-2">
        <li>
          <NavLink
            to="/profile"
            className="font-semibold text-slate-500 rounded-lg px-2 py-2 w-full block hover:text-blue-500 hover:bg-slate-100 "
          >
            Profile
          </NavLink>
        </li>
        <li>
          <p
            onClick={props.handleLogout}
            className="font-semibold cursor-pointer text-slate-500 rounded-lg px-2 py-2 w-full block hover:text-red-500 hover:bg-slate-100 "
          >
            Logout
          </p>
        </li>
      </ul>
    </div>
  );
};
