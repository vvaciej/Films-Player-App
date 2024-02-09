'use client';

import { PlayIcon, StarIcon } from '@heroicons/react/24/solid';
import '../../../style/css/search-page.css';
import '../../../style/css/home.css';
import useDocumentTitle from '../../helpers/PageTitle';
import { useEffect, useState } from 'react';
import Search from '../Search';
import { Footer } from '@/app/layouts/Footer';
import { Navbar } from '@/app/layouts/Navbar';

import {
	popularFilmsData,
	lastAddedFilmsData,
	popularActionFilmsData,
	popularComediaFilmsData,
	popularHorrorFilms,
	popularPolishFilms,
	popularSerials,
} from '../../data/main-films';
import React from 'react';

const allFilmsData = [
	...popularFilmsData,
	...lastAddedFilmsData,
	...popularActionFilmsData,
	...popularComediaFilmsData,
	...popularHorrorFilms,
	...popularPolishFilms,
	...popularSerials,
];

type FilmData = {
	image: string;
	title: string;
	rating: number;
};

interface MobileSearchProps {
	params: {
		query: string;
	};
}

const MobileSearch: React.FC<MobileSearchProps> = ({ params }) => {
	const decodedQuery = decodeURIComponent(params.query);
	useDocumentTitle(`Search results for ${decodedQuery} - vvaciej.app`);

	const [searchResults, setSearchResults] = useState<FilmData[]>([]);

	useEffect(() => {
		const uniqueTitles = new Set<string>();

		allFilmsData.forEach(film => {
			if (film.title.toLowerCase().includes(decodedQuery.toLowerCase())) {
				uniqueTitles.add(film.title);
			}
		});

		const filteredData = Array.from(uniqueTitles).map(title => allFilmsData.find(film => film.title === title));

		setSearchResults(filteredData as FilmData[]);
	}, [decodedQuery]);

	return (
		<div className='space-light'>
			<Navbar isCutted={false} />
			<div className='content-full-space-centered'>
				<div className='search-container'>
					<Search textVisible={false} />
					<div className='searched-films-wrapper'>
						<h1 className='text-2xl font-semibold sm:text-3xl'>Search results for: {decodedQuery}</h1>
						<section className='search-movies-section'>
							<a
								href='#'
								className={`search-category-text flex items-center relative w-max ${
									searchResults.length > 0 ? 'active' : ''
								}`}>
								<span className='text-2xl font-medium pl-4 leading-6'>Movies</span>
							</a>
							<div className='search-movies-films-container'>
								{searchResults.map((film: FilmData, index: number) => (
									<article className='film-container w-full' key={index}>
										<section className='films-image-section'>
											<a href='#'>
												<img src={film.image} alt={`Poster for ${film.title}`} />
												<button className='film-play-btn'>
													<PlayIcon className='text-black h-5' />
												</button>
											</a>
										</section>
										<section className='films-text-section'>
											<p className='main-text-rating flex items-center'>
												<StarIcon
													className='h-5 mr-2'
													style={{
														color: 'var(--orange)',
													}}
												/>
												<span>{film.rating} / 10</span>
											</p>
											<a className='film-link-title search-title pr-1'>{film.title}</a>
										</section>
									</article>
								))}
							</div>
						</section>
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default MobileSearch;
