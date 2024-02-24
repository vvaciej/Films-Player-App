'use client';

import useDocumentTitle from '../helpers/PageTitle';
import { Navbar } from '../layouts/Navbar';
import { Footer } from '../layouts/Footer';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import getCookie from '../helpers/GetCookie';
import { allFilms } from '../data/films-data';

import '../../style/css/filteres-page.css';
import IteratingFilmsPage from '../helpers/FilmsIteratingFilter';

import Filters from '../components/FilmsFilterContainer';

const Watchlist = () => {
	useDocumentTitle('Watchlist - vvaciej.app');
	const router = useRouter();

	const isLogged = getCookie('email') ? true : false;

	// switch (mostPopularChoosed) {
	// 	case 'most_popular':
	// 		mappingBy.sort((a: FilmData, b: FilmData) => b.filmwebPopularity - a.filmwebPopularity);
	// 		break;
	// 	case 'last_added':
	// 		mappingBy.sort((a: FilmData, b: FilmData) => new Date(b.addedDate).getTime() - new Date(a.addedDate).getTime());
	// 		break;
	// 	case 'highest_rating':
	// 		mappingBy.sort((a: FilmData, b: FilmData) => b.rating - a.rating);
	// 		break;
	// 	case 'highest_budget':
	// 		mappingBy.sort((a: FilmData, b: FilmData) => b.budget - a.budget);
	// 		break;
	// 	case 'highest_profit':
	// 		mappingBy.sort((a: FilmData, b: FilmData) => b.profit - a.profit);
	// 		break;
	// }

	const filteredMovies = IteratingFilmsPage(allFilms, 'category', 'lastadded');

	return (
		<div className='space-light'>
			<Navbar isCutted={false} />
			<div className='content-full-space-centered'>
				<Filters headingTitlePage='Do obejrzenia' mappingBy={filteredMovies} />
			</div>
		</div>
	);
};

export default Watchlist;
