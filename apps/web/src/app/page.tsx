'use client'

import React, { use, useEffect, useRef, useState } from 'react'
import { connectWS } from '../config/ws';
import { Socket } from 'socket.io-client';

// const messages = [
//   {
//     id: "1",
//     sender: "Elysia",
//     text: "Hello! How are you?",
//     ts: 1715935800000,
//   },
//   {
//     id: "2",
//     sender: "You",
//     text: "I'm good, thanks! How about you?",
//     ts: 1715935860000,
//   },
//   {
//     id: "3",
//     sender: "Elysia",
//     text: "I'm doing great! Are we still on for the meeting tomorrow?",
//     ts: 1715935920000,
//   },
//   {
//     id: "4",
//     sender: "You",
//     text: "Yes, definitely. See you tomorrow!",
//     ts: 1715935980000,
//   },
// ];

const Page = () => {
  const socket = useRef<Socket | null>(null);
  const [inputName, setInputName] = useState("")
  const [userName, setUserName] = useState("")
  const [text, setText] = useState("")
  const [messages, setmessages] = useState([])

  const [showNamePopup, setShowNamePopup] = useState<boolean>(true)



  useEffect(() => {
    socket.current = connectWS();
    socket.current.on("connect", () => {


    })
  }, [])

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const handleNameSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputName.trim()) return

    setUserName(inputName)

    console.log("huv:", inputName)

    socket.current?.emit("joinRoom", inputName)

    setShowNamePopup(false)
  }
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage()
    }
  };

  const sendMessage = () => {
    if (!text.trim()) return
    console.log("Message sent:", text);
    setText("")
  }

  return (
    <main>
      <div className='min-h-screen flex items-center justify-center bg-[#e5ddd5] p-4'>

        {/* NAME POPUP */}
        {showNamePopup && (
          <div className="fixed inset-0 flex items-center justify-center z-40 bg-black/30">
            <div className="bg-white rounded-xl shadow-lg max-w-md p-6">
              <h1 className="text-xl font-semibold text-black">Enter your name</h1>
              <form onSubmit={handleNameSubmit} className='mt-4'>
                <input
                  type="text"
                  placeholder="Your name"
                  className="w-full border rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-green-500"
                  autoFocus
                  value={inputName}
                  onChange={(e) => setInputName(e.target.value)}
                />
                <button
                  type='submit'
                  className='block ml-auto mt-3 px-4 py-1.5 rounded-full bg-green-500 text-white hover:bg-green-600'>
                  Continue
                </button>
              </form>
            </div>
          </div>
        )}

        {/* CHAT UI */}
        {!showNamePopup && (
          <div className='w-full max-w-2xl h-[90vh] bg-white rounded-xl shadow-md flex flex-col overflow-hidden'>

            {/* HEADER */}
            <div className="flex items-center gap-3 px-4 py-3 bg-[#075E54] text-white">
              <div className="h-10 w-10 rounded-full bg-white text-[#075E54] flex items-center justify-center font-bold">
                {userName[0]}
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium">Realtime Chat</div>
                <div className="text-xs opacity-80">online</div>
              </div>
              <div className="text-xs">
                {userName}
              </div>
            </div>

            {/* MESSAGES */}
            <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-[#e5ddd5] flex flex-col">
              {messages.map((m) => {
                const mine = m.sender === userName;

                return (
                  <div
                    key={m.id}
                    className={`flex ${mine ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[75%] p-3 rounded-lg text-sm shadow ${mine
                        ? "bg-[#dcf8c6] rounded-br-none"
                        : "bg-white rounded-bl-none"
                        }`}
                    >
                      <div className="whitespace-pre-wrap">{m.text}</div>

                      <div className="text-[10px] text-gray-500 text-right mt-1">
                        {formatTime(m.ts)}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* INPUT */}
            <div className="px-3 py-2 bg-[#f0f0f0] flex items-center gap-2">
              <textarea
                rows={1}
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder='Type a message'
                className='flex-1 resize-none px-4 py-2 rounded-full outline-none text-sm'
              />
              <button
                onClick={sendMessage}
                className='bg-[#075E54] text-white px-4 py-2 rounded-full'>
                Send
              </button>
            </div>

          </div>
        )}
      </div>
    </main>
  )
}

export default Page