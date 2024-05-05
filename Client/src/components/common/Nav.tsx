import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { logOut } from "../../redux/authSlice";

type Props = {
  // type of the props
};

export const Nav: React.FC<Props> = () => {
  const navLink = [
    {
      to: "/",
      text: "Home",
    },
    {
      to: "/characters-ai",
      text: "Characters AI",
    },
    {
      to: "/collection/:idCollection",
      text: "Collection",
    },
  ];

  const [modalUser, setModalUser] = useState(false);

  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.authReducer);

  const handleLogout = () => {
    dispatch(logOut())
      .unwrap()
      .then(() => {
        console.log("Logout success");
      });
  };

  return (
    <div>
      <nav className="p-4 flex items-center justify-between gap-4 fixed w-screen bg-white">
        <h1 className="text-2xl font-bold text-cyan-500">TutorAI.</h1>
        <ul className="flex gap-4 items-center">
          {navLink.map((link, index) => {
            return (
              <li key={index}>
                <NavLink
                  className={({ isActive }) => `
                        text-base font-semibold ${
                          isActive
                            ? "text-blue-500 border-blue-500 border-b-4 pb-2 rounded-bl rounded-br"
                            : "text-gray-500"
                        }
                        `}
                  to={link.to}
                >
                  {link.text}
                </NavLink>
              </li>
            );
          })}
        </ul>
        {/* dictionary */}
        <div className="w-2/3">
          <input
            type="text"
            placeholder="Type the word you want to search"
            className="border-2 border-slate-300 rounded-3xl py-2 px-4 bg-slate-100 w-full"
          />
        </div>
        {/* user */}
        <div
          className="flex gap-2 items-center cursor-pointer"
          onClick={() => setModalUser(!modalUser)}
        >
          <img
            src="https://randomuser.me/api/portraits/men/73.jpg"
            alt=""
            className="w-10 h-10 rounded-full"
          />
        </div>
        {modalUser && (
          <div className="absolute top-20 right-4 bg-white shadow-lg rounded-lg p-4 pt-2">
            <div className="flex gap-2 mb-4 p-2 border-b-slate-300 border-b-2">
              <img
                src="https://randomuser.me/api/portraits/men/73.jpg"
                alt=""
                className="w-10 h-10 rounded-full"
              />
              <div className="max-w-32">
                <p className="font-semibold text-sm text-slate-500">
                  {user?.username}
                </p>
                <p className="font-semibold text-sm text-slate-500 text-ellipsis overflow-hidden">{user?.email}</p>
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
                  onClick={handleLogout}
                  className="font-semibold cursor-pointer text-slate-500 rounded-lg px-2 py-2 w-full block hover:text-red-500 hover:bg-slate-100 "
                >
                  Logout
                </p>
              </li>
            </ul>
          </div>
        )}
      </nav>
    </div>
  );
};
