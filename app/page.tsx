"use client";

import { useState } from "react";

const Input = (props: React.InputHTMLAttributes<HTMLInputElement>) => (
  <input
    className="flex-1 px-4 py-2 rounded-full border border-zinc-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
    {...props}
  />
);

const Button = ({
  children,
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button
    className={`bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition ${className}`}
    {...props}
  >
    {children}
  </button>
);

export default function Home() {
  const [messages, setMessages] = useState<{ user: string; text: string }[]>([]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (input.trim() === "") return;
    setMessages([...messages, { user: "You", text: input }]);
    setInput("");
  };

  return (
    <main className="flex flex-col h-screen p-4 bg-gray-100">
      <header className="text-2xl font-bold mb-4 text-center">💬 Minimal Messaging</header>

      <div className="flex-1 overflow-y-auto space-y-2 mb-4 p-2 bg-white rounded-lg shadow-inner">
        {messages.map((msg, i) => (
          <div key={i} className="p-2 rounded bg-blue-100 max-w-sm">
            <span className="font-semibold">{msg.user}:</span> {msg.text}
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2">
        <Input
          type="text"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <Button onClick={sendMessage}>Send</Button>
      </div>
    </main>
  );
}
