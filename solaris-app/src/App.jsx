import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import HomePage from './pages/homePage/HomePage';
import SinglePlanetPage from './pages/singlePlanetPage/SinglePlanetPage';
import { Routes, Route } from 'react-router-dom';

const getKey = (setKey) => {
    axios.post('https://n5n3eiyjb0.execute-api.eu-north-1.amazonaws.com/keys')
        .then(response => {
            setKey(response.data.key);
        })
        .catch(error => console.log(error));
}

const getPlanets = (key, setPlanets) => {
    if(key === '') {
        setPlanets([]);
    } else {
        axios.get('https://n5n3eiyjb0.execute-api.eu-north-1.amazonaws.com/bodies', {
            headers : { 'x-zocom' : key }
            })
            .then(response => {
                setPlanets(response.data.bodies);
            })
            .catch(error => console.log(error));
    }
}

function App() {
    const [key, setKey] = useState('');
    const [planets, setPlanets] = useState([]);

    useEffect(() => {
        getKey(setKey);
    }, []);

    useEffect(() => {
        getPlanets(key, setPlanets);
    }, [key]);

    return (
    <div className="app">
        <Routes>
            <Route path="/" element={ <HomePage planets={ planets } /> } />
            <Route path="/planet/:id" element={ <SinglePlanetPage /> } />
        </Routes>




        {/* <HomePage planets={ planets } /> */}
        {/* <SinglePlanetPage /> */}
    </div>
    )
}

export default App;
