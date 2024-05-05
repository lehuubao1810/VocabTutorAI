import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { logOut } from "../../redux/authSlice";
import { translateText } from "../../redux/dictionarySlice";
import { debounce } from "lodash";
import { CircularProgress } from "@mui/material";

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
  ];

  const [modalUser, setModalUser] = useState(false);

  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.authReducer);

  const dictionary = useAppSelector((state) => state.dictionaryReducer);

  // const { translated } = useAppSelector((state) => state.dictionaryReducer);

  const handleLogout = () => {
    dispatch(logOut())
      .unwrap()
      .then(() => {
        console.log("Logout success");
      });
  };

  // debounce translate
  const [textTranslate, setTextTranslate] = useState("");
  const [loadingTranslate, setLoadingTranslate] = useState(false);
  // Sử dụng hàm debounce để tạo một phiên bản mới của hàm xử lý sự kiện với trễ 300ms
  const debounceRef = useRef(
    debounce((value) => {
      console.log("Sending translation request for:", value);
      // Gọi dispatch ở đây
      dispatch(translateText(value))
        .unwrap()
        .then((res) => {
          console.log("Translate success", res);
          setLoadingTranslate(false);
        });
    }, 800)
  );

  useEffect(() => {
    const debounceFn = debounceRef.current; // Copy debounceRef.current to a variable
    return () => {
      debounceFn.cancel(); // Use the variable in the cleanup function
    };
  }, []);

  const handleTextTranslate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTextTranslate(value);
    setLoadingTranslate(true);
    debounceRef.current(value);
  };
  return (
    <div>
      <nav className="p-4 flex items-center justify-between gap-4 fixed w-screen bg-white z-40">
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
        <div className="w-2/3 relative">
          <input
            type="text"
            placeholder="Type the word or sentence to translate ..."
            className="border-2 border-slate-300 rounded-3xl py-2 px-4 bg-slate-100 w-full"
            value={textTranslate}
            onChange={(e) => handleTextTranslate(e)}
          />
          {textTranslate.trim() !== "" && (
            <div className="absolute top-16 left-0 w-full bg-white shadow-lg rounded-lg p-4 pt-2">
              <p className="font-semibold text-blue-500">Translated</p>
              {loadingTranslate ? (
                <div className="flex items-center justify-center pt-2">
                  <CircularProgress />
                </div>
              ) : (
                <p className="font-semibold text-slate-500 pt-2">
                  {dictionary.translated}
                </p>
              )}
            </div>
          )}
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
                <p className="font-semibold text-sm text-slate-500 text-ellipsis overflow-hidden">
                  {user?.email}
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
