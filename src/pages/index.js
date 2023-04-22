import ChatWindow from '@/components/ChatWindow';
import ChooseName from '@/components/ChooseName';
import { useState } from 'react'



const Home = () => {

  const [name, setName] = useState(null);

  return (
    <div className='text-slate-900 h-screen'>
      {!name && <ChooseName setName={setName} />}
      {name && <ChatWindow userName={name} />}
    </div>

  )
}

export default Home;