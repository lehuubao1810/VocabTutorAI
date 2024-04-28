import React from "react";
import { Nav } from "../components/Nav";
import { Loading } from "../components/Loading";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";

import { setLoading } from "../redux/authSlice";

type Props = {
  // type of the props
};

export const Home: React.FC<Props> = (props) => {
  console.log(props);

  const loading = useSelector((state: RootState) => state.loading);
  const dispatch = useDispatch();
    
  return <div>
    <Nav/>
    <button
    className="p-2 bg-blue-500 text-white rounded-lg"
    type="button"
        onClick={(e) => {
            e.preventDefault();
            dispatch(setLoading(true))
        }}
    >Loading</button>
    {loading && <Loading/>}
  </div>;
};
