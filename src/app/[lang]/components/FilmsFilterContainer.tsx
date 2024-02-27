'use client';

import { Navbar } from '../layouts/Navbar';
import { Footer } from '../layouts/Footer';
import useDocumentTitle from '../helpers/PageTitle';
import getCookie from '../helpers/GetCookie';
import { useRouter } from 'next/navigation';
import convertTitleToUrl from '../helpers/ConvertTitleToURL';
import { useTranslation } from 'react-i18next';

import {
	StarIcon,
	PlayIcon,
	Bars3BottomLeftIcon,
	Squares2X2Icon,
	ListBulletIcon,
	ViewColumnsIcon,
} from '@heroicons/react/24/solid';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

type FilmData = {
	image: string;
	title: string;
	rating: number;
	addedDate: string;
	filmwebPopularity: number;
	budget: number;
	profit: number;
	time: string;
	description: string;
	imgFullHd500: string;
	releaseDate: string;
	ref: number;
};

interface FilterPageProps {
	headingTitlePage: string;
	mappingBy: FilmData[];
}

const Filters: React.FC<FilterPageProps> = ({ headingTitlePage, mappingBy }) => {
	useDocumentTitle('Wyszukiwarka filmów - vvaciej.app');
	const router = useRouter();
	const { t, i18n } = useTranslation();

	const [filterOrderChoosed, setFilterOrderChoosed] = useState<string>(getCookie('filterOrderChoosed'));
	const [filmModeChoosed, setFilmModeChoosed] = useState<string>(getCookie('filmModeChoosed'));

	useEffect(() => {
		document.cookie = `filmModeChoosed=${filmModeChoosed}; path=/;`;
		document.cookie = `filterOrderChoosed=${filterOrderChoosed}; path=/;`;
	}, [filmModeChoosed, filterOrderChoosed]);

	useEffect(() => {
		const siatkaCookie = getCookie('filmModeChoosed');
		const filterOrderCookie = getCookie('filterOrderChoosed');

		setFilmModeChoosed(siatkaCookie || 'Siatka');
		setFilterOrderChoosed(filterOrderCookie || 'most_popular');
	}, [filmModeChoosed, filterOrderChoosed]);

	const [mostPopularBtnClicked, setMostPopularBtnClicked] = useState<boolean>(false);
	const [siatkaClicked, setSiatkaClicked] = useState<boolean>(false);

	const handleMostPopularClick = () => {
		setMostPopularBtnClicked(prevState => !prevState);
		setSiatkaClicked(false);
	};

	const handleSiatkaClick = () => {
		setSiatkaClicked(prevState => !prevState);
		setMostPopularBtnClicked(false);
	};

	useEffect(() => {
		const queryParamMatch = window.location.search.match(/[\?&]order=([^&]+)/);

		if (queryParamMatch) {
			const decodedQueryParam = decodeURIComponent(queryParamMatch[1]);
			setFilterOrderChoosed(decodedQueryParam);
		}
	}, [router]);

	switch (filterOrderChoosed) {
		case 'most_popular':
			mappingBy.sort((a: FilmData, b: FilmData) => b.filmwebPopularity - a.filmwebPopularity);
			break;
		case 'last_added':
			mappingBy.sort((a: FilmData, b: FilmData) => new Date(b.addedDate).getTime() - new Date(a.addedDate).getTime());
			break;
		case 'highest_rating':
			mappingBy.sort((a: FilmData, b: FilmData) => b.rating - a.rating);
			break;
		case 'highest_budget':
			mappingBy.sort((a: FilmData, b: FilmData) => b.budget - a.budget);
			break;
		case 'highest_profit':
			mappingBy.sort((a: FilmData, b: FilmData) => b.profit - a.profit);
			break;
	}

	const mostPopularDropdownRef = useRef<HTMLDivElement>(null);
	const siatkaDropdownRef = useRef<HTMLDivElement>(null);

	const dropdownMobilesRef = useRef<HTMLDivElement>(null);

	const handleDocumentClick = (event: MouseEvent) => {
		const isInsideDropdown = (target: EventTarget | null, dropdownRef: React.RefObject<HTMLDivElement>) => {
			return dropdownRef.current && dropdownRef.current.contains(target as Node);
		};

		if (
			!isInsideDropdown(event.target, mostPopularDropdownRef) &&
			!isInsideDropdown(event.target, siatkaDropdownRef) &&
			!isInsideDropdown(event.target, dropdownMobilesRef)
		) {
			setMostPopularBtnClicked(false);
			setSiatkaClicked(false);
		}
	};

	useEffect(() => {
		document.body.addEventListener('click', handleDocumentClick);

		return () => {
			document.body.removeEventListener('click', handleDocumentClick);
		};
	}, []);

	return (
		<div className='space-light'>
			<Navbar isCutted={false} />
			<div className='content-full-space-centered'>
				<div className='typical-container-comp-with-films'>
					<section className='films-heading-section items-center'>
						<h1 className='films-category-heading-text'>{t(headingTitlePage)}</h1>
						<section className='films-category-filter-btns'>
							<section className='relative' ref={mostPopularDropdownRef}>
								<button className={`films-category-filter-btn transparent-btn-style`} onClick={handleMostPopularClick}>
									<Bars3BottomLeftIcon className='h-5' />
									<span className='text-sm font-medium pl-2 lg:flex hidden'>
										{filterOrderChoosed === 'most_popular'
											? t('Najbardziej popularne')
											: filterOrderChoosed === 'last_added'
											? t('Ostatnio dodane')
											: filterOrderChoosed === 'highest_rating'
											? t('Najlepiej oceniane')
											: filterOrderChoosed === 'highest_budget'
											? t('Najwiekszy budzet')
											: filterOrderChoosed === 'highest_profit'
											? t('Najwiekszy przychod')
											: ''}
									</span>
								</button>
								<div className={`filter-dropdown ${mostPopularBtnClicked ? 'active' : ''} select-none`}>
									<button
										className={`filtering-dropdown-btns ${filterOrderChoosed === 'most_popular' ? 'choosed' : ''}`}
										onClick={() => {
											router.push(`?order=most_popular`);
											setMostPopularBtnClicked(false);
											setFilterOrderChoosed('most_popular');
										}}>
										{t('Najbardziej popularne')}
									</button>
									<button
										className={`filtering-dropdown-btns ${filterOrderChoosed === 'last_added' ? 'choosed' : ''}`}
										onClick={() => {
											router.push(`?order=last_added`);
											setMostPopularBtnClicked(false);
											setFilterOrderChoosed('last_added');
										}}>
										{t('Ostatnio dodane')}
									</button>
									<button
										className={`filtering-dropdown-btns ${filterOrderChoosed === 'highest_rating' ? 'choosed' : ''}`}
										onClick={() => {
											router.push(`?order=highest_rating`);
											setMostPopularBtnClicked(false);
											setFilterOrderChoosed('highest_rating');
										}}>
										{t('Najlepiej oceniane')}
									</button>
									<button
										className={`filtering-dropdown-btns ${filterOrderChoosed === 'highest_budget' ? 'choosed' : ''}`}
										onClick={() => {
											router.push(`?order=highest_budget`);
											setMostPopularBtnClicked(false);
											setFilterOrderChoosed('highest_budget');
										}}>
										{t('Najwiekszy budzet')}
									</button>
									<button
										className={`filtering-dropdown-btns ${filterOrderChoosed === 'highest_profit' ? 'choosed' : ''}`}
										onClick={() => {
											router.push(`?order=highest_profit`);
											setMostPopularBtnClicked(false);
											setFilterOrderChoosed('highest_profit');
										}}>
										{t('Najwiekszy przychod')}
									</button>
								</div>
							</section>
							<section className='relative' ref={siatkaDropdownRef}>
								<button className={`films-category-filter-btn transparent-btn-style`} onClick={handleSiatkaClick}>
									{filmModeChoosed === 'Siatka' ? (
										<Squares2X2Icon className='h-5' />
									) : filmModeChoosed === 'Pejzaz' ? (
										<ViewColumnsIcon className='h-5' />
									) : (
										<ListBulletIcon className='h-5' />
									)}
									<span className='text-sm font-medium pl-2 lg:flex hidden'>
										{filmModeChoosed === 'Siatka'
											? t('Siatka')
											: filmModeChoosed === 'Pejzaz'
											? t('Pejzaz')
											: filmModeChoosed === 'Lista'
											? t('Lista')
											: ''}
									</span>
								</button>
								<div className={`filter-dropdown filter-siatka ${siatkaClicked ? 'active' : ''} select-none`}>
									<button
										className={`filtering-dropdown-btns ${filmModeChoosed === 'Siatka' ? 'choosed' : ''}`}
										onClick={() => {
											setSiatkaClicked(false);
											setFilmModeChoosed('Siatka');
										}}>
										{t('Siatka')}
									</button>
									<button
										className={`filtering-dropdown-btns ${filmModeChoosed === 'Pejzaz' ? 'choosed' : ''}`}
										onClick={() => {
											setSiatkaClicked(false);
											setFilmModeChoosed('Pejzaz');
										}}>
										{t('Pejzaz')}
									</button>
									<button
										className={`filtering-dropdown-btns ${filmModeChoosed === 'Lista' ? 'choosed' : ''}`}
										onClick={() => {
											setSiatkaClicked(false);
											setFilmModeChoosed('Lista');
										}}>
										{t('Lista')}
									</button>
								</div>
							</section>
						</section>
					</section>
					{filmModeChoosed === 'Siatka' ? (
						<section className='films-wrapper'>
							{mappingBy.map((film: FilmData, index: number) => (
								<article className='film-container w-full' key={index}>
									<section className='films-image-section'>
										<Link
											href={`/${getCookie('langChoosed') === 'angielski' ? 'en' : 'pl'}/titles/${
												film.ref
											}/${convertTitleToUrl(film.title)}`}>
											<img src={film.image} className='max-h-[17.2rem]' alt={`Poster for ${t(film.title)}`} />
											<button className='film-play-btn'>
												<PlayIcon className='text-black h-5' />
											</button>
										</Link>
									</section>
									<section className='films-text-section'>
										<section className='main-text-rating flex items-center'>
											<StarIcon
												className='h-5 mr-2'
												style={{
													color: 'var(--orange)',
												}}
											/>
											<span>{film.rating} / 10</span>
										</section>
										<Link
											href={`/${getCookie('langChoosed') === 'angielski' ? 'en' : 'pl'}/${
												getCookie('langChoosed') === 'polski' ? 'pl' : 'en'
											}/titles/${film.ref}/${convertTitleToUrl(film.title)}`}
											className='film-link-title search-title pr-1'>
											{t(film.title)}
										</Link>
									</section>
								</article>
							))}
						</section>
					) : filmModeChoosed === 'Pejzaz' ? (
						<section className='films-wrapper-pejzaz'>
							{mappingBy.map((film: FilmData, index: number) => (
								<article className='film-container-pejzaz w-full' key={index}>
									<section className='films-image-section'>
										<Link
											href={`/${getCookie('langChoosed') === 'angielski' ? 'en' : 'pl'}/titles/${
												film.ref
											}/${convertTitleToUrl(film.title)}`}>
											<img src={film.imgFullHd500} alt={`Poster for ${t(film.title)}`} />
											<button className='film-play-btn'>
												<PlayIcon className='text-black h-5' />
											</button>
										</Link>
									</section>
									<section className='films-text-section'>
										<Link
											href={`/${getCookie('langChoosed') === 'angielski' ? 'en' : 'pl'}/titles/${
												film.ref
											}/${convertTitleToUrl(film.title)}`}
											className='film-link-title search-title pr-1'>
											{t(film.title)}
										</Link>
										<span className='text-xs sm:text-sm'>{film.releaseDate}</span>
										<section className='main-text-rating flex items-center'>
											<StarIcon
												className='h-5 mr-2'
												style={{
													color: 'var(--orange)',
												}}
											/>
											<span>{film.rating} / 10</span>
										</section>
									</section>
								</article>
							))}
						</section>
					) : filmModeChoosed === 'Lista' ? (
						<section className='films-wrapper-list'>
							{mappingBy.map((film: FilmData, index: number) => (
								<article className='film-container-list w-full' key={index}>
									<section className='films-image-section'>
										<Link
											href={`/${getCookie('langChoosed') === 'angielski' ? 'en' : 'pl'}/titles/${
												film.ref
											}/${convertTitleToUrl(film.title)}`}>
											<img className='max-h-46 max-w-32 pr-2' src={film.image} alt={`Poster for ${t(film.title)}`} />
											<button className='film-play-btn'>
												<PlayIcon className='text-black h-5' />
											</button>
										</Link>
									</section>
									<section className='films-text-section'>
										<Link
											href={`/${getCookie('langChoosed') === 'angielski' ? 'en' : 'pl'}/titles/${
												film.ref
											}/${convertTitleToUrl(film.title)}`}
											className='film-link-title search-title pr-1'>
											{t(film.title)}
										</Link>
										<span className='text-xs sm:text-sm'>{film.time}</span>
										<section className='main-text-rating'>
											<section className='flex items-center'>
												<StarIcon
													className='h-4 mr-2'
													style={{
														color: 'var(--orange)',
													}}
												/>
												<span>{film.rating} / 10 &nbsp;&nbsp;</span>
											</section>
										</section>
										<p className='film-list-description'>{t(film.description)}</p>
									</section>
								</article>
							))}
						</section>
					) : (
						''
					)}
				</div>
			</div>
			<Footer />
			<div
				ref={dropdownMobilesRef}
				className={`typical-dropdown-style ${mostPopularBtnClicked || siatkaClicked ? 'active' : ''}`}>
				{mostPopularBtnClicked ? (
					<div className='!h-52'>
						<button
							className={`${filterOrderChoosed === 'most_popular' ? 'choosed' : ''} btn-choosed-style`}
							onClick={() => {
								router.push(`?order=most_popular`);
								setMostPopularBtnClicked(false);
								setFilterOrderChoosed('most_popular');
							}}>
							{t('Najbardziej popularne')}
						</button>
						<button
							className={`${filterOrderChoosed === 'last_added' ? 'choosed' : ''} btn-choosed-style`}
							onClick={() => {
								router.push(`?order=last_added`);
								setMostPopularBtnClicked(false);
								setFilterOrderChoosed('last_added');
							}}>
							{t('Ostatnio dodane')}
						</button>
						<button
							className={`${filterOrderChoosed === 'highest_rating' ? 'choosed' : ''} btn-choosed-style`}
							onClick={() => {
								router.push(`?order=highest_rating`);
								setMostPopularBtnClicked(false);
								setFilterOrderChoosed('highest_rating');
							}}>
							{t('Najlepiej oceniane')}
						</button>
						<button
							className={`${filterOrderChoosed === 'highest_budget' ? 'choosed' : ''} btn-choosed-style`}
							onClick={() => {
								router.push('?order=highest_budget');
								setMostPopularBtnClicked(false);
								setFilterOrderChoosed('highest_budget');
							}}>
							Najwiekszy budzet
							{t('Najwiekszy budzet')}
						</button>
						<button
							className={`${filterOrderChoosed === 'highest_profit' ? 'choosed' : ''} btn-choosed-style`}
							onClick={() => {
								router.push('?order=highest_profit');
								setMostPopularBtnClicked(false);
								setFilterOrderChoosed('highest_profit');
							}}>
							{t('Najwiekszy przychod')}
						</button>
					</div>
				) : siatkaClicked ? (
					<div className='!h-32'>
						<button
							className={`${filmModeChoosed === 'Siatka' ? 'choosed' : ''} btn-choosed-style`}
							onClick={() => {
								setSiatkaClicked(false);
								setFilmModeChoosed('Siatka');
							}}>
							{t('Siatka')}
						</button>
						<button
							className={`${filmModeChoosed === 'Pejzaz' ? 'choosed' : ''} btn-choosed-style`}
							onClick={() => {
								setSiatkaClicked(false);
								setFilmModeChoosed('Pejzaz');
							}}>
							{t('Pejzaz')}
						</button>
						<button
							className={`${filmModeChoosed === 'Lista' ? 'choosed' : ''} btn-choosed-style`}
							onClick={() => {
								setSiatkaClicked(false);
								setFilmModeChoosed('Lista');
							}}>
							{t('Lista')}
						</button>
					</div>
				) : (
					''
				)}
			</div>
			<div className={`opacity-el ${mostPopularBtnClicked || siatkaClicked ? 'active' : ''}`}></div>
		</div>
	);
};

export default Filters;
