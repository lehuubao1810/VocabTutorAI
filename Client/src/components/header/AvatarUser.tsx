import { Avatar } from "@mui/material";

type Props = {
  username: string;
  isClickable?: boolean;
};

export const AvatarUser: React.FC<Props> = (props) => {
  const fontSize = props.isClickable ? "1.25rem" : "2.5rem";
  return (
    <div
      className={`items-center justify-center
      ${
        props.isClickable
          ? "w-10 h-10 cursor-pointer hover:opacity-80 transition duration-300 ease-in-out"
          : "w-20 h-20"
      } `}
    >
      <Avatar
        sx={{
          bgcolor: "#475569",
          width: "100%",
          height: "100%",
          fontSize: fontSize,
        }}
      >
        {props.username[0].toLocaleUpperCase()}
      </Avatar>
    </div>
  );
};
