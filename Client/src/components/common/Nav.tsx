import { NavLink } from "react-router-dom";

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
      to: "/add-collection",
      text: "Add Collection",
    },
    {
      to: "/collection/:idCollection",
      text: "Collection",
    },
    {
      to: "/collection/:idCollection/edit",
      text: "Edit Collection",
    },
    {
      to: "/collection/:idCollection/learn",
      text: "Learn",
    },
    {
      to: "/roomai/:idCharacterAI",
      text: "Room AI",
    },
  ];

  return (
    <div>
      <nav>
        <ul>
          {navLink.map((link, index) => {
            return (
              <li key={index}>
                <NavLink
                  className={({ isActive }) => `
                        text-xl font-bold ${
                          isActive
                            ? "text-blue-500 border-blue-500 border-b-2 pb-2"
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
      </nav>
    </div>
  );
};
