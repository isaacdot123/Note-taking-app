import NavBar from './components/navbar';
import {useState, useEffect} from 'react'
import RateLimit from './components/RateLimit';
import toast from "react-hot-toast";
import NoteCard from './NoteCard';
import api from '../lib/axios'
import NotesNotFound
 from './components/NotesNotFound';


const HomePage = () => {

    const [isRateLimit, setIsRateLimit] = useState(false);
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("No Error");

    useEffect(() => {
        const fetchNotes = async () => {
            try{
                const response = await api.get("/notes");
                console.log(response.data);
                setNotes(response.data);
                setIsRateLimit(false);
            }catch(error){

                if(error.response?.status === 429){
                    setError("Sending too many request, please slow down.")
                    setIsRateLimit(true);
                    return;
                } else{
                    toast.error("Failed to load notes");
                }
            }finally {
                setLoading(false);
            }
        }

    fetchNotes();
    }, []);


  return (
        <div className='min-h-screen'>
            <NavBar />

            {isRateLimit && <RateLimit />}

            <div className='max-w-7xl mx-auto p-4 mt-6'>
                 {loading && <div className='text-center text-primary py-10'>Loading Notes... </div>}

                 {notes.length > 0 && !isRateLimit && (
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                        {notes.map( (note) => (
                            <NoteCard key={note._id} note = {note} setNotes={setNotes} />
                        ))}        
                    </div> 
                 )}
            </div>

            {notes.length === 0 && !isRateLimit && <NotesNotFound />  }



        </div>
  )
}

export default HomePage