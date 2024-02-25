'use client';

import { Navbar } from '../layouts/Navbar';
import { Footer } from '../layouts/Footer';
import '../../style/css/filteres-page.css';
import useDocumentTitle from '../helpers/PageTitle';
import getCookie from '../helpers/GetCookie';
import { useRouter } from 'next/navigation';
import convertTitleToUrl from '../helpers/ConvertTitleToURL';

import {
	StarIcon,
	PlayIcon,
	AdjustmentsHorizontalIcon,
	Bars3BottomLeftIcon,
	Squares2X2Icon,
	ChevronDownIcon,
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

	const [mostPopularChoosed, setMostPopularChoosed] = useState<string>(getCookie('mostPopularChoosed'));
	const [siatkaChoosed, setSiatkaChoosed] = useState<string>(getCookie('siatkaChoosed'));

	useEffect(() => {
		document.cookie = `siatkaChoosed=${siatkaChoosed}; path=/;`;
		document.cookie = `mostPopularChoosed=${mostPopularChoosed}; path=/;`;
	}, [siatkaChoosed, mostPopularChoosed]);

	useEffect(() => {
		const siatkaCookie = getCookie('siatkaChoosed');
		const mostPopularCookie = getCookie('mostPopularChoosed');

		setSiatkaChoosed(siatkaCookie || 'Siatka');
		setMostPopularChoosed(mostPopularCookie || 'most_popular');
	}, [siatkaChoosed, mostPopularChoosed]);

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
			setMostPopularChoosed(decodedQueryParam);
		}
	}, [router]);

	switch (mostPopularChoosed) {
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
						<span className='films-category-heading-text'>{headingTitlePage}</span>
						<section className='films-category-filter-btns'>
							<section className='relative' ref={mostPopularDropdownRef}>
								<button className={`films-category-filter-btn`} onClick={handleMostPopularClick}>
									<Bars3BottomLeftIcon className='h-5' />
									<span className='text-sm font-medium pl-2 lg:flex hidden'>
										{mostPopularChoosed === 'most_popular'
											? 'Najbadziej popularne'
											: mostPopularChoosed === 'last_added'
											? 'Ostatnio dodane'
											: mostPopularChoosed === 'highest_rating'
											? 'Najlepiej oceniane'
											: mostPopularChoosed === 'highest_budget'
											? 'Największy budżet'
											: mostPopularChoosed === 'highest_profit'
											? 'Największy przychód'
											: ''}
									</span>
								</button>
								<div className={`filter-dropdown ${mostPopularBtnClicked ? 'active' : ''} select-none`}>
									<button
										className={`filtering-dropdown-btns ${mostPopularChoosed === 'most_popular' ? 'choosed' : ''}`}
										onClick={() => {
											router.push(`?order=most_popular`);
											setMostPopularBtnClicked(false);
											setMostPopularChoosed('most_popular');
										}}>
										Najbardziej popularne
									</button>
									<button
										className={`filtering-dropdown-btns ${mostPopularChoosed === 'last_added' ? 'choosed' : ''}`}
										onClick={() => {
											router.push(`?order=last_added`);
											setMostPopularBtnClicked(false);
											setMostPopularChoosed('last_added');
										}}>
										Ostatnio dodane
									</button>
									<button
										className={`filtering-dropdown-btns ${mostPopularChoosed === 'highest_rating' ? 'choosed' : ''}`}
										onClick={() => {
											router.push(`?order=highest_rating`);
											setMostPopularBtnClicked(false);
											setMostPopularChoosed('highest_rating');
										}}>
										Najlepiej oceniane
									</button>
									<button
										className={`filtering-dropdown-btns ${mostPopularChoosed === 'highest_budget' ? 'choosed' : ''}`}
										onClick={() => {
											router.push(`?order=highest_budget`);
											setMostPopularBtnClicked(false);
											setMostPopularChoosed('highest_budget');
										}}>
										Największy budżet
									</button>
									<button
										className={`filtering-dropdown-btns ${mostPopularChoosed === 'highest_profit' ? 'choosed' : ''}`}
										onClick={() => {
											router.push(`?order=highest_profit`);
											setMostPopularBtnClicked(false);
											setMostPopularChoosed('highest_profit');
										}}>
										Największy przychód
									</button>
								</div>
							</section>
							<section className='relative' ref={siatkaDropdownRef}>
								<button className={`films-category-filter-btn`} onClick={handleSiatkaClick}>
									{siatkaChoosed === 'Siatka' ? (
										<Squares2X2Icon className='h-5' />
									) : siatkaChoosed === 'Pejzaz' ? (
										<ViewColumnsIcon className='h-5' />
									) : (
										<ListBulletIcon className='h-5' />
									)}
									<span className='text-sm font-medium pl-2 lg:flex hidden'>
										{siatkaChoosed === 'Siatka'
											? 'Siatka'
											: siatkaChoosed === 'Pejzaz'
											? 'Pejzaż'
											: siatkaChoosed === 'Lista'
											? 'Lista'
											: ''}
									</span>
								</button>
								<div className={`filter-dropdown filter-siatka ${siatkaClicked ? 'active' : ''} select-none`}>
									<button
										className={`filtering-dropdown-btns ${siatkaChoosed === 'Siatka' ? 'choosed' : ''}`}
										onClick={() => {
											setSiatkaClicked(false);
											setSiatkaChoosed('Siatka');
										}}>
										Siatka
									</button>
									<button
										className={`filtering-dropdown-btns ${siatkaChoosed === 'Pejzaz' ? 'choosed' : ''}`}
										onClick={() => {
											setSiatkaClicked(false);
											setSiatkaChoosed('Pejzaz');
										}}>
										Pejzaż
									</button>
									<button
										className={`filtering-dropdown-btns ${siatkaChoosed === 'Lista' ? 'choosed' : ''}`}
										onClick={() => {
											setSiatkaClicked(false);
											setSiatkaChoosed('Lista');
										}}>
										Lista
									</button>
								</div>
							</section>
						</section>
					</section>
					{siatkaChoosed === 'Siatka' ? (
						<section className='films-wrapper'>
							{mappingBy.map((film: FilmData, index: number) => (
								<article className='film-container w-full' key={index}>
									<section className='films-image-section relative'>
										<Link href={`/titles/${film.ref}/${convertTitleToUrl(film.title)}`}>
											<img src={film.image} className='max-h-[17.2rem]' alt={`Poster for ${film.title}`} />
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
											href={`/titles/${film.ref}/${convertTitleToUrl(film.title)}`}
											className='film-link-title search-title pr-1'>
											{film.title}
										</Link>
									</section>
								</article>
							))}
						</section>
					) : siatkaChoosed === 'Pejzaz' ? (
						<section className='films-wrapper-pejzaz'>
							{mappingBy.map((film: FilmData, index: number) => (
								<article className='film-container-pejzaz w-full' key={index}>
									<section className='films-image-section'>
										<Link href={`/titles/${film.ref}/${convertTitleToUrl(film.title)}`}>
											<img src={film.imgFullHd500} alt={`Poster for ${film.title}`} />
											<button className='film-play-btn'>
												<PlayIcon className='text-black h-5' />
											</button>
										</Link>
									</section>
									<section className='films-text-section'>
										<Link
											href={`/titles/${film.ref}/${convertTitleToUrl(film.title)}`}
											className='film-link-title search-title pr-1'>
											{film.title}
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
					) : siatkaChoosed === 'Lista' ? (
						<section className='films-wrapper-list'>
							{mappingBy.map((film: FilmData, index: number) => (
								<article className='film-container-list w-full' key={index}>
									<section className='films-image-section'>
										<Link href={`/titles/${film.ref}/${convertTitleToUrl(film.title)}`}>
											<img className='max-h-46 max-w-32 pr-2' src={film.image} alt={`Poster for ${film.title}`} />
											<button className='film-play-btn'>
												<PlayIcon className='text-black h-5' />
											</button>
										</Link>
									</section>
									<section className='films-text-section'>
										<Link
											href={`/titles/${film.ref}/${convertTitleToUrl(film.title)}`}
											className='film-link-title search-title pr-1'>
											{film.title}
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
												<span>
													{film.rating} / 10 &nbsp;&nbsp;
													<span
														className='film-list-rating-separate-symbol'
														style={{
															color: 'var(--gray-5050)',
														}}>
														|
													</span>
												</span>
											</section>
											<button className='rate-this-btn flex items-center gap-x-2'>
												<StarIcon className='h-4' />
												Oceń to
											</button>
										</section>
										<p className='film-list-description'>{film.description}</p>
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
							className={`${mostPopularChoosed === 'most_popular' ? 'choosed' : ''}`}
							onClick={() => {
								router.push(`?order=most_popular`);
								setMostPopularBtnClicked(false);
								setMostPopularChoosed('most_popular');
							}}>
							Najbardziej popularne
						</button>
						<button
							className={`${mostPopularChoosed === 'last_added' ? 'choosed' : ''}`}
							onClick={() => {
								router.push(`?order=last_added`);
								setMostPopularBtnClicked(false);
								setMostPopularChoosed('last_added');
							}}>
							Ostatnio dodane
						</button>
						<button
							className={`${mostPopularChoosed === 'highest_rating' ? 'choosed' : ''}`}
							onClick={() => {
								router.push(`?order=highest_rating`);
								setMostPopularBtnClicked(false);
								setMostPopularChoosed('highest_rating');
							}}>
							Najlepiej oceniane
						</button>
						<button
							className={`${mostPopularChoosed === 'highest_budget' ? 'choosed' : ''}`}
							onClick={() => {
								router.push('?order=highest_budget');
								setMostPopularBtnClicked(false);
								setMostPopularChoosed('highest_budget');
							}}>
							Najwiekszy budzet
						</button>
						<button
							className={`${mostPopularChoosed === 'highest_profit' ? 'choosed' : ''}`}
							onClick={() => {
								router.push('?order=highest_profit');
								setMostPopularBtnClicked(false);
								setMostPopularChoosed('highest_profit');
							}}>
							Najwiekszy przychod
						</button>
					</div>
				) : siatkaClicked ? (
					<div className='!h-32'>
						<button
							className={`${siatkaChoosed === 'Siatka' ? 'choosed' : ''}`}
							onClick={() => {
								setSiatkaClicked(false);
								setSiatkaChoosed('Siatka');
							}}>
							Siatka
						</button>
						<button
							className={`${siatkaChoosed === 'Pejzaz' ? 'choosed' : ''}`}
							onClick={() => {
								setSiatkaClicked(false);
								setSiatkaChoosed('Pejzaz');
							}}>
							Pejzaz
						</button>
						<button
							className={`${siatkaChoosed === 'Lista' ? 'choosed' : ''}`}
							onClick={() => {
								setSiatkaClicked(false);
								setSiatkaChoosed('Lista');
							}}>
							Lista
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
