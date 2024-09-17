import './singlePlanetPage.css';
import {useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

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
              console.log(response.data.bodies);
          })
          .catch(error => console.log(error));
  }
}


function SinglePlanetPage() {
    const [key, setKey] = useState('');
    const [planets, setPlanets] = useState([]);
    const [planet, setPlanet] = useState({
        name : '',
        id: 0
    });

    useEffect(() => {
        getKey(setKey);
    }, []);

    useEffect(() => {
        getPlanets(key, setPlanets);
    }, [key]);

    useEffect(() => {
        const activePlanet = planets.find(p => p.id === parseInt( id ));
        setPlanet(activePlanet);
    }, [planets]);

    const { id } = useParams();

    return (
        <main className={ planet !== undefined ? 'single-planet-page gradient-' + planet.name.toLowerCase() : 'single-planet-page' }>
            <section className="planet-details">
                {
                    planet !== undefined && planet.name &&
                        <fieldset className="planet-field">
                            <legend className="planet-title">
                                { planet.name }
                            </legend>
                            <div className="planet-upper">
                                <div className="planet-upper-left">
                                    <h2 className="planet-heading">Detaljer</h2>
                                    <p className="planet-text"><span>Typ: </span> { planet.type }</p>
                                    <p className="planet-text"><span>Omkrets: </span>{ planet.circumference} km</p>
                                    <p className="planet-text"><span>Latinskt namn: </span>{ planet.latinName }</p>
                                    <p className="planet-text"><span>Distans från solen: </span>{ planet.distance } km</p>
                                    <p className="planet-text"><span>Omloppstid: </span>{ planet.orbitalPeriod } dagar</p>
                                    <p className="planet-text"><span>Dagstemperatur: </span>{planet.temp.day} Celsius</p>
                                    <p className="planet-text"><span>Nattemperatur: </span>{planet.temp.night} Celsius</p>
                                </div>
                                <div className="planet-upper-right">
                                    <h2 className="planet-heading">Månar</h2>
                                    <ul className="planet-list">
                                        {
                                            planet.moons.length !== 0 ? planet.moons.map((moon, index) => {
                                                return <li key={ index } className="moon-item">{ moon }</li>
                                            }) : <p>Inga månar</p>
                                        }
                                    </ul>
                                </div>
                            </div>
                            <p className="planet-desc">
                                {planet.desc}
                            </p>
                        </fieldset>
                }
            </section>
        </main>
    )
}

export default SinglePlanetPage;
