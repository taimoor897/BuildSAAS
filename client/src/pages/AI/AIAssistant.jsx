import { useState, useRef, useEffect } from "react";
import {
  Send,
  Bot,
  User,
  Mic,
  Volume2,
  VolumeX,
} from "lucide-react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { sendMessage } from "../services/aiService";

export default function AIAssistant() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "👋 Hello! I'm BuildPilot AI. Ask me anything about construction, budgets, materials, workers or your projects.",
    },
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [listening, setListening] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);

  const bottomRef = useRef();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);


  const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = SpeechRecognition
  ? new SpeechRecognition()
  : null;

if (recognition) {
  recognition.continuous = false;
  recognition.interimResults = false;
  recognition.lang = "en-US";
}




const startListening = () => {
  if (!recognition) {
    alert("Speech Recognition is not supported in this browser.");
    return;
  }

  setListening(true);

  recognition.start();

  recognition.onresult = (event) => {
  const transcript = event.results[0][0].transcript;

  setInput(transcript);
  setListening(false);

  setTimeout(() => {
    handleSend(transcript);
  }, 300);
};

  recognition.onerror = () => {
    setListening(false);
  };

  recognition.onend = () => {
    setListening(false);
  };
};


const speak = (text) => {
  if (!voiceEnabled) return;

  if (!("speechSynthesis" in window)) return;

  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);

  utterance.lang = "en-US";
  utterance.rate = 1;
  utterance.pitch = 1;
  utterance.volume = 1;

  const voices = window.speechSynthesis.getVoices();

  const voice =
    voices.find(
      (v) => v.lang.startsWith("en") && v.name.includes("Google")
    ) ||
    voices.find((v) => v.lang.startsWith("en")) ||
    voices[0];

  if (voice) {
    utterance.voice = voice;
  }

  window.speechSynthesis.speak(utterance);
};

  const handleSend = async (voiceMessage = null) => {
  const question = voiceMessage || input;

  if (!question.trim()) return;

  window.speechSynthesis.cancel();

  setMessages((prev) => [
    ...prev,
    {
      role: "user",
      content: question,
    },
  ]);

  if (!voiceMessage) {
    setInput("");
  }

  setLoading(true);

  try {
    const reply = await sendMessage(question);

    setMessages((prev) => [
      ...prev,
      {
        role: "assistant",
        content: reply,
      },
    ]);

    speak(reply);
  } catch (err) {
    console.error(err);

    setMessages((prev) => [
      ...prev,
      {
        role: "assistant",
        content: "Something went wrong while contacting the AI.",
      },
    ]);
  } finally {
    setLoading(false);
  }
};

  return (
   <DashboardLayout>
  <div className="flex h-[85vh] flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl">

    {/* Header */}

    <div className="flex items-center justify-between border-b bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6 text-white">

      <div className="flex items-center gap-4">

        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 backdrop-blur">
          <Bot size={30} />
        </div>

        <div>
          <h1 className="text-3xl font-bold">
            BuildPilot AI
          </h1>

          <p className="text-blue-100">
            Your intelligent construction assistant
          </p>
        </div>

      </div>

      <button
        onClick={() => setVoiceEnabled(!voiceEnabled)}
        className="rounded-xl bg-white/20 p-3 transition hover:bg-white/30"
      >
        {voiceEnabled ? <Volume2 size={22} /> : <VolumeX size={22} />}
      </button>

    </div>

    {/* Messages */}

    <div className="flex-1 overflow-y-auto bg-slate-50 p-8">

      <div className="space-y-6">

        {messages.map((msg, index) => (

          <div
            key={index}
            className={`flex ${
              msg.role === "user"
                ? "justify-end"
                : "justify-start"
            }`}
          >

            <div
              className={`max-w-3xl rounded-3xl px-6 py-5 shadow ${
                msg.role === "assistant"
                  ? "bg-white"
                  : "bg-blue-600 text-white"
              }`}
            >

              <div className="mb-3 flex items-center gap-3">

                <div
                  className={`flex h-9 w-9 items-center justify-center rounded-full ${
                    msg.role === "assistant"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-white/20"
                  }`}
                >
                  {msg.role === "assistant" ? (
                    <Bot size={18} />
                  ) : (
                    <User size={18} />
                  )}
                </div>

                <span className="font-semibold">
                  {msg.role === "assistant"
                    ? "BuildPilot AI"
                    : "You"}
                </span>

              </div>

              <p className="whitespace-pre-wrap leading-8">
                {msg.content}
              </p>

            </div>

          </div>

        ))}

        {loading && (

          <div className="flex">

            <div className="rounded-3xl bg-white px-6 py-5 shadow">

              <div className="mb-3 flex items-center gap-3">

                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-blue-700">
                  <Bot size={18} />
                </div>

                <span className="font-semibold">
                  BuildPilot AI
                </span>

              </div>

              <div className="flex gap-2">

                <span className="h-3 w-3 animate-bounce rounded-full bg-blue-600"></span>
                <span className="h-3 w-3 animate-bounce rounded-full bg-blue-600 [animation-delay:150ms]"></span>
                <span className="h-3 w-3 animate-bounce rounded-full bg-blue-600 [animation-delay:300ms]"></span>

              </div>

            </div>

          </div>

        )}

        <div ref={bottomRef} />

      </div>

    </div>

    {/* Input */}

    <div className="border-t bg-white p-6">

      <div className="flex items-center gap-4">

        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSend();
            }
          }}
          placeholder="Ask BuildPilot AI anything..."
          className="flex-1 rounded-2xl border border-slate-300 px-6 py-4 outline-none transition focus:border-blue-600"
        />

        <button
          onClick={startListening}
          className={`rounded-2xl p-4 transition ${
            listening
              ? "bg-red-600 text-white"
              : "bg-slate-100 hover:bg-slate-200"
          }`}
        >
          <Mic size={22} />
        </button>

        <button
          onClick={handleSend}
          disabled={loading}
          className="rounded-2xl bg-blue-600 p-4 text-white transition hover:bg-blue-700 disabled:opacity-50"
        >
          <Send size={22} />
        </button>

      </div>

    </div>

  </div>
</DashboardLayout>
  );
}