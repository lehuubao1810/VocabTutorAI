import {
	faFacebook,
	faInstagram,
	faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

type FooterProps = {};

const FooterList: React.FC<{
	title: string;
	items: { to: string; label: string }[];
}> = ({ title, items }) => {
	return (
		<div className="flex flex-col gap-6">
			<h3 className="text-xl">{title}</h3>
			<ul className="flex flex-col gap-2">
				{items.map((item, index) => (
					<li key={index}>
						<Link to={item.to} className="hover:text-blue-500">
							{item.label}
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
};

const Footer: React.FC<FooterProps> = () => {
	const navigate = useNavigate();
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log("submit");
	};

	const homeLinks = [
		{ to: "/", label: "Home" },
		{ to: "/learn", label: "Learn" },
		{ to: "/about", label: "Character AI" },
		{ to: "/about", label: "About" },
	];

	const collectionLinks = [
		{ to: "#!", label: "Collection" },
		{ to: "#!", label: "Learn" },
	];

	const characterAILinks = [
		{ to: "/character-ai", label: "Character AI" },
		{ to: "#!", label: "Room AI" },
	];

	return (
		<footer className="bg-gray-800 text-white">
			<div className=" ml-auto mr-auto max-w-screen-xl px-5 py-20 max-md:py-10">
				<div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
					<div className="flex flex-col gap-4">
						{/* Logo */}
						<h1
							className="text-2xl font-bold text-cyan-500 cursor-pointer"
							onClick={() => {
								navigate("/");
							}}
						>
							TutorAI.
						</h1>
						{/* Form nhập email */}
						<form onSubmit={handleSubmit}>
							<input
								type="email"
								name="email"
								id="email"
								placeholder="Type your email"
								className="bg-gray-900 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 sm:max-w-40  "
							/>
							<button
								type="submit"
								className="bg-blue-500 text-white px-4 py-2 rounded-md mt-2"
							>
								Đăng ký
							</button>
						</form>
					</div>
					{/* Link trang web */}
					<FooterList title="Home page" items={homeLinks} />
					<FooterList title="Collection" items={collectionLinks} />
					<FooterList title="Character AI" items={characterAILinks} />
					{/* Social media */}
					<div className="flex flex-col gap-4">
						<h3 className="text-xl">Social Media</h3>
						<div className="flex gap-4">
							<a href="!#" className="text-white hover:text-blue-500">
								<FontAwesomeIcon icon={faFacebook} />
							</a>
							<a href="!#" className="text-white hover:text-blue-500">
								<FontAwesomeIcon icon={faInstagram} />
							</a>
							<a href="!#" className="text-white hover:text-blue-500">
								<FontAwesomeIcon icon={faTwitter} />
							</a>
							<a href="!#" className="text-white hover:text-blue-500">
								<FontAwesomeIcon icon={faInstagram} />
							</a>
						</div>
					</div>
				</div>
				{/* Copyright */}
				<div className="mt-8 text-center">
					<p>
						&copy; {new Date().getFullYear()} VocabTutor. All rights reserved.
					</p>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
