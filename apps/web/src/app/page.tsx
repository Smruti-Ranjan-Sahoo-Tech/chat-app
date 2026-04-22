'use client'

import React, { useState } from 'react'
import { text } from 'stream/consumers';


const messages = [
  {
    id: "1",
    sender: "Elysia",
    text: "Hello! How are you?",
    ts: 1715935800000,
  },
  {
    id: "2",
    sender: "You",
    text: "I'm good, thanks! How about you?",
    ts: 1715935860000,
  },
  {
    id: "3",
    sender: "Elysia",
    text: "I'm doing great! Are we still on for the meeting tomorrow?",
    ts: 1715935920000,
  },
  {
    id: "4",
    sender: "You",
    text: "Yes, definitely. See you tomorrow!",
    ts: 1715935980000,
  },
];

const page = () => {
  const [inputName, setInputName] = useState<string>("")
  const [userName, setUserName] = useState<string>("Guest")

  const [text, setText] = useState<string>("")
  const showNamePopup: boolean = false
  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };
  const handleNameSubmit = () => {
    console.log("Name submitted")
  }
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      console.log("Message sent:", text);
      setText("");
    }
  };
  const sendMessage=()=>{
    console.log("Message sent:", text);
  }
  return (
    <main>
      <div className='min-h-screen  flex items-center justify-center  bg-zinc-100 p-4 font-inter'>
        {
          showNamePopup && (
            <div className="fixed inset-0 flex items-center justify-center z-40">
              <div className="bg-white rounded-xl shadow-lg max-w-md p-6">
                <h1 className="text-xl font-semibold text-black">
                  Enter your name
                </h1>
                <p className="text-sm text-gray-500 mt-1">
                  Enter your name to start chatting . This will be used to identify
                </p>
                <form onSubmit={handleNameSubmit} className='mt-4'>
                  <input type="text" placeholder="Your name (e.g. John Carter)" className="w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-green-500"
                    autoFocus
                    value={inputName}
                    onChange={(e) => setInputName(e.target.value)}

                  />
                  <button
                    type='submit'
                    className='block ml-auto mt-3 px-4 py-1.5 rounded-full bg-green-500 text-white font-medium hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2'>
                    Continue
                  </button>
                </form>

              </div>
            </div>
          )
        }
        {
          !showNamePopup && (
            <div className='w-full max-w-2xl h-[90vh] bg-white rounded-xl shadow-md flex flex-col overflow-hidden '>
              {/* chat header */}
              <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-200">
                <div className="h-10 w-10 rounded-full bg-[#e0d9d9] flex items-center justify-center text-2xl">
                  R
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-[#303030]">
                    Realtime group chat
                  </div>
                  <div className="text-xs text-gray-500">
                    Someone is typing...
                  </div>
                </div>
                <div className="text-sm text-gray-500 ">
                  Signed in as{' '}
                  <span className="font-medium text-gray-900 capitalize">{userName}</span>
                </div>
              </div>
              {/* CHAT MESSAGE LIST */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-zinc-100 flex flex-col">
                {messages.map((m) => {
                  const mine = m.sender === userName;

                  return (
                    <div
                      key={m.id}
                      className={`flex ${mine ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[78%] p-3 my-2 rounded-[18px] text-sm leading-5 shadow-sm ${mine
                          ? "bg-[#DCF8C6] text-[#303030] rounded-br-2xl"
                          : "bg-white text-[#303030] rounded-bl-2xl"
                          }`}
                      >
                        <div className="break-words whitespace-pre-wrap">
                          {m.text}
                        </div>

                        <div className="flex justify-between items-center mt-1 gap-16">
                          <div className="text-[11px] font-bold">{m.sender}</div>
                          <div className="text-[11px] text-gray-500 text-right">
                            {formatTime(m.ts)}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              {/* chat text area */}
              <div className="px-4 py-3 border-t border-gray-200 rounded-full">
                <textarea rows={1}
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder='Type a message...'
                  className='w-full resize-none px-4 py-4 text-sm outline-none'
                />
                <button
                  onClick={sendMessage}
                  className='block ml-auto mt-3 px-4 py-1.5 rounded-full bg-green-500 text-white font-medium hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2'>
                  Send Message
                </button>

              </div>
            </div>
          )
        }
      </div>
    </main>
  )
}

export default page