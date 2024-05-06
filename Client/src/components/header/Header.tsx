import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { logOut } from "../../redux/authSlice";
import { TranslateInput } from "./TranslateInput";
import { UserModal } from "./UserModal";
import { Nav } from "./Nav";
import { useNavigate } from "react-router-dom";

type Props = {
  // type of the props
};

export const Header: React.FC<Props> = () => {
  const [modalUser, setModalUser] = useState(false);

  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.authReducer);

  // const { translated } = useAppSelector((state) => state.dictionaryReducer);

  const handleLogout = () => {
    dispatch(logOut())
      .unwrap()
      .then(() => {
        console.log("Logout success");
      });
  };

  return (
    <div>
      <nav className="p-4 flex items-center justify-between gap-4 fixed w-screen bg-white z-40">
        <h1
          className="text-2xl font-bold text-cyan-500 cursor-pointer"
          onClick={() => {
            navigate("/");
          }}
        >
          TutorAI.
        </h1>
        <Nav />
        {/* dictionary */}
        <div className="w-2/3 relative">
          <TranslateInput />
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
        {modalUser && <UserModal user={user} handleLogout={handleLogout} />}
      </nav>
    </div>
  );
};
