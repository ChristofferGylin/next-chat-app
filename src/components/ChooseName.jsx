import { useRef } from "react";

const ChooseName = ({ setName }) => {

    const inputRef = useRef(null);

    const join = (e) => {
        e.preventDefault();
        setName(inputRef.current.value);

    }

    return (
        <div className="flex justify-center items-center w-full h-full px-2 pt-2 bg-slate-500">

            <form onSubmit={join} className="flex flex-col gap-4 p-8 w-5/6 max-w-[400px] bg-slate-600 rounded-xl shadow-lg shadow-slate-800/30 text-slate-200">
                <h1 className="text-3xl text-center mb-2">Pick a name</h1>
                <input type="text" ref={inputRef} className="rounded-full h-8 px-2 text-slate-700 bg-slate-200 shadow-inner shadow-slate-800/30" />

                <button type="submit" className="bg-slate-700 hover:bg-slate-800 hover:text-slate-50 rounded-full p-1">Join chat</button>
            </form>
        </div>


    )

}

export default ChooseName;