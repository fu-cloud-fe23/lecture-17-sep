import { useState, useEffect } from 'react';
import axios from 'axios';

const getInsults = (setInsults) => {
  axios.get('https://t6h51bw7ie.execute-api.eu-north-1.amazonaws.com/api/insults')
    .then(response => setInsults(response.data.data));
} 

function App() {
  const [insults, setInsults] = useState([]);
  const [randomInsult, setRandomInsult] = useState('');
  const [newInsult, setNewInsult] = useState('');
  const [newInsultPlay, setNewInsultPlay] = useState('');

  useEffect(() => {
    getInsults(setInsults);
  }, []);

  const postInsult = (e) => {
    e.preventDefault();
    axios.post(`https://t6h51bw7ie.execute-api.eu-north-1.amazonaws.com/api/insults`, {
      insult : newInsult,
      play : newInsultPlay
    })
      .then(response => {
        if(response.data.data.success) {
          getInsults(setInsults);
        }
      })
  }

  const deleteInsult = (id) => {
    axios.delete(`https://t6h51bw7ie.execute-api.eu-north-1.amazonaws.com/api/insults/${id}`)
      .then(response => {
        if(response.data.data.success) {
          getInsults(setInsults);
        }
      })
  }

  const randomizeInsult = () => {
    setRandomInsult(insults[Math.floor(Math.random() * insults.length)].insult)
  }
  
  return (
    <div className="app">
      <section>
        {
          insults.map(insult => {
            return <h2 onClick={() => deleteInsult(insult.id)}>{insult.insult}</h2>
          })
        }
      </section>
      <section>
        <h1>Add new insult</h1>
        <form>
          <label>
            Insult:
            <input onChange={(e) => setNewInsult(e.target.value)} type="text" />
          </label>
          <label>
            Play:
            <input onChange={(e) => setNewInsultPlay(e.target.value)} type="text" />
          </label>
          <button onClick={ postInsult } >Add new insult</button>
        </form>
      </section>
      <section>
        <h1>Randomize insult</h1>
        {
          randomInsult ? <h2>{randomInsult}</h2> : ''
        }
        <button onClick={randomizeInsult}>Randomize insult</button>
      </section>
    </div>
  )
}

export default App
