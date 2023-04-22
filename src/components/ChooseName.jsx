import { useRef } from "react";

const ChooseName = ({ setName }) => {

    const inputRef = useRef(null);

    const join = (e) => {
        e.preventDefault();
        setName(inputRef.current.value);

    }

    return (

        <form onSubmit={join} className="flex flex-col gap-4 p-8">
            <input type="text" ref={inputRef} className="col-span-3 rounded-full" />
            <button type="submit" className="bg-slate-400 border border-slate-600 rounded-full">Join chat</button>
        </form>

    )

}

export default ChooseName;