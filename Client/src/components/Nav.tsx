import React from "react";
import { Link } from "react-router-dom";

type Props = {
  // type of the props
};

export const Nav: React.FC<Props> = (props) => {
  console.log(props);
//   <Route path="/home" element={<Home />} />
//   <Route path="/characters-ai" element={<CharactersAI />} />
//   <Route path="/add-collection" element={<AddCollection />} />
//   <Route path="/collection/:idCollection" element={<Collection />} />
//   <Route path="/collection/:idCollection/edit" element={<EditCollection/>} />
//   <Route path="/collection/:idCollection/learn" element={<Learn />} />
//   <Route path="/roomai/:idCharacterAI" element={<RoomAI />} />
  return <div>
    <nav>
      <ul>
        <li>
          <Link to="/home">Home</Link>
        </li>
        <li>
          <Link to="/characters-ai">Characters AI</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/2131231">404</Link>
        </li>
        <li>
          <Link to="/add-collection">Add Collection</Link>
        </li>
      </ul>
    </nav>
  </div>;
};
