import React from "react";

type Props = {
  // type of the props
};

export const PageNotFound: React.FC<Props> = (props) => {
  console.log(props);
  return <div>404</div>;
};
