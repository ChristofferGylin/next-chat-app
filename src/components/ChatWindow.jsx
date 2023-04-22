import { useRef, useState, useEffect } from "react";
import io from 'socket.io-client'
import { AiOutlineSend } from 'react-icons/ai';
const colors = [
    'bg-purple-500',
    'bg-pink-500',
    'bg-blue-500',
    'bg-yellow-500',
    'bg-cyan-500',
    'bg-red-500',
    'bg-indigo-500',
    'bg-green-500',
    'bg-rose-500',
    'bg-orange-500',
    'bg-amber-500',
    'bg-lime-500',
    'bg-emerald-500',
    'bg-teal-500',
    'bg-sky-500',
    'bg-violet-500',
    'bg-fuchsia-500',
]

let socket;
let color = 0;


const ChatWindow = ({ userName }) => {

    const [messages, setMessages] = useState([]);

    const inputRef = useRef(null);
    const scrollRef = useRef(null);

    const sendMsg = (e) => {
        e.preventDefault();

        if (!inputRef.current.value) {
            return;
        }

        const newMsg = {
            sender: userName,
            message: inputRef.current.value,
            time: Date.now(),
            color
        }
        socket.emit('chat message', newMsg)
        setMessages((oldMsgs) => {

            const newMsgs = [
                ...oldMsgs,
                {
                    ...newMsg,
                    self: true
                }
            ]

            return newMsgs;

        })

        inputRef.current.value = '';

    }

    useEffect(() => { socketInitializer() }, [])
    useEffect(() => { scrollRef.current.scrollIntoView(); }, [messages])

    const socketInitializer = async () => {

        socket = io('http://localhost:8000')

        socket.on('connect', () => {
            console.log('connected')
        })

        socket.on('chat message', msg => {

            setMessages((msgs) => {
                const newMsgs = [
                    ...msgs,
                    msg
                ];

                return newMsgs;
            })

        })

        socket.on('color', colorMsg => {

            color = colorMsg;

        })

        socket.on('connect_error', (err) => {
            console.log('connect error due to:', err.message)
        })
    }

    return (

        <div className="grid grid-rows-[auto_3rem] w-full h-full px-2 pt-2 bg-slate-500">
            <div className="w-full h-full bg-slate-600 rounded-xl shadow-inner shadow-slate-800/30 overflow-hidden">
                <ul className="flex flex-col gap-2 p-2 overflow-auto h-full w-full">
                    {messages.map((msg, index) => {

                        let color = 'bg-slate-500';
                        let align = 'justify-start';
                        let sender = msg.sender;

                        if (msg.self) {

                            color = 'bg-blue-500';
                            align = 'justify-end';
                            sender = '';

                        }

                        let time = new Date(msg.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

                        return (

                            <div key={`msg${index}`} className={`flex w-full ${align}`}>
                                <div className={`flex w-3/4 ${align}`}>
                                    <div className="grid grid-cols-[1rem_auto] items-end gap-4">
                                        {!msg.self && <div className={`flex justify-center items-center w-6 h-6 mb-0.5 text-lg ${colors[msg.color]} text-slate-200 rounded-full`}>{msg.sender[0].toUpperCase()}</div>}
                                        <div className="col-start-2">
                                            <div className="flex justify-between gap-2 text-xs text-slate-300 p-2"><div>{sender}</div><div>{time}</div></div>
                                            <div className={`${color} rounded-xl py-2 px-3 text-slate-100 w-fit shadow shadow-slate-800/30`}>{msg.message}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                    <li ref={scrollRef}></li>
                </ul>

            </div>
            <form onSubmit={sendMsg} className="grid grid-cols-[auto_2rem] items-center gap-2 w-full">
                <input type="text" ref={inputRef} className="rounded-full h-8 px-2 text-slate-700 bg-slate-200 shadow-inner shadow-slate-800/30" />
                <button type="submit" className="flex justify-center items-center text-slate-200 hover:text-slate-50 text-xl w-8 h-8">{<AiOutlineSend />}</button>
            </form>
        </div>
    )
}

export default ChatWindow;