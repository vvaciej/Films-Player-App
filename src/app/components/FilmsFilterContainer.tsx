'use client';

import { Navbar } from '../layouts/Navbar';
import { Footer } from '../layouts/Footer';
import '../../style/css/filteres-page.css';
import useDocumentTitle from '../helpers/PageTitle';
import getCookie from '../helpers/GetCookie';

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
	imgFullHd: string;
	releaseDate: string;
};

interface FilterPageProps {
	headingTitlePage: string;
	mappingBy: FilmData[];
}

const Filters: React.FC<FilterPageProps> = ({ headingTitlePage, mappingBy }) => {
	useDocumentTitle('Wyszukiwarka filmów - vvaciej.app');

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
		setMostPopularChoosed(mostPopularCookie || 'Najbardziej popularne');
	}, [siatkaChoosed]);

	const [mostPopularBtnClicked, setMostPopularBtnClicked] = useState<boolean>(false);
	const [filterBtnClicked, setFilterBtnClicked] = useState<boolean>(false);
	const [siatkaClicked, setSiatkaClicked] = useState<boolean>(false);

	const [gatunekClicked, setGatunekClicked] = useState<boolean>(false);
	const [dataWydaniaClicked, setDataWydaniaClicked] = useState<boolean>(false);
	const [ocenaClicked, setOcenaClicked] = useState<boolean>(false);
	const [czasTrwaniaClicked, setCzasTrwaniaClicked] = useState<boolean>(false);
	const [orginalnyJezykClicked, setOrginalnyJezykClicked] = useState<boolean>(false);
	const [nakreconoWClicked, setNakreconoWClicked] = useState<boolean>(false);
	const [ograniczeniaWiekoweClicked, setOgraniczeniaWiekoweClicked] = useState<boolean>(false);
	const [budzetClicked, setBudzetClicked] = useState<boolean>(false);
	const [przychodClicked, setPrzychodClicked] = useState<boolean>(false);

	const handleMostPopularClick = () => {
		setMostPopularBtnClicked(prevState => !prevState);
		setFilterBtnClicked(false);
		setSiatkaClicked(false);
	};

	const handleFilterClick = () => {
		setFilterBtnClicked(prevState => !prevState);
		setMostPopularBtnClicked(false);
		setSiatkaClicked(false);
	};

	const handleSiatkaClick = () => {
		setSiatkaClicked(prevState => !prevState);
		setMostPopularBtnClicked(false);
		setFilterBtnClicked(false);
	};

	switch (mostPopularChoosed) {
		case 'Najbardziej popularne':
			mappingBy.sort((a: FilmData, b: FilmData) => b.filmwebPopularity - a.filmwebPopularity);
			break;
		case 'Ostatnio dodane':
			mappingBy.sort((a: FilmData, b: FilmData) => new Date(b.addedDate).getTime() - new Date(a.addedDate).getTime());
			break;
		case 'Najlepiej oceniane':
			mappingBy.sort((a: FilmData, b: FilmData) => b.rating - a.rating);
			break;
		case 'Największy budżet':
			mappingBy.sort((a: FilmData, b: FilmData) => b.budget - a.budget);
			break;
		case 'Największy przychód':
			mappingBy.sort((a: FilmData, b: FilmData) => b.profit - a.profit);
			break;
	}

	const mostPopularDropdownRef = useRef<HTMLDivElement>(null);
	const filterDropdownRef = useRef<HTMLDivElement>(null);
	const siatkaDropdownRef = useRef<HTMLDivElement>(null);

	const dropdownMobilesRef = useRef<HTMLDivElement>(null);

	const handleDocumentClick = (event: MouseEvent) => {
		const isInsideDropdown = (target: EventTarget | null, dropdownRef: React.RefObject<HTMLDivElement>) => {
			return dropdownRef.current && dropdownRef.current.contains(target as Node);
		};

		if (
			!isInsideDropdown(event.target, mostPopularDropdownRef) &&
			!isInsideDropdown(event.target, filterDropdownRef) &&
			!isInsideDropdown(event.target, siatkaDropdownRef) &&
			!isInsideDropdown(event.target, dropdownMobilesRef)
		) {
			setMostPopularBtnClicked(false);
			setFilterBtnClicked(false);
			setSiatkaClicked(false);
		}
	};

	useEffect(() => {
		document.body.addEventListener('click', handleDocumentClick);

		return () => {
			document.body.removeEventListener('click', handleDocumentClick);
		};
	}, []);

	const clearFilters = () => {
		setGatunekClicked(false);
		setDataWydaniaClicked(false);
		setOcenaClicked(false);
		setCzasTrwaniaClicked(false);
		setOrginalnyJezykClicked(false);
		setNakreconoWClicked(false);
		setOgraniczeniaWiekoweClicked(false);
		setBudzetClicked(false);
		setPrzychodClicked(false);

		const inputElements = document.querySelectorAll('input[type="checkbox"]');
		inputElements.forEach(input => {
			(input as HTMLInputElement).checked = false;
		});
	};

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
									<span>{mostPopularChoosed}</span>
								</button>
								<div className={`filter-dropdown ${mostPopularBtnClicked ? 'active' : ''} select-none`}>
									<button
										className={`${mostPopularChoosed === 'Najbardziej popularne' ? 'choosed' : ''}`}
										onClick={() => {
											setMostPopularBtnClicked(false);
											setMostPopularChoosed('Najbardziej popularne');
										}}>
										Najbardziej popularne
									</button>
									<button
										className={`${mostPopularChoosed === 'Ostatnio dodane' ? 'choosed' : ''}`}
										onClick={() => {
											setMostPopularBtnClicked(false);
											setMostPopularChoosed('Ostatnio dodane');
										}}>
										Ostatnio dodane
									</button>
									<button
										className={`${mostPopularChoosed === 'Najlepiej oceniane' ? 'choosed' : ''}`}
										onClick={() => {
											setMostPopularBtnClicked(false);
											setMostPopularChoosed('Najlepiej oceniane');
										}}>
										Najlepiej oceniane
									</button>
									<button
										className={`${mostPopularChoosed === 'Największy budżet' ? 'choosed' : ''}`}
										onClick={() => {
											setMostPopularBtnClicked(false);
											setMostPopularChoosed('Największy budżet');
										}}>
										Największy budżet
									</button>
									<button
										className={`${mostPopularChoosed === 'Największy przychód' ? 'choosed' : ''}`}
										onClick={() => {
											setMostPopularBtnClicked(false);
											setMostPopularChoosed('Największy przychód');
										}}>
										Największy przychód
									</button>
								</div>
							</section>
							<section className='relative' ref={filterDropdownRef}>
								<button className={`films-category-filter-btn`} onClick={handleFilterClick}>
									<AdjustmentsHorizontalIcon className='h-5' />
									<span>Filtry</span>
								</button>
								<div className={`filter-dropdown filters-section ${filterBtnClicked ? 'active' : ''} select-none`}>
									<section className='flex items-center w-full justify-between px-3 pt-2 pb-3 text-xs font-medium'>
										<button id='clear-filters' onClick={clearFilters}>
											Wyczyść
										</button>
										<span
											style={{
												fontSize: '13.5px',
											}}>
											Filtry
										</span>
										<button id='apply-filters' onClick={() => setFilterBtnClicked(false)}>
											Zastosuj
										</button>
									</section>
									<section
										style={{
											maxHeight: '42rem',
											overflowY: 'auto',
										}}>
										<label htmlFor='gatunek' className='!border-t-0'>
											<input
												type='checkbox'
												id='gatunek'
												className='orange-checkbox'
												onClick={() => setGatunekClicked(!gatunekClicked)}
											/>
											<span>Gatunek</span>
											<ChevronDownIcon className='h-4 filters-chevron-down-icon' />
										</label>
										<div className={`filter-dropdown-label ${gatunekClicked ? 'active' : ''}`}>
											<section className='filter-dropdown-content'>
												<input type='text' placeholder='Wybierz gatunek' />
											</section>
										</div>
										<label htmlFor='dataWydania'>
											<input
												type='checkbox'
												id='dataWydania'
												className='orange-checkbox'
												onClick={() => setDataWydaniaClicked(!dataWydaniaClicked)}
											/>
											<span>Data Wydania</span>
											<ChevronDownIcon className='h-4 filters-chevron-down-icon' />
										</label>
										<div className={`filter-dropdown-label ${dataWydaniaClicked ? 'active' : ''}`}>
											<section className='filter-dropdown-content'>
												<input type='date' />
											</section>
										</div>
										<label htmlFor='ocena'>
											<input
												type='checkbox'
												id='ocena'
												className='orange-checkbox'
												onClick={() => setOcenaClicked(!ocenaClicked)}
											/>
											<span>Ocena</span>
											<ChevronDownIcon className='h-4 filters-chevron-down-icon' />
										</label>
										<div className={`filter-dropdown-label filter-column filter-ocena ${ocenaClicked ? 'active' : ''}`}>
											<section className='filter-dropdown-content'>
												<input type='text' />
												<input type='text' />
											</section>
										</div>
										<label htmlFor='czasTrwania'>
											<input
												type='checkbox'
												id='czasTrwania'
												className='orange-checkbox'
												onClick={() => setCzasTrwaniaClicked(!czasTrwaniaClicked)}
											/>
											<span>Czas Trwania</span>
											<ChevronDownIcon className='h-4 filters-chevron-down-icon' />
										</label>
										<div
											className={`filter-dropdown-label filter-column filter-2input-1text ${
												czasTrwaniaClicked ? 'active' : ''
											}`}>
											<section className='filter-dropdown-content'>
												<span className='w-full text-left pl-4'>Czas trwania w minutach</span>
												<input type='text' />
												<input type='text' />
											</section>
										</div>
										<label htmlFor='orginalnyJezyk'>
											<input
												type='checkbox'
												id='orginalnyJezyk'
												className='orange-checkbox'
												onClick={() => setOrginalnyJezykClicked(!orginalnyJezykClicked)}
											/>
											<span>Orginalny język</span>
											<ChevronDownIcon className='h-4 filters-chevron-down-icon' />
										</label>
										<div className={`filter-dropdown-label ${orginalnyJezykClicked ? 'active' : ''}`}>
											<section className='filter-dropdown-content'>
												<input type='text' placeholder='Wybierz język' />
											</section>
										</div>
										<label htmlFor='nakreconoW'>
											<input
												type='checkbox'
												id='nakreconoW'
												className='orange-checkbox'
												onClick={() => setNakreconoWClicked(!nakreconoWClicked)}
											/>
											<span>Nakręcono w</span>
											<ChevronDownIcon className='h-4 filters-chevron-down-icon' />
										</label>
										<div className={`filter-dropdown-label ${nakreconoWClicked ? 'active' : ''}`}>
											<section className='filter-dropdown-content'>
												<input type='text' placeholder='Wybierz kraj' />
											</section>
										</div>
										<label htmlFor='ograniczeniaWiekowe'>
											<input
												type='checkbox'
												id='ograniczeniaWiekowe'
												className='orange-checkbox'
												onClick={() => setOgraniczeniaWiekoweClicked(!ograniczeniaWiekoweClicked)}
											/>
											<span>Ograniczenia Wiekowe</span>
											<ChevronDownIcon className='h-4 filters-chevron-down-icon' />
										</label>
										<div className={`filter-dropdown-label ${ograniczeniaWiekoweClicked ? 'active' : ''}`}>
											<section className='filter-dropdown-content'>
												<input type='text' placeholder='Wybierz' />
											</section>
										</div>
										<label htmlFor='budzet'>
											<input
												type='checkbox'
												id='budzet'
												className='orange-checkbox'
												onClick={() => setBudzetClicked(!budzetClicked)}
											/>
											<span>Budżet</span>
											<ChevronDownIcon className='h-4 filters-chevron-down-icon' />
										</label>
										<div
											className={`filter-dropdown-label filter-column filter-2input-1text ${
												budzetClicked ? 'active' : ''
											}`}>
											<section className='filter-dropdown-content'>
												<span className='w-full text-left pl-4'>W dolarach amerykańskich $</span>
												<input type='text' placeholder='Wybierz kraj' />
												<input type='text' />
											</section>
										</div>
										<label htmlFor='przychod'>
											<input
												type='checkbox'
												id='przychod'
												className='orange-checkbox'
												onClick={() => setPrzychodClicked(!przychodClicked)}
											/>
											<span>Przychód</span>
											<ChevronDownIcon className='h-4 filters-chevron-down-icon' />
										</label>
										<div
											className={`filter-dropdown-label filter-column filter-2input-1text ${
												przychodClicked ? 'active' : ''
											}`}>
											<section className='filter-dropdown-content'>
												<span className='w-full text-left pl-4'>W dolarach amerykańskich $</span>
												<input type='text' placeholder='Wybierz kraj' />
												<input type='text' />
											</section>
										</div>
									</section>
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
									<span>{siatkaChoosed}</span>
								</button>
								<div className={`filter-dropdown filter-siatka ${siatkaClicked ? 'active' : ''} select-none`}>
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
							</section>
						</section>
					</section>
					{siatkaChoosed === 'Siatka' ? (
						<section className='films-wrapper'>
							{mappingBy.map((film: FilmData, index: number) => (
								<article className='film-container w-full' key={index}>
									<section className='films-image-section'>
										<Link href='#'>
											<img src={film.image} alt={`Poster for ${film.title}`} />
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
										<Link href='#' className='film-link-title search-title pr-1'>
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
										<Link href='#'>
											<img src={film.imgFullHd} alt={`Poster for ${film.title}`} />
											<button className='film-play-btn'>
												<PlayIcon className='text-black h-5' />
											</button>
										</Link>
									</section>
									<section className='films-text-section'>
										<Link href='#' className='film-link-title search-title pr-1'>
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
										<Link href='#'>
											<img src={film.image} alt={`Poster for ${film.title}`} />
											<button className='film-play-btn'>
												<PlayIcon className='text-black h-5' />
											</button>
										</Link>
									</section>
									<section className='films-text-section'>
										<Link href='#' className='film-link-title search-title pr-1'>
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
							className={`${mostPopularChoosed === 'Najbardziej popularne' ? 'choosed' : ''}`}
							onClick={() => {
								setMostPopularBtnClicked(false);
								setMostPopularChoosed('Najbardziej popularne');
							}}>
							Najbardziej popularne
						</button>
						<button
							className={`${mostPopularChoosed === 'Ostatnio dodane' ? 'choosed' : ''}`}
							onClick={() => {
								setMostPopularBtnClicked(false);
								setMostPopularChoosed('Ostatnio dodane');
							}}>
							Ostatnio dodane
						</button>
						<button
							className={`${mostPopularChoosed === 'Najlepiej oceniane' ? 'choosed' : ''}`}
							onClick={() => {
								setMostPopularBtnClicked(false);
								setMostPopularChoosed('Najlepiej oceniane');
							}}>
							Najlepiej oceniane
						</button>
						<button
							className={`${mostPopularChoosed === 'Największy budżet' ? 'choosed' : ''}`}
							onClick={() => {
								setMostPopularBtnClicked(false);
								setMostPopularChoosed('Największy budżet');
							}}>
							Największy budżet
						</button>
						<button
							className={`${mostPopularChoosed === 'Największy przychód' ? 'choosed' : ''}`}
							onClick={() => {
								setMostPopularBtnClicked(false);
								setMostPopularChoosed('Największy przychód');
							}}>
							Największy przychód
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
