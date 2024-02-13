'use client';

import { Navbar } from '../layouts/Navbar';
import { Footer } from '../layouts/Footer';
import '../../style/css/filteres-page.css';
import useDocumentTitle from '../helpers/PageTitle';
import {
	StarIcon,
	PlayIcon,
	AdjustmentsHorizontalIcon,
	Bars3BottomLeftIcon,
	Squares2X2Icon,
	ChevronDownIcon,
} from '@heroicons/react/24/solid';
import { useEffect, useRef, useState } from 'react';

type FilmData = {
	image: string;
	title: string;
	rating: number;
	addedDate: string;
	filmwebPopularity: number;
	budget: number;
	profit: number;
};

interface FilterPageProps {
	headingTitlePage: string;
	mappingBy: FilmData[];
}

const Filters: React.FC<FilterPageProps> = ({ headingTitlePage, mappingBy }) => {
	useDocumentTitle('Wyszukiwarka filmów - vvaciej.app');

	const [mostPopularBtnClicked, setMostPopularBtnClicked] = useState<boolean>(false);
	const [filterBtnClicked, setFilterBtnClicked] = useState<boolean>(false);
	const [siatkaClicked, setSiatkaClicked] = useState<boolean>(false);

	const [mostPopularChoosed, setMostPopularChoosed] = useState<string>('Najbardziej popularne');
	const [siatkaChoosed, setSiatkaChoosed] = useState<string>('Siatka');

	const [selectedMostPopular, setSelectedMostPopular] = useState<string>('najbardziejPopularne');
	const [selectedSiatka, setSelectedSiatka] = useState<string>('siatka');

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

	switch(mostPopularChoosed) {
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

	const mostPopularDropdownMobilesRef = useRef<HTMLDivElement>(null);

	const handleDocumentClick = (event: MouseEvent) => {
		const isInsideDropdown = (target: EventTarget | null, dropdownRef: React.RefObject<HTMLDivElement>) => {
			return dropdownRef.current && dropdownRef.current.contains(target as Node);
		};

		if (
			!isInsideDropdown(event.target, mostPopularDropdownRef) &&
			!isInsideDropdown(event.target, filterDropdownRef) &&
			!isInsideDropdown(event.target, siatkaDropdownRef) &&
			!isInsideDropdown(event.target, mostPopularDropdownMobilesRef)
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
										className={`${selectedMostPopular === 'najbardziejPopularne' ? 'choosed' : ''}`}
										onClick={() => {
											setMostPopularBtnClicked(false);
											setSelectedMostPopular('najbardziejPopularne');
											setMostPopularChoosed('Najbardziej popularne');
										}}>
										Najbardziej popularne
									</button>
									<button
										className={`${selectedMostPopular === 'ostatnioDodane' ? 'choosed' : ''}`}
										onClick={() => {
											setMostPopularBtnClicked(false);
											setSelectedMostPopular('ostatnioDodane');
											setMostPopularChoosed('Ostatnio dodane');
										}}>
										Ostatnio dodane
									</button>
									<button
										className={`${selectedMostPopular === 'najlepiejOceniane' ? 'choosed' : ''}`}
										onClick={() => {
											setMostPopularBtnClicked(false);
											setSelectedMostPopular('najlepiejOceniane');
											setMostPopularChoosed('Najlepiej oceniane');
										}}>
										Najlepiej oceniane
									</button>
									<button
										className={`${selectedMostPopular === 'najwiekszyBudzet' ? 'choosed' : ''}`}
										onClick={() => {
											setMostPopularBtnClicked(false);
											setSelectedMostPopular('najwiekszyBudzet');
											setMostPopularChoosed('Największy budżet');
										}}>
										Największy budżet
									</button>
									<button
										className={`${selectedMostPopular === 'najwiekszyPrzychod' ? 'choosed' : ''}`}
										onClick={() => {
											setMostPopularBtnClicked(false);
											setSelectedMostPopular('najwiekszyPrzychod');
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
										{/* <div className={`filter-dropdown-ontype`}>

                    </div> */}
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
									<Squares2X2Icon className='h-5' />
									<span>{siatkaChoosed}</span>
								</button>
								<div className={`filter-dropdown filter-web ${siatkaClicked ? 'active' : ''} select-none`}>
									<button
										className={`${selectedSiatka === 'siatka' ? 'choosed' : ''}`}
										onClick={() => {
											setSiatkaClicked(false);
											setSelectedSiatka('siatka');
											setSiatkaChoosed('Siatka');
										}}>
										Siatka
									</button>
									<button
										className={`${selectedSiatka === 'pejzaz' ? 'choosed' : ''}`}
										onClick={() => {
											setSiatkaClicked(false);
											setSelectedSiatka('pejzaz');
											setSiatkaChoosed('Pejzaż');
										}}>
										Pejzaż
									</button>
									<button
										className={`${selectedSiatka === 'lista' ? 'choosed' : ''}`}
										onClick={() => {
											setSiatkaClicked(false);
											setSelectedSiatka('lista');
											setSiatkaChoosed('Lista');
										}}>
										Lista
									</button>
								</div>
							</section>
						</section>
					</section>
					<section className='films-wrapper'>
						{mappingBy.map((film: FilmData, index: number) => (
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
					</section>
				</div>
			</div>
			<Footer />
			<div
				ref={mostPopularDropdownMobilesRef}
				className={`typical-dropdown-style ${mostPopularBtnClicked ? 'active' : ''} !h-56`}>
				{mostPopularBtnClicked ? (
					<div>
						<button
							className={`${selectedMostPopular === 'najbardziejPopularne' ? 'choosed' : ''}`}
							onClick={() => {
								setMostPopularBtnClicked(false);
								setSelectedMostPopular('najbardziejPopularne');
								setMostPopularChoosed('Najbardziej popularne');
							}}>
							Najbardziej popularne
						</button>
						<button
							className={`${selectedMostPopular === 'ostatnioDodane' ? 'choosed' : ''}`}
							onClick={() => {
								setMostPopularBtnClicked(false);
								setSelectedMostPopular('ostatnioDodane');
								setMostPopularChoosed('Ostatnio dodane');
							}}>
							Ostatnio dodane
						</button>
						<button
							className={`${selectedMostPopular === 'najlepiejOceniane' ? 'choosed' : ''}`}
							onClick={() => {
								setMostPopularBtnClicked(false);
								setSelectedMostPopular('najlepiejOceniane');
								setMostPopularChoosed('Najlepiej oceniane');
							}}>
							Najlepiej oceniane
						</button>
						<button
							className={`${selectedMostPopular === 'najwiekszyBudzet' ? 'choosed' : ''}`}
							onClick={() => {
								setMostPopularBtnClicked(false);
								setSelectedMostPopular('najwiekszyBudzet');
								setMostPopularChoosed('Największy budżet');
							}}>
							Największy budżet
						</button>
						<button
							className={`${selectedMostPopular === 'najwiekszyPrzychod' ? 'choosed' : ''}`}
							onClick={() => {
								setMostPopularBtnClicked(false);
								setSelectedMostPopular('najwiekszyPrzychod');
								setMostPopularChoosed('Największy przychód');
							}}>
							Największy przychód
						</button>
					</div>
				) : (
					''
				)}
			</div>
			<div className={`opacity-el ${mostPopularBtnClicked ? 'active' : ''}`}></div>
		</div>
	);
};

export default Filters;
