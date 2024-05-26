import { faVolumeDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";

type Props = {
  text: string;
};

const TextToSpeech: React.FC<Props> = ({ text }) => {
  const [utterance, setUtterance] = useState<SpeechSynthesisUtterance | null>(
    null
  );
  const [voiceUS, setVoiceUS] = useState<SpeechSynthesisVoice | null>(null);
  const [voiceUK, setVoiceUK] = useState<SpeechSynthesisVoice | null>(null);

  useEffect(() => {
    const synth = window.speechSynthesis;
    const u = new SpeechSynthesisUtterance(text);
    setUtterance(u);

    const handleVoicesChanged = () => {
      const voices = synth.getVoices();
      if (voices.length > 0) {
        setVoiceUS(voices[5]);
        setVoiceUK(voices[7]);
      }
    };

    synth.addEventListener("voiceschanged", handleVoicesChanged);
    handleVoicesChanged(); // Call it initially to load voices

    return () => {
      synth.removeEventListener("voiceschanged", handleVoicesChanged);
    };
  }, [text]);

  const handlePlayUS = () => {
    if (utterance && voiceUS) {
      utterance.voice = voiceUS;
      window.speechSynthesis.speak(utterance);
    } else {
      alert("Voice or utterance is not available");
    }
  };

  const handlePlayUK = () => {
    if (utterance && voiceUK) {
      utterance.voice = voiceUK;
      window.speechSynthesis.speak(utterance);
    } else {
      alert("Voice or utterance is not available");
    }
  };

  // const handleVoiceChange = (event) => {
  //   const selectedVoice = voices.find((v) => v.name === event.target.value);
  //   setVoice(selectedVoice || null);
  // };

  return (
    <div className="flex gap-4">
      <div className="flex items-center gap-2">
        <div
          className="w-10 h-10 flex justify-center items-center rounded-full text-gray-500 bg-slate-200 cursor-pointer hover:bg-slate-300"
          onClick={(e) => {
            e.stopPropagation();
            handlePlayUK();
          }}
        >
          <FontAwesomeIcon icon={faVolumeDown} />
        </div>
        <p className="font-bold">UK</p>
      </div>
      <div className="flex items-center gap-2">
        <div
          className="w-10 h-10 flex justify-center items-center rounded-full text-gray-500 bg-slate-200 cursor-pointer hover:bg-slate-300"
          onClick={(e) => {
            e.stopPropagation();
            handlePlayUS();
          }}
        >
          <FontAwesomeIcon icon={faVolumeDown} />
        </div>
        <p className="font-bold">US</p>
      </div>
    </div>
  );
};

export default TextToSpeech;
