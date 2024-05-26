import { NavLink } from "react-router-dom";

type Props = {
	// type of the props
};

export const Nav: React.FC<Props> = (props) => {
	console.log(props);
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
			to: "/explore",
			text: "Explore",
		},
	];
	return (
		<ul className="flex gap-4 items-center lg:gap-8">
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
	);
};
