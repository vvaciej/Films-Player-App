'use client';

import { Navbar } from '../layouts/Navbar';
import { Footer } from '../layouts/Footer';
import useDocumentTitle from '../helpers/PageTitle';

import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import '../../style/css/search-page.css';
import { PlayIcon, StarIcon } from '@heroicons/react/24/solid';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import {
	popularFilmsData,
	lastAddedFilmsData,
	popularActionFilmsData,
	popularComediaFilmsData,
	popularHorrorFilms,
	popularPolishFilms,
	popularSerials,
} from '../data/main-films';

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

const SearchPage: React.FC = () => {
	useDocumentTitle(`vvaciej.app - Darmowe filmy i seriale`);
	const router = useRouter();

	const [whatSearchVal, setWhatSearchVal] = useState<string>('');
	const [searchResults, setSearchResults] = useState<FilmData[]>([]);

	const decodedQuery = decodeURIComponent(whatSearchVal);

	useDocumentTitle(decodedQuery !== '' ? `Search results for ${decodedQuery} - vvaciej.app` : 'Search - vvaciej.app');

	useEffect(() => {
		const queryParamMatch = window.location.search.match(/[\?&]query=([^&]+)/);

		if (queryParamMatch) {
			const decodedQueryParam = decodeURIComponent(queryParamMatch[1]);
			setWhatSearchVal(decodedQueryParam);
		}
	}, [router]);

	useEffect(() => {
		handleSearch(whatSearchVal);
	}, [whatSearchVal]);

	useEffect(() => {
		router.replace(`/search?query=${whatSearchVal}`);
	}, [whatSearchVal, router]);

	const handleSearch = (inputValue: string) => {
		const inputVal = inputValue.toLowerCase();

		const filteredData = allFilmsData.filter(film => film.title.toLowerCase().includes(inputVal));

		setSearchResults(filteredData as FilmData[]);
	};

	const handleSearchType = (event: React.ChangeEvent<HTMLInputElement>) => {
		const inputValue = event.target.value;
		setWhatSearchVal(inputValue);
	};

	return (
		<div className='space-light'>
			<Navbar isCutted={false} />
			<div className='content-full-space-centered'>
				<div className='search-container'>
					<section className='search-text-input-section'>
						<div className='w-full text-center'>
							<form
								className='flex justify-center'
								onSubmit={event => {
									event.preventDefault();
								}}>
								<input
									type='text'
									placeholder='Szukaj filmu, serialu lub aktora...'
									className='search-page-input-style'
									value={whatSearchVal}
									onChange={handleSearchType}
								/>
							</form>
							<section
								className={`search-page-text-section flex flex-col items-center gap-y-1 text-center ${
									whatSearchVal !== '' ? '' : 'active'
								}`}>
								<MagnifyingGlassIcon className='min-h-10 h-10 mb-2' />
								<h1 className='text-lg'>Search vvaciej.to</h1>
								<span
									className='text-sm'
									style={{
										color: 'var(--gray-9999)',
										padding: '0rem .4rem',
									}}>
									Find movies, tv series, people and more.
								</span>
							</section>
						</div>
					</section>
					<section className={`searched-films-wrapper ${whatSearchVal !== '' ? 'active' : ''}`}>
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
					</section>
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default SearchPage;
