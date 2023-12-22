import React from 'react';
import { useState, useEffect } from 'react';
import './App.css';
import { FaSearch } from 'react-icons/fa';
import MovieCard from './MovieCard';

//replace with your key
const API_URL = 'http://www.omdbapi.com?apikey=[yourkey]';



const Emoji = props => (
    <span
        className="emoji"
        role="img"
        aria-label={props.label ? props.label : ""}
        aria-hidden={props.label ? "false" : "true"}
    >
        {props.symbol}
    </span>
);


const App = () => {

    const [movies,setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');


    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
        searchMovies(searchTerm);
        }
      };

    const searchMovies = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();
        setMovies(data.Search);
    }
    

    useEffect(() => {
        //searchMovies('Spiderman');
        //searchRecentMovies();
    }, []);

    return (
        <div className='app'>
            <h1>MOVIEFLIX</h1>

            <div className='search'>
                <input
                    placeholder='Search for your favourite movie'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={handleKeyPress}
                />
                <FaSearch style={{color: 'black'}}
                    onClick={() => searchMovies(searchTerm)}
                />

            </div>

            {
                movies?.length > 0
                ? (
                    <div className='container'>
                        { movies.map((movie) => (
                            <MovieCard movie = {movie}/>
                        ))}
                    
                    </div>
                ) : (
                    <div className='empty'> 
                        <h2>No movies found <Emoji symbol="😔"/></h2>
                    </div>
                )
            }   
        </div>
    );
}

export default App;