import React from "react";
import { Pie, Bar, Line } from "react-chartjs-2";
import {
	Chart as ChartJS,
	ArcElement,
	BarElement,
	LineElement,
	Tooltip,
	Legend,
	Title,
	CategoryScale,
	LinearScale,
	PointElement,
} from "chart.js";
import "tailwindcss/tailwind.css";

interface SourceData {
	label: string;
	answerTrue: number;
	answerFalse: number;
}

// Đăng ký các thành phần cần thiết
ChartJS.register(
	ArcElement,
	BarElement,
	LineElement,
	Tooltip,
	Legend,
	Title,
	CategoryScale,
	LinearScale,
	PointElement
);

// Dữ liệu mẫu
const sourceData: SourceData[] = [
	{ label: "Quiz 1", answerTrue: 10, answerFalse: 5 },
	{ label: "Quiz 2", answerTrue: 7, answerFalse: 8 },
	{ label: "Essay 3", answerTrue: 6, answerFalse: 9 },
	{ label: "Quiz 4", answerTrue: 8, answerFalse: 7 },
	{ label: "Essay 5", answerTrue: 12, answerFalse: 3 },
];

export const Stats: React.FC = () => {
	// Chuyển đổi dữ liệu để sử dụng cho biểu đồ
	const labels = sourceData.map((data) => data.label);
	const trueAnswers = sourceData.map((data) => data.answerTrue);
	const falseAnswers = sourceData.map((data) => data.answerFalse);

	const pieData = {
		labels: ["True Answers", "False Answers"],
		datasets: [
			{
				label: "Answers",
				data: [
					trueAnswers.reduce((a, b) => a + b, 0),
					falseAnswers.reduce((a, b) => a + b, 0),
				],
				backgroundColor: ["rgba(75, 192, 192, 0.6)", "rgba(255, 99, 132, 0.6)"],
				borderColor: ["rgba(75, 192, 192, 1)", "rgba(255, 99, 132, 1)"],
				borderWidth: 1,
			},
		],
	};

	const barData = {
		labels: labels,
		datasets: [
			{
				label: "True Answers",
				data: trueAnswers,
				backgroundColor: "rgba(75, 192, 192, 0.6)",
				borderColor: "rgba(75, 192, 192, 1)",
				borderWidth: 1,
			},
			{
				label: "False Answers",
				data: falseAnswers,
				backgroundColor: "rgba(255, 99, 132, 0.6)",
				borderColor: "rgba(255, 99, 132, 1)",
				borderWidth: 1,
			},
		],
	};

	const lineData = {
		labels: labels,
		datasets: [
			{
				label: "True Answers",
				data: trueAnswers,
				fill: false,
				backgroundColor: "rgba(75, 192, 192, 0.6)",
				borderColor: "rgba(75, 192, 192, 1)",
				borderWidth: 1,
			},
			{
				label: "False Answers",
				data: falseAnswers,
				fill: false,
				backgroundColor: "rgba(255, 99, 132, 0.6)",
				borderColor: "rgba(255, 99, 132, 1)",
				borderWidth: 1,
			},
		],
	};

	const options = {
		plugins: {
			title: {
				display: true,
				text: "True vs False Answers",
			},
		},
	};

	return (
		<div
			className="flex justify-center w-full bg-gray-100 gap-5
							max-sm:flex-col"
		>
			<div className="flex flex-col gap-5">
				<div className="max-w-lg h-2/3 bg-white rounded-lg shadow-md p-4">
					<Bar data={barData} options={options} />
				</div>
				<div className="max-w-lg h-2/3 bg-white rounded-lg shadow-md p-4">
					<Line data={lineData} options={options} />
				</div>
			</div>
			<div className=" max-w-sm h-2/3 bg-white rounded-lg shadow-md p-4 mb-6">
				<Pie data={pieData} options={options} />
			</div>
		</div>
	);
};

export default Stats;
