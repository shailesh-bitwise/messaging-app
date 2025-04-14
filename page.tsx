"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Paperclip, Send, Image, Users } from "lucide-react";
import { motion } from "framer-motion";

const messagesMock = [
  { id: 1, text: "Hey team!", sender: "Alice", time: "09:00 AM", avatar: "A" },
  { id: 2, text: "Hello! Ready for the meeting?", sender: "Bob", time: "09:01 AM", avatar: "B" },
  { id: 3, text: "Yep! Just grabbing coffee.", sender: "Alice", time: "09:02 AM", avatar: "A" }
];

export default function MessagingApp() {
  const [messages, setMessages] = useState(messagesMock);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (input.trim()) {
      const now = new Date();
      const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      setMessages([...messages, {
        id: messages.length + 1,
        text: input,
        sender: "You",
        time,
        avatar: "Y"
      }]);
      setInput("");
    }
  };

  return (
    <main className="min-h-screen bg-zinc-100 p-4 grid grid-rows-[auto_1fr_auto] md:max-w-2xl mx-auto">
      <header className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-semibold">Group Chat</h1>
        <Button variant="ghost" className="text-zinc-500">
          <Users className="w-5 h-5 mr-1" /> Members
        </Button>
      </header>

      <section className="space-y-3 overflow-y-auto pb-4">
        {messages.map((msg) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, x: msg.sender === "You" ? 10 : -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2 }}
            className={`flex ${msg.sender === "You" ? "justify-end" : "justify-start"}`}
          >
            <div className="flex gap-2 max-w-[80%]">
              {msg.sender !== "You" && (
                <div className="w-8 h-8 rounded-full bg-zinc-300 text-xs flex items-center justify-center font-semibold">
                  {msg.avatar}
                </div>
              )}
              <Card className={`rounded-2xl px-4 py-2 ${msg.sender === "You" ? "bg-blue-500 text-white" : "bg-white"}`}>
                <CardContent className="p-0">
                  <div className="text-sm font-medium mb-1 flex justify-between">
                    <span>{msg.sender}</span>
                    <span className="text-xs text-zinc-400 ml-2">{msg.time}</span>
                  </div>
                  <p className="text-base leading-snug">{msg.text}</p>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        ))}
      </section>

      <footer className="flex items-center gap-2 mt-4 bg-white p-2 rounded-xl shadow-md sticky bottom-0">
        <Button variant="ghost" size="icon"><Paperclip className="w-5 h-5" /></Button>
        <Button variant="ghost" size="icon"><Image className="w-5 h-5" /></Button>
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 rounded-full px-4"
        />
        <Button size="icon" onClick={sendMessage}>
          <Send className="w-5 h-5" />
        </Button>
      </footer>
    </main>
  );
}
