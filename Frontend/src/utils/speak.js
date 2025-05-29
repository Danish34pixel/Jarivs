// export function speakText(text) {
//   console.log(text);
//   if (!window.speechSynthesis || typeof text !== "string" || !text.trim())
//     return;

//   const speak = () => {
//     const utterance = new SpeechSynthesisUtterance(text);

//     const voices = window.speechSynthesis.getVoices();
//     const voice =
//       voices.find((v) => v.lang === "en-US" && v.name.includes("Google")) ||
//       voices[0];
//     if (voice) utterance.voice = voice;

//     utterance.pitch = 1;
//     utterance.rate = 1;
//     utterance.volume = 1;

//     console.log("Speaking:", text);
//     window.speechSynthesis.speak(utterance);
//   };

//   // Some browsers need voices to load async
//   if (window.speechSynthesis.getVoices().length === 0) {
//     window.speechSynthesis.onvoiceschanged = () => {
//       speak();
//     };
//   } else {
//     speak();
//   }
// }
export function speakText(text, onEnd) {
  console.log(text);
  if (!window.speechSynthesis || typeof text !== "string" || !text.trim())
    return;

  const speak = () => {
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);

    const voices = window.speechSynthesis.getVoices();
    const voice =
      voices.find((v) => v.lang === "en-US" && v.name.includes("Google")) ||
      voices.find((v) => v.lang === "en-US") ||
      voices[0];
    if (voice) utterance.voice = voice;

    utterance.pitch = 1;
    utterance.rate = 1;
    utterance.volume = 1;

    utterance.onend = () => {
      console.log("Speech finished.");
      if (onEnd) onEnd();
    };

    // console.log("Speaking:", text, "with voice:", voice?.name);
    window.speechSynthesis.speak(utterance);
  };

  if (window.speechSynthesis.getVoices().length === 0) {
    window.speechSynthesis.onvoiceschanged = () => {
      speak();
    };
  } else {
    speak();
  }
}
