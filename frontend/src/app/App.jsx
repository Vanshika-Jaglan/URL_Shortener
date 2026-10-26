import { useState, useEffect} from 'react'
import axios from 'axios';
import './App.css'

function App() {
  const [urls, setUrls] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [currentUrl, setCurrentUrl] = useState(null);

  async function fetchUrls(){
    const response = await axios.get("http://localhost:5173/api/url");
    const responseData = response.data;

    setUrls(responseData.data.urls);
  }

  async function createShortUrl(){
    const response = await axios.post("http://localhost:5173/api/url",{
      url:inputValue
    });

    setCurrentUrl({
      originalUrl: response.data.data.originalUrl,
      shortCode: response.data.data.shortCode
    })

    fetchUrls();
  }

  async function deleteUrl(id){
    await axios.delete(`http://localhost:5173/api/url/${id}`);
    fetchUrls();
  }

  useEffect(()=>{
    fetchUrls()
  },[])

  return (
    <main className='p-10 flex flex-col gap-4 items-center'>
      <div className='w-full max-w-4xl p-2 flex gap-4'>

        <input className='w-full p-2 border'
        type="text"
        placeholder='Enter the long URL'
        value = {inputValue} 
        onChange={(e)=>{setInputValue(e.target.value)}}/>

        <button className='p-2 rounded bg-orange-600 cursor-pointer text-white'
        onClick={createShortUrl}>Shorten</button>

      </div>

      <div className='w-full max-w-4xl p-2'></div>
      <div className='w-full max-w-4xl p-2 flex flex-col gap-4'>

        {
      urls.map(url=>{
        return(
          <div className='border border-neutral-300 p-2 flex gap-8 justify-evenly items-center'>
            <a href={`http://localhost:3000/${url.shortCode}`} target='_blank'>{url.shortCode}</a>
            <p className='truncate'>{url.originalUrl}</p>
            <p>{url.clicks}</p>
            <div className='flex gap-2'>
              <button className='p-2 rounded bg-orange-600 text-white cursor-pointer'>COPY</button>
              <button className='p-2 rounded bg-orange-600 text-white cursor-pointer' onClick={()=>{deleteUrl(url._id)}}>DELETE</button>
            </div>
          </div>
        )
      })
    }
      </div>
    </main>

    
  )
}

export default App
