'use client';

import { Navbar } from '../layouts/Navbar';
import { Footer } from '../layouts/Footer';
import useDocumentTitle from '../../../helpers/PageTitle';
import getCookie from '../../../helpers/GetCookie';
import { useRouter } from 'next/navigation';
import convertTitleToUrl from '../../../helpers/ConvertTitleToURL';
import { useTranslation } from 'react-i18next';

import {
	StarIcon,
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
	filmPortraitPopularity: number;
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
	const { t } = useTranslation();
	useDocumentTitle(`${t('Search engine')} - vvaciej.app`);
	const router = useRouter();

	const [filterOrderChoosed, setFilterOrderChoosed] = useState<string>(getCookie('filterOrderChoosed'));
	const [filmModeChoosed, setFilmModeChoosed] = useState<string>(getCookie('filmModeChoosed'));

	useEffect(() => {
		document.cookie = `filmModeChoosed=${filmModeChoosed}; path=/;`;
		document.cookie = `filterOrderChoosed=${filterOrderChoosed}; path=/;`;
	}, [filmModeChoosed, filterOrderChoosed]);

	useEffect(() => {
		const filmModeCookie = getCookie('filmModeChoosed');
		const filterOrderCookie = getCookie('filterOrderChoosed');

		setFilmModeChoosed(filmModeCookie || 'Portrait');
		setFilterOrderChoosed(filterOrderCookie || 'most_popular');
	}, [filmModeChoosed, filterOrderChoosed]);

	const [mostPopularBtnClicked, setMostPopularBtnClicked] = useState<boolean>(false);
	const [ModeClicked, setModeClicked] = useState<boolean>(false);

	const handleMostPopularClick = () => {
		setMostPopularBtnClicked(prevState => !prevState);
		setModeClicked(false);
	};

	const handleModeClick = () => {
		setModeClicked(prevState => !prevState);
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
			mappingBy.sort((a: FilmData, b: FilmData) => b.filmPortraitPopularity - a.filmPortraitPopularity);
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
	const ModeDropdownRef = useRef<HTMLDivElement>(null);

	const dropdownMobilesRef = useRef<HTMLDivElement>(null);

	const handleDocumentClick = (event: MouseEvent) => {
		const isInsideDropdown = (target: EventTarget | null, dropdownRef: React.RefObject<HTMLDivElement>) => {
			return dropdownRef.current && dropdownRef.current.contains(target as Node);
		};

		if (
			!isInsideDropdown(event.target, mostPopularDropdownRef) &&
			!isInsideDropdown(event.target, ModeDropdownRef) &&
			!isInsideDropdown(event.target, dropdownMobilesRef)
		) {
			setMostPopularBtnClicked(false);
			setModeClicked(false);
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
					<section className='films-heading-section items-center mb-7'>
						<h1 className='films-category-heading-text'>{t(headingTitlePage)}</h1>
						<section className='flex items-center'>
							<section className='relative' ref={mostPopularDropdownRef}>
								<button
									className={`flex items-center transparent-btn-style`}
									onClick={handleMostPopularClick}>
									<Bars3BottomLeftIcon className='h-5' />
									<span className='text-sm font-medium pl-2 lg:flex hidden'>
										{filterOrderChoosed === 'most_popular'
											? t('Most popular')
											: filterOrderChoosed === 'last_added'
											? t('Last added')
											: filterOrderChoosed === 'highest_rating'
											? t('Highest rating')
											: filterOrderChoosed === 'highest_budget'
											? t('Highest budget')
											: filterOrderChoosed === 'highest_profit'
											? t('Highest profit')
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
										{t('Most popular')}
									</button>
									<button
										className={`filtering-dropdown-btns ${filterOrderChoosed === 'last_added' ? 'choosed' : ''}`}
										onClick={() => {
											router.push(`?order=last_added`);
											setMostPopularBtnClicked(false);
											setFilterOrderChoosed('last_added');
										}}>
										{t('Last added')}
									</button>
									<button
										className={`filtering-dropdown-btns ${filterOrderChoosed === 'highest_rating' ? 'choosed' : ''}`}
										onClick={() => {
											router.push(`?order=highest_rating`);
											setMostPopularBtnClicked(false);
											setFilterOrderChoosed('highest_rating');
										}}>
										{t('Highest rating')}
									</button>
									<button
										className={`filtering-dropdown-btns ${filterOrderChoosed === 'highest_budget' ? 'choosed' : ''}`}
										onClick={() => {
											router.push(`?order=highest_budget`);
											setMostPopularBtnClicked(false);
											setFilterOrderChoosed('highest_budget');
										}}>
										{t('Highest budget')}
									</button>
									<button
										className={`filtering-dropdown-btns ${filterOrderChoosed === 'highest_profit' ? 'choosed' : ''}`}
										onClick={() => {
											router.push(`?order=highest_profit`);
											setMostPopularBtnClicked(false);
											setFilterOrderChoosed('highest_profit');
										}}>
										{t('Highest profit')}
									</button>
								</div>
							</section>
							<section className='relative' ref={ModeDropdownRef}>
								<button className={`flex items-center transparent-btn-style`} onClick={handleModeClick}>
									{filmModeChoosed === 'Portrait' ? (
										<Squares2X2Icon className='h-5' />
									) : filmModeChoosed === 'Landscape' ? (
										<ViewColumnsIcon className='h-5' />
									) : (
										<ListBulletIcon className='h-5' />
									)}
									<span className='text-sm font-medium pl-2 lg:flex hidden'>
										{filmModeChoosed === 'Portrait'
											? t('Portrait')
											: filmModeChoosed === 'Landscape'
											? t('Landscape')
											: filmModeChoosed === 'List'
											? t('List')
											: ''}
									</span>
								</button>
								<div className={`filter-dropdown filter-Mode ${ModeClicked ? 'active' : ''} select-none`}>
									<button
										className={`filtering-dropdown-btns ${filmModeChoosed === 'Portrait' ? 'choosed' : ''}`}
										onClick={() => {
											setModeClicked(false);
											setFilmModeChoosed('Portrait');
										}}>
										{t('Portrait')}
									</button>
									<button
										className={`filtering-dropdown-btns ${filmModeChoosed === 'Landscape' ? 'choosed' : ''}`}
										onClick={() => {
											setModeClicked(false);
											setFilmModeChoosed('Landscape');
										}}>
										{t('Landscape')}
									</button>
									<button
										className={`filtering-dropdown-btns ${filmModeChoosed === 'List' ? 'choosed' : ''}`}
										onClick={() => {
											setModeClicked(false);
											setFilmModeChoosed('List');
										}}>
										{t('List')}
									</button>
								</div>
							</section>
						</section>
					</section>
					{filmModeChoosed === 'Portrait' ? (
						<section className='films-wrapper'>
							{mappingBy.map((film: FilmData, index: number) => (
								<article className='film-container w-full' key={index}>
									<section className='films-image-section'>
										<Link
											href={`/${getCookie('langChoosed') === 'english' ? 'en' : 'pl'}/titles/${
												film.ref
											}/${convertTitleToUrl(film.title)}`}>
											<img src={film.image} className='max-h-[17.2rem]' alt={`Poster for ${t(film.title)}`} />
										</Link>
									</section>
									<section className='pt-3 flex flex-col gap-y-1'>
										<section className='main-text-rating flex items-center'>
											<StarIcon className='h-5 mr-2 text-orange' />
											<span>{film.rating} / 10</span>
										</section>
										<Link
											href={`/${getCookie('langChoosed') === 'english' ? 'en' : 'pl'}/${
												getCookie('langChoosed') === 'polski' ? 'pl' : 'en'
											}/titles/${film.ref}/${convertTitleToUrl(film.title)}`}
											className='text-sm font-medium search-title pr-1'>
											{t(film.title)}
										</Link>
									</section>
								</article>
							))}
						</section>
					) : filmModeChoosed === 'Landscape' ? (
						<section className='films-wrapper-landscape'>
							{mappingBy.map((film, index: number) => (
								<article className='film-container-landscape w-full' key={index}>
									<section className='films-image-section'>
										<Link
											href={`/${getCookie('langChoosed') === 'english' ? 'en' : 'pl'}/titles/${
												film.ref
											}/${convertTitleToUrl(film.title)}`}>
											<img src={film.imgFullHd500} className='!max-h-[13rem]' alt={`Poster for ${t(film.title)}`} />
										</Link>
									</section>
									<section className='pt-3 flex flex-col gap-y-1'>
										<Link
											href={`/${getCookie('langChoosed') === 'english' ? 'en' : 'pl'}/titles/${
												film.ref
											}/${convertTitleToUrl(film.title)}`}
											className='text-[14.5px] font-medium search-title pr-1'>
											{t(film.title)}
										</Link>
										<span className='text-xs sm:text-sm'>{film.releaseDate}</span>
										<section className='main-text-rating flex items-center'>
											<StarIcon className='h-5 mr-2 text-orange' />
											<span>{film.rating} / 10</span>
										</section>
									</section>
								</article>
							))}
						</section>
					) : filmModeChoosed === 'List' ? (
						<section className='films-wrapper-list'>
							{mappingBy.map((film, index: number) => (
								<article className='film-container-list w-full' key={index}>
									<section className='films-image-section'>
										<Link
											href={`/${getCookie('langChoosed') === 'english' ? 'en' : 'pl'}/titles/${
												film.ref
											}/${convertTitleToUrl(film.title)}`}>
											<img className='max-h-46 max-w-32 pr-2' src={film.image} alt={`Poster for ${t(film.title)}`} />
										</Link>
									</section>
									<section className='pt-3 flex flex-col gap-y-1'>
										<Link
											href={`/${getCookie('langChoosed') === 'english' ? 'en' : 'pl'}/titles/${
												film.ref
											}/${convertTitleToUrl(film.title)}`}
											className='text-[14.5px] font-medium search-title pr-1'>
											{t(film.title)}
										</Link>
										<span className='text-xs sm:text-sm'>{film.time}</span>
										<section className='main-text-rating'>
											<section className='flex items-center'>
												<StarIcon className='h-4 mr-2 text-orange' />
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
				className={`typical-dropdown-style ${mostPopularBtnClicked || ModeClicked ? 'active' : ''}`}>
				{mostPopularBtnClicked ? (
					<div className='!h-52'>
						<button
							className={`${filterOrderChoosed === 'most_popular' ? 'choosed' : ''} btn-choosed-style`}
							onClick={() => {
								router.push(`?order=most_popular`);
								setMostPopularBtnClicked(false);
								setFilterOrderChoosed('most_popular');
							}}>
							{t('Most popular')}
						</button>
						<button
							className={`${filterOrderChoosed === 'last_added' ? 'choosed' : ''} btn-choosed-style`}
							onClick={() => {
								router.push(`?order=last_added`);
								setMostPopularBtnClicked(false);
								setFilterOrderChoosed('last_added');
							}}>
							{t('Last added')}
						</button>
						<button
							className={`${filterOrderChoosed === 'highest_rating' ? 'choosed' : ''} btn-choosed-style`}
							onClick={() => {
								router.push(`?order=highest_rating`);
								setMostPopularBtnClicked(false);
								setFilterOrderChoosed('highest_rating');
							}}>
							{t('Highest rating')}
						</button>
						<button
							className={`${filterOrderChoosed === 'highest_budget' ? 'choosed' : ''} btn-choosed-style`}
							onClick={() => {
								router.push('?order=highest_budget');
								setMostPopularBtnClicked(false);
								setFilterOrderChoosed('highest_budget');
							}}>
							{t('Highest budget')}
						</button>
						<button
							className={`${filterOrderChoosed === 'highest_profit' ? 'choosed' : ''} btn-choosed-style`}
							onClick={() => {
								router.push('?order=highest_profit');
								setMostPopularBtnClicked(false);
								setFilterOrderChoosed('highest_profit');
							}}>
							{t('Highest profit')}
						</button>
					</div>
				) : ModeClicked ? (
					<div className='!h-32'>
						<button
							className={`${filmModeChoosed === 'Portrait' ? 'choosed' : ''} btn-choosed-style`}
							onClick={() => {
								setModeClicked(false);
								setFilmModeChoosed('Portrait');
							}}>
							{t('Portrait')}
						</button>
						<button
							className={`${filmModeChoosed === 'Landscape' ? 'choosed' : ''} btn-choosed-style`}
							onClick={() => {
								setModeClicked(false);
								setFilmModeChoosed('Landscape');
							}}>
							{t('Landscape')}
						</button>
						<button
							className={`${filmModeChoosed === 'List' ? 'choosed' : ''} btn-choosed-style`}
							onClick={() => {
								setModeClicked(false);
								setFilmModeChoosed('List');
							}}>
							{t('List')}
						</button>
					</div>
				) : (
					''
				)}
			</div>
			<div className={`opacity-el ${mostPopularBtnClicked || ModeClicked ? 'active' : ''}`}></div>
		</div>
	);
};

export default Filters;
