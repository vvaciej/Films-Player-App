'use client';

import { Navbar } from '../layouts/Navbar';
import { Footer } from '../layouts/Footer';
import useDocumentTitle from '../helpers/PageTitle';

import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { PlayIcon, StarIcon } from '@heroicons/react/24/solid';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import normalizePolishCharacters from '../helpers/NormalizePolishSymbols';
import convertTitleToUrl from '../helpers/ConvertTitleToURL';

import { allFilms } from '../data/films-data';
import getCookie from '../helpers/GetCookie';

type FilmData = {
	image: string;
	title: string;
	rating: number;
	ref: number;
};

import { useTranslation } from 'react-i18next';

const SearchPage: React.FC = () => {
	const { t } = useTranslation();
	useDocumentTitle(`${t('Darmowe filmy i seriale')} - vvaciej.app`);
	const router = useRouter();

	const [whatSearchVal, setWhatSearchVal] = useState<string>('');
	const [searchResults, setSearchResults] = useState<FilmData[]>([]);
	const [isLoaded, setIsLoaded] = useState<boolean>(false);

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
		router.replace(`/pl/results?query=${whatSearchVal}`);
	}, [whatSearchVal, router]);

	useEffect(() => {
		setTimeout(() => {
			setIsLoaded(true);
		}, 150);
	}, []);

	const handleSearch = (inputValue: string) => {
		const inputVal = normalizePolishCharacters(inputValue.toLowerCase());

		const filteredData = allFilms.filter(film => {
			const lowerCaseTitle = normalizePolishCharacters(film.title.toLowerCase());

			return lowerCaseTitle.includes(inputVal);
		});

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
				<div className='typical-container-comp-with-films'>
					{isLoaded ? (
						<div>
							<header>
								<div className='w-full text-center'>
									<form
										className='flex justify-center'
										onSubmit={event => {
											event.preventDefault();
										}}>
										<input
											type='text'
											placeholder='Szukaj filmu, serialu lub aktora...'
											className='input-style mb-8 flex w-full sm:w-[28rem] lg:hidden !h-12 touch-none text-base orange-outline-focus'
											value={whatSearchVal}
											onChange={handleSearchType}
										/>
									</form>
									<section
										className={`search-page-text-section flex flex-col items-center gap-y-1 text-center ${
											whatSearchVal !== '' ? '' : 'active'
										}`}
										style={{
											display: whatSearchVal !== '' ? 'none' : 'flex',
										}}>
										<MagnifyingGlassIcon className='min-h-10 h-10 mb-2' />
										<h1 className='text-lg'>{t('Szukaj')} - vvaciej.to</h1>
										<span
											className='text-sm'
											style={{
												color: 'var(--gray-9999)',
												padding: '0rem .4rem',
											}}>
											{t('Szukaj filmu lub serialu')}
										</span>
									</section>
								</div>
							</header>
							<main
								className={`lg:w-[1240px] mt-4 h-max w-full ${whatSearchVal !== '' ? 'active' : ''}`}
								style={{
									display: whatSearchVal ? 'block' : 'none',
								}}>
								<h1 className='text-2xl font-semibold sm:text-3xl'>
									{t('Wyniki wyszukiwania:')} {decodedQuery}
								</h1>
								<section className='flex flex-col justify-between mt-8'>
									<section
										style={{
											display: searchResults.length > 0 ? 'flex' : 'none',
										}}
										className={`flex items-center relative w-max category-movies-title-before-orange-hr ${
											searchResults.length > 0 ? 'active' : ''
										}`}>
										<h1 className='text-2xl font-medium pl-4 leading-6 category-movies-title-before-orange-hr'>
											{t('Movies')}
										</h1>
									</section>
									<div className='films-wrapper'>
										{searchResults.map((film: FilmData, index: number) => (
											<article className='film-container w-full' key={index}>
												<section className='films-image-section'>
													<Link
														href={`/${getCookie('langChoosed') === 'angielski' ? 'en' : 'pl'}/titles/${
															film.ref
														}/${convertTitleToUrl(film.title)}`}>
														<img src={film.image} alt={`Poster for ${film.title}`} />
													</Link>
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
													<Link
														href={`/${getCookie('langChoosed') === 'angielski' ? 'en' : 'pl'}/titles/${
															film.ref
														}/${convertTitleToUrl(film.title)}`}
														className='film-link-title search-title pr-1'>
														{film.title}
													</Link>
												</section>
											</article>
										))}
									</div>
								</section>
							</main>
						</div>
					) : (
						<div className='flex justify-center w-full h-full items-center'>
							<div className='loader'></div>
						</div>
					)}
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default SearchPage;
