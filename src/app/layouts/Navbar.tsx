'use client';

import { MagnifyingGlassIcon, Bars3Icon, UserIcon } from '@heroicons/react/24/solid';
import { TvIcon, FilmIcon } from '@heroicons/react/24/outline';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import normalizePolishCharacters from '../helpers/NormalizePolishSymbols';
import getCookie from '../helpers/GetCookie';

import React from 'react';

import { allFilms } from '../data/films-data';
import convertTitleToUrl from '../helpers/ConvertTitleToURL';

interface NavbarProps {
	isCutted: boolean;
}

type FilmData = {
	image: string;
	title: string;
	year: number;
	type: string;
	ref: number;
};

export const Navbar: React.FC<NavbarProps> = ({ isCutted }) => {
	const [isClickedBtn, setIsClickedBtn] = useState<boolean>(false);
	const [isUserOrMenuClicked, setIsUserOrMenuClicked] = useState<string | null>(null);
	const [isTyped, setIsTyped] = useState<boolean>(false);
	const [searchResults, setSearchResults] = useState<FilmData[]>([]);
	const [isSearchResultsNull, setIsSearchResultsNull] = useState<boolean>(true);
	const [whatSearchVal, setWhatSearchVal] = useState<string>('');

	const mobileDropdownsRef = useRef<HTMLDivElement>(null);
	const searchDropdownRef = useRef<HTMLDivElement>(null);
	const searchInputRef = useRef<HTMLInputElement>(null);

	const handleClickBtnDropdown = () => {
		setIsClickedBtn(!isClickedBtn);
	};

	const [isLogged, setIsLogged] = useState(getCookie('email') ? true : false);

	const deleteCookie = (name: string) => {
		document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
		setIsLogged(false);
	};

	const handleSearchDirectPage = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'Enter') {
			event.preventDefault();

			window.location.href = `/results?query=${encodeURIComponent(whatSearchVal)}`;
		}
	};

	const handleSearchType = (event: React.ChangeEvent<HTMLInputElement>) => {
		const inputVal = normalizePolishCharacters(event.target.value.toLowerCase());
		setWhatSearchVal(inputVal);

		const filteredData = allFilms.filter(film => {
			const lowerCaseTitle = normalizePolishCharacters(film.title.toLowerCase());

			return lowerCaseTitle.includes(inputVal);
		});

		setSearchResults(filteredData as FilmData[]);

		if (inputVal.length > 0 && filteredData.length > 0) {
			setIsTyped(true);
			setIsSearchResultsNull(false);
		} else {
			setIsTyped(false);
			setIsSearchResultsNull(true);
		}
	};

	const handleDocumentClick = (event: MouseEvent) => {
		const isInsideDropdown = (target: EventTarget | null, dropdownRef: React.RefObject<HTMLDivElement>) => {
			return dropdownRef.current && dropdownRef.current.contains(target as Node);
		};

		if (!isInsideDropdown(event.target, searchDropdownRef) && !isInsideDropdown(event.target, searchInputRef)) {
			setIsTyped(false);
		}

		if (!isInsideDropdown(event.target, mobileDropdownsRef)) {
			setIsClickedBtn(false);
		}
	};

	useEffect(() => {
		document.body.addEventListener('click', handleDocumentClick);

		return () => {
			document.body.removeEventListener('click', handleDocumentClick);
		};
	}, []);

	return (
		<>
			<header className='header-container'>
				<section className='header-left-section'>
					<Link href='/' className='header-brand-text'>
						VVACIEJ.APP
					</Link>
					<nav className={`header-left-nav-section ${isCutted ? 'navbar-cutted-style' : ''}`}>
						<section className='header-search-section'>
							<form
								onSubmit={event => {
									event.preventDefault();
								}}>
								<input
									type='text'
									placeholder='Szukaj filmu, serialu lub aktora...'
									className='header-search-input'
									onKeyUp={handleSearchDirectPage}
									value={whatSearchVal}
									onChange={handleSearchType}
									ref={searchInputRef}
									onFocus={event => {
										if (event.target.value.length > 0 && !isSearchResultsNull) {
											setIsTyped(true);
										}
									}}
								/>
								<button type='submit' style={{ display: 'none' }}></button>
							</form>
							<Link href='/results' className='header-search-icon-link'>
								<MagnifyingGlassIcon className='header-search-icon min-h-9 p-2' />
							</Link>
							<div className={`input-box-search ${isTyped ? 'active' : ''}`} ref={searchDropdownRef}>
								<ul>
									{searchResults.map((film: FilmData, index: number) => (
										<Link href={`/titles/${film.ref}/${convertTitleToUrl(film.title)}`} key={index}>
											<li>
												<img src={film.image} alt={film.title} />
												<section>
													<h1>{film.title}</h1>
													<span>{film.year}</span>
													<span>{film.type}</span>
												</section>
											</li>
										</Link>
									))}
								</ul>
							</div>
						</section>
						<button
							className='header-menu-btn'
							onClick={() => {
								setIsUserOrMenuClicked('menu');
								handleClickBtnDropdown();
							}}>
							<Bars3Icon className='h-7 header-menu-icon' />
						</button>
						<section className='header-btn-section'>
							<section>
								<Link href={`/movies?order=${getCookie('mostPopularChoosed') || 'most_popular'}`}>
									<FilmIcon className='header-fa' />
									<span>Filmy</span>
								</Link>
							</section>
							<section>
								<Link href={`/series?order=${getCookie('mostPopularChoosed') || 'most_popular'}`}>
									<TvIcon className='header-fa' />
									<span>Seriale</span>
								</Link>
							</section>
						</section>
					</nav>
				</section>
				<nav className='header-right-section'>
					{isLogged ? (
						<>
							<span>{getCookie('email') || ''}&nbsp;</span>
							<button onClick={() => deleteCookie('email')} className='header-login-btn'>
								Wyloguj się
							</button>
						</>
					) : (
						<>
							<Link href='/register' className='header-register-btn'>
								Rejestracja
							</Link>
							<Link href='/login' className='header-login-btn'>
								Logowanie
							</Link>
						</>
					)}
				</nav>
				<nav
					className='header-right-user-btn'
					onClick={() => {
						setIsUserOrMenuClicked('user');
						handleClickBtnDropdown();
					}}>
					<UserIcon className='h-6 header-right-user-icon' />
				</nav>
			</header>
			<div
				ref={mobileDropdownsRef}
				className={`typical-dropdown-style ${isClickedBtn ? 'active' : ''}`}
				style={{
					height: '6rem',
				}}>
				{isUserOrMenuClicked === 'menu' ? (
					<nav>
						<Link href={`/movies?order=${getCookie('mostPopularChoosed') || 'most_popular'}`}>
							<FilmIcon className='h-5' />
							<span>Filmy</span>
						</Link>
						<Link href={`/series?order=${getCookie('mostPopularChoosed') || 'most_popular'}`}>
							<TvIcon className='h-5' />
							<span>Seriale</span>
						</Link>
					</nav>
				) : (
					<nav>
						<Link href='/login'>Logowanie</Link>
						<Link href='/register'>Rejestracja</Link>
					</nav>
				)}
			</div>
			<div className={`opacity-el ${isClickedBtn ? 'active' : ''}`}></div>
		</>
	);
};
