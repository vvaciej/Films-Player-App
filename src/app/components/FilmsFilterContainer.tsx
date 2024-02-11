'use client';

import { Navbar } from '../layouts/Navbar';
import { Footer } from '../layouts/Footer';
import '../../style/css/series&movies.css';
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
};

interface FilterPageProps {
	headingTitlePage: string;
	mappingBy: any;
}

const Filters: React.FC<FilterPageProps> = ({ headingTitlePage, mappingBy }) => {
	useDocumentTitle('Wyszukiwarka filmów - vvaciej.app');

	const [mostPopularBtnClicked, setMostPopularBtnClicked] = useState<boolean>(false);
	const [filterBtnClicked, setFilterBtnClicked] = useState<boolean>(false);
	const [siatkaClicked, setSiatkaClicked] = useState<boolean>(false);

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
		setMostPopularBtnClicked(!mostPopularBtnClicked);
		setFilterBtnClicked(false);
		setSiatkaClicked(false);
	};

	const handleFilterClick = () => {
		setFilterBtnClicked(!filterBtnClicked);
		setMostPopularBtnClicked(false);
		setSiatkaClicked(false);
	};

	const handleSiatkaClick = () => {
		setSiatkaClicked(!siatkaClicked);
		setMostPopularBtnClicked(false);
		setFilterBtnClicked(false);
	};

	const mostPopularDropdownRef = useRef<HTMLDivElement>(null);
	const filterDropdownRef = useRef<HTMLDivElement>(null);
	const siatkaDropdownRef = useRef<HTMLDivElement>(null);

	const handleDocumentClick = (event: MouseEvent) => {
		const isInsideDropdown = (target: EventTarget | null, dropdownRef: React.RefObject<HTMLDivElement>) => {
			return dropdownRef.current && dropdownRef.current.contains(target as Node);
		};

		if (
			!isInsideDropdown(event.target, mostPopularDropdownRef) &&
			!isInsideDropdown(event.target, filterDropdownRef) &&
			!isInsideDropdown(event.target, siatkaDropdownRef)
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

  const [whatFilterTypeVal, setWhatFilterTypeVal] = useState<string>('');

	const handleFilterTypeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
		const inputVal = event.target.value.toLowerCase();
		setWhatFilterTypeVal(inputVal);
		const uniqueTitles = new Set<string>();

		// allFilmsData.forEach(film => {
		// 	if (film.title.toLowerCase().includes(inputVal)) {
		// 		uniqueTitles.add(film.title);
		// 	}
		// });

		// const filteredData = Array.from(uniqueTitles).map(title => allFilmsData.find(film => film.title === title));

		// setSearchResults(filteredData as FilmData[]);

		// if (inputVal.length > 0 && filteredData.length > 0) {
		// 	setIsTyped(true);
		// 	setIsSearchResultsNull(false);
		// } else {
		// 	setIsTyped(false);
		// 	setIsSearchResultsNull(true);
		// }
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
									<span>Najbardziej popularne</span>
								</button>
								<div className={`filter-dropdown ${mostPopularBtnClicked ? 'active' : ''} select-none`}>
									<button
										className={`${selectedMostPopular === 'najbardziejPopularne' ? 'choosed' : ''}`}
										onClick={() => {
											setMostPopularBtnClicked(false);
											setSelectedMostPopular('najbardziejPopularne');
										}}>
										Najbardziej popularne
									</button>
									<button
										className={`${selectedMostPopular === 'ostatnioDodane' ? 'choosed' : ''}`}
										onClick={() => {
											setMostPopularBtnClicked(false);
											setSelectedMostPopular('ostatnioDodane');
										}}>
										Ostatnio dodane
									</button>
									<button
										className={`${selectedMostPopular === 'najlepiejOceniane' ? 'choosed' : ''}`}
										onClick={() => {
											setMostPopularBtnClicked(false);
											setSelectedMostPopular('najlepiejOceniane');
										}}>
										Najlepiej oceniane
									</button>
									<button
										className={`${selectedMostPopular === 'najwiekszyBudzet' ? 'choosed' : ''}`}
										onClick={() => {
											setMostPopularBtnClicked(false);
											setSelectedMostPopular('najwiekszyBudzet');
										}}>
										Największy budżet
									</button>
									<button
										className={`${selectedMostPopular === 'najwiekszyPrzychod' ? 'choosed' : ''}`}
										onClick={() => {
											setMostPopularBtnClicked(false);
											setSelectedMostPopular('najwiekszyPrzychod');
										}}>
										Największy przychód
									</button>
								</div>
							</section>
							<section className='relative' ref={mostPopularDropdownRef}>
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
												// onChange={handleFilterTypeSearch}
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
									<span>Siatka</span>
								</button>
								<div className={`filter-dropdown filter-web ${siatkaClicked ? 'active' : ''} select-none`}>
									<button
										className={`${selectedSiatka === 'siatka' ? 'choosed' : ''}`}
										onClick={() => {
											setSiatkaClicked(false);
											setSelectedSiatka('siatka');
										}}>
										Siatka
									</button>
									<button
										className={`${selectedSiatka === 'pejzaz' ? 'choosed' : ''}`}
										onClick={() => {
											setSiatkaClicked(false);
											setSelectedSiatka('pejzaz');
										}}>
										Pejzaż
									</button>
									<button
										className={`${selectedSiatka === 'lista' ? 'choosed' : ''}`}
										onClick={() => {
											setSiatkaClicked(false);
											setSelectedSiatka('lista');
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
		</div>
	);
};

export default Filters;
