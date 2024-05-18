import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { debounce } from "lodash";
import { translateText } from "../../redux/dictionarySlice";
import { CircularProgress } from "@mui/material";

type Props = {
	//
};

export const TranslateInput: React.FC<Props> = () => {
	const dictionary = useAppSelector((state) => state.dictionaryReducer);
	const dispatch = useAppDispatch();

	// debounce translate
	const [textTranslate, setTextTranslate] = useState("");
	const [language, setLanguage] = useState("en"); // default is English [en]
	const [loadingTranslate, setLoadingTranslate] = useState(false);
	// Sử dụng hàm debounce để tạo một phiên bản mới của hàm xử lý sự kiện với trễ 300ms
	const debounceRef = useRef(
		debounce((value, language) => {
			console.log(`Sending translation request for: ${language} `, value);
			// Gọi dispatch ở đây
			dispatch(translateText({ text: value, language }))
				.unwrap()
				.then((res) => {
					console.log("Translate success", res);
					setLoadingTranslate(false);
				});
		}, 800) // 800ms delay
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
		debounceRef.current(value, language);
	};

	useEffect(() => {
		console.log("language", language);
	}, [language]);

	return (
		<div className="">
			<div className="relative">
				<input
					type="text"
					placeholder="Type the word or sentence to translate ..."
					className="border border-slate-300 rounded-3xl py-2 px-4 bg-slate-100 w-full outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
					value={textTranslate}
					onChange={(e) => handleTextTranslate(e)}
				/>
				<div className="absolute right-1 top-1/2 transform -translate-y-1/2 flex gap-2">
					{/* clear text */}
					{textTranslate.trim() !== "" && (
						<div
							className="cursor-pointer  
            p-1 px-[11px] rounded-full hover:bg-slate-200 group "
							onClick={() => setTextTranslate("")}
						>
							<i className="fas fa-times text-slate-500 group-hover:text-blue-500"></i>
						</div>
					)}
					<div
						className="rounded-full bg-slate-300 py-[7px] px-[12px] group cursor-pointer"
						onClick={() => setLanguage(language === "en" ? "vi" : "en")}
					>
						<p className="text-slate-500 group-hover:text-blue-500 text-sm font-bold">
							{language === "en" ? "Tiếng Việt" : "English"}
						</p>
					</div>
				</div>
			</div>

			{textTranslate.trim() !== "" && (
				<div className="absolute top-20 left-auto w-3/5 bg-white shadow-lg rounded-lg p-4 pt-2">
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
	);
};
