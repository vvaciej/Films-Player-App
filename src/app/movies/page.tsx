'use client';

import useDocumentTitle from '../helpers/PageTitle';
import Filters from '../components/FilmsFilterContainer';

import { allFilms } from '@/app/data/films-data';

const Movies: React.FC = () => {
	useDocumentTitle('Wyszukiwarka filmów - vvaciej.app');

	const filteredMovies = allFilms.filter(movie => {
		const filmTypeLowerCase = movie.type.toLowerCase();
		
		return filmTypeLowerCase === 'film';
	});

	return <Filters headingTitlePage='Filmy' mappingBy={filteredMovies} />;
};

export default Movies;
