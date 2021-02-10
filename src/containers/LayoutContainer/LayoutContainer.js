import { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { useDocumentTitle, useAuthenticateUser } from '../../hooks';

const { REACT_APP_API_URL, REACT_APP_MOVIE_API_KEY } = process.env;

export const LayoutContainer = ({ children }) => {
    const [favoriteMovies, setFavoriteMovies] = useState([]);
    const [search, setSearch] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    const [movies, setMovies] = useState([]);
    const history = useHistory();

    async function getFavoriteMovies() {
        const startUrl = `${REACT_APP_API_URL}/trending/movie/week?api_key=${REACT_APP_MOVIE_API_KEY}`;
        const {
            data: { results }
        } = await axios.get(startUrl);
        setFavoriteMovies(results);
    }

    useEffect(() => getFavoriteMovies(), []);

    useDocumentTitle();
    useAuthenticateUser();

    const handleChangeSearch = e => {
        setSearch(e.target.value);
    };

    const handleSearchMovies = async () => {
        setIsSearching(true);

        try {
            const url = `${REACT_APP_API_URL}/search/movie?api_key=${REACT_APP_MOVIE_API_KEY}&query=${search}`;

            const {
                data: { results }
            } = await axios.get(url);
            setSearch('');
            setMovies(results);
            setFavoriteMovies([]);
            setIsSearching(false);
            history.push('/');
        } catch (e) {
            console.error('[e]', e);
        }
    };
    if (movies.length > 0)
        return children({
            search,
            isSearching,
            movies,
            onChangeSearch: handleChangeSearch,
            onSearchMovies: handleSearchMovies
        });
    return children({
        search,
        isSearching,
        movies: favoriteMovies,
        onChangeSearch: handleChangeSearch,
        onSearchMovies: handleSearchMovies
    });
};
