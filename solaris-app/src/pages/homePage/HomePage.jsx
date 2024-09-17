import PlanetsNav from '../../components/planetsNav/PlanetsNav';
import './homePage.css';
import { useState } from 'react';

function HomePage({ planets }) {
    const [title, setTitle] = useState('Solaris Space Center');

    return (
    <main className="home-page">
        <h1 className="page-title">
            { title }
        </h1>
        <PlanetsNav setTitle={ setTitle } planets={ planets } />
    </main>
    )
}

export default HomePage;
