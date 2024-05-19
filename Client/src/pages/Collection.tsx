import React, { useEffect } from "react";
import { Header } from "../components/header/Header";
import Footer from "../components/footer/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faCalendar,
	faShareFromSquare,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useParams } from "react-router-dom";
import { VocabularyFlipCard } from "../components/vocabulary/VocabularyCard";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { getCollectionById } from "../redux/collectionSlice";
import { Skeleton } from "@mui/material";

type Props = {
	//
};

export const Collection: React.FC<Props> = () => {
	const dispatch = useAppDispatch();

	const { collection } = useAppSelector((state) => state.collectionReducer);

	const { idCollection } = useParams();

	useEffect(() => {
		dispatch(getCollectionById(idCollection ?? ""));
	}, []);

	return (
		<>
			<Header />
			<main className="bg-gray-100">
				<div
					className="pt-20 ml-auto mr-auto max-w-screen-xl px-20 py-4
                          max-sm:pt-16 max-sm:px-5"
				>
					{!collection.name ? (
						<div>
							<Skeleton
								variant="rounded"
								width={"20%"}
								height={30}
								sx={{ marginY: 2 }}
							/>
							<Skeleton
								variant="rounded"
								width={"40%"}
								height={30}
								sx={{ marginY: 2 }}
							/>
							<div className="flex justify-between">
								<Skeleton
									variant="rounded"
									width={"45%"}
									height={50}
									sx={{ marginY: 1 }}
								/>
								<Skeleton
									variant="rounded"
									width={"45%"}
									height={50}
									sx={{ marginY: 1 }}
								/>
							</div>
						</div>
					) : (
						<>
							<div className="px-4 py-6">
								<h1 className="text-3xl font-bold">{collection.name}</h1>
								<p
									className="text-xl font-semibold text-gray-600 pt-4 pb-2 px-5 
                                max-sm:px-1"
								>
									{collection.desc}
								</p>
								{/* When add data date, delete hidden  */}
								<span className="hidden text-lg font-semibold px-5">
									<FontAwesomeIcon icon={faCalendar} /> {collection.date}
								</span>
							</div>
							<div
								className="flex justify-between items-center gap-8
                                max-sm:flex-col max-sm:gap-1"
							>
								<Link
									to={`/collection/${collection.id}/learn`}
									state={collection.vocabulary}
									className="w-full h-12 rounded-md border-2 pt-2 text-lg text-center font-semibold bg-white hover:bg-gray-300"
								>
									Learn vocabulary
								</Link>
								<button className="w-full h-12 rounded-md border-2 text-lg font-semibold bg-blue-400 text-white hover:bg-blue-300">
									Share this vocabulary
									<FontAwesomeIcon icon={faShareFromSquare} className="ml-3" />
								</button>
							</div>
						</>
					)}
					{!collection.vocabulary ? (
						<div>
							<Skeleton
								variant="rounded"
								width={"100%"}
								height={300}
								sx={{ marginY: 5 }}
							/>
							<Skeleton
								variant="rounded"
								width={"100%"}
								height={100}
								sx={{ marginY: 2 }}
							/>
							<Skeleton
								variant="rounded"
								width={"100%"}
								height={100}
								sx={{ marginY: 2 }}
							/>
							<Skeleton
								variant="rounded"
								width={"100%"}
								height={100}
								sx={{ marginY: 2 }}
							/>
							<Skeleton
								variant="rounded"
								width={"100%"}
								height={100}
								sx={{ marginY: 2 }}
							/>
						</div>
					) : (
						<div className="mt-5">
							{/* Flip card */}
							<VocabularyFlipCard Data={collection} />
						</div>
					)}
				</div>
			</main>
			<Footer />
		</>
	);
};
