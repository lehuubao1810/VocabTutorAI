import React, { useState, useEffect } from "react";

type Props = {
	text: string;
	isMuted: boolean;
};

const SpeechAuto: React.FC<Props> = ({ text, isMuted }) => {
	const [utterance, setUtterance] = useState<SpeechSynthesisUtterance | null>(
		null
	);
	const [voice, setVoice] = useState<SpeechSynthesisVoice | null>(null);

	useEffect(() => {
		const synth = window.speechSynthesis;
		const u = new SpeechSynthesisUtterance(text);
		setUtterance(u);

		const handleVoicesChanged = () => {
			const voices = synth.getVoices();
			if (voices.length > 0) {
				setVoice(voices.find((v) => v.lang === "en-US") || voices[0]);
			}
		};

		synth.addEventListener("voiceschanged", handleVoicesChanged);
		handleVoicesChanged(); // Call it initially to load voices

		return () => {
			synth.removeEventListener("voiceschanged", handleVoicesChanged);
		};
	}, [text]);

	useEffect(() => {
		if (!isMuted && utterance && voice) {
			utterance.voice = voice;
			window.speechSynthesis.speak(utterance);
		}
	}, [text, isMuted, utterance, voice]);

	return null; // This component does not render anything
};

export default SpeechAuto;
