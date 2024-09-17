import './planetsNav.css';
import { Link } from 'react-router-dom';

function PlanetsNav({ setTitle, planets }) {
  return (
    <nav className="planets-nav">
      <ul className="planets-list">
        {
          planets.map((planet, index) => {
            return <Link key={ index } to={ '/planet/' + planet.id }>
                    <li
                      className={ 'planet ' + planet.name.toLowerCase() }
                      onMouseEnter={ () => setTitle(planet.name) }
                      onMouseLeave={ () => setTitle('Solaris Space Center') }
                      key={ index }
                    ></li>
                  </Link>
          })
        }
      </ul>
    </nav>
  )
}

export default PlanetsNav
