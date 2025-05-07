/* eslint-disable react/prop-types */

import { useState, useRef } from "react";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function TextForm({ heading, mode }) {
  const [text, setText] = useState("");
  const [showButton, setShowButton] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const textRef = useRef(null);

  const handleUpClick = () => {
    if (text.trim()) {
      setText(text.toUpperCase());
      setShowButton(true);
    }
  };

  const handleLoClick = () => {
    if (text.trim()) {
      setText(text.toLowerCase());
      setShowButton(true);
    }
  };

  const textSpeak = () => {
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    } else {
      if (text.trim()) {
        const msg = new SpeechSynthesisUtterance(text);
        msg.onend = () => setIsSpeaking(false);
        window.speechSynthesis.speak(msg);
        setIsSpeaking(true);
      }
    }
  };

  const clearText = () => {
    setText("");
    setShowButton(false);
  };

  const handleCopy = () => {
    if (text.trim()) {
      textRef.current?.select();
      window.navigator.clipboard.writeText(text);
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setText(value);

    setShowButton(value.trim() !== "");
  };

  return (
    <>
      <div className="my-6 max-w-3xl mx-auto">
        <h1
          className={`text-left text-${mode === "light" ? "black" : "white"} text-3xl font-semibold mb-4`}
        >
          {heading}
        </h1>
        <textarea
          value={text}
          className={`block w-full p-4 rounded-md border ${mode === "light" ? "bg-gray-50 text-gray-900" : "bg-gray-800 text-white"
            } outline-none focus:border-blue-500 shadow-md`}
          onChange={handleChange}
          rows={6}
          id="myBox"
          placeholder="Enter text here"
          ref={textRef}
        ></textarea>
        <div className="mt-3 flex flex-wrap gap-2">
          <button
            disabled={text.length === 0}
            className="rounded-md py-2 px-4 bg-blue-600 text-white shadow-md hover:bg-blue-700"
            onClick={handleUpClick}
          >
            Convert to UpperCase
          </button>
          <button
            disabled={text.length === 0}
            className="rounded-md py-2 px-4 bg-blue-600 text-white shadow-md hover:bg-blue-700"
            onClick={handleLoClick}
          >
            Convert to LowerCase
          </button>
          {showButton && (
            <button disabled={text.length === 0} onClick={handleCopy} className="text-blue-500 text-2xl">
              <FontAwesomeIcon icon={faCopy} />
            </button>
          )}
          <button
            disabled={text.length === 0}
            className={`rounded-md py-2 px-4 ${isSpeaking ? "bg-gray-600" : "bg-green-600"
              } text-white shadow-md hover:bg-green-700`}
            onClick={textSpeak}
          >
            {isSpeaking ? "Stop" : "Speak"}
          </button>
          <button
            disabled={text.length === 0}
            className="rounded-md py-2 px-4 bg-red-600 text-white shadow-md hover:bg-red-700"
            onClick={clearText}
          >
            Clear
          </button>
        </div>
      </div>
      <div className={`my-6 max-w-3xl mx-auto text-${mode === "light" ? "black" : "white"}`}>
        <h2 className="text-xl font-semibold">Your Text Summary</h2>
        <p className="text-sm mt-2">
          {(text && text.split(/\s+/).filter((ele) => { return ele.length !== 0 }).length) || 0} Words | {text && text.trim().length || 0} Characters |{" "}
          {(text && text.split(".").length - 1) || 0} Sentences
        </p>
        <p className="text-sm">
          {(text && (0.08 * text.split(/\s+/).filter((ele) => { return ele.length !== 0 }).length).toFixed(2)) || "0.00"} minutes read
        </p>
        <h3 className="text-xl font-semibold mt-4">Preview</h3>
        <p className="text-sm mt-2">
          {text.length > 0 ? text : "Nothing to preview !"}
        </p>
      </div>
    </>
  );
}
