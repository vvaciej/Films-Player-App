'use client';

import { MagnifyingGlassIcon, Bars3Icon, UserIcon } from '@heroicons/react/24/solid';
import { TvIcon, FilmIcon } from '@heroicons/react/24/outline';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

import React from 'react';

import {
	popularFilms,
	lastAddedFilms,
	popularActionFilms,
	popularComediaFilms,
	popularHorrorFilms,
	popularPolishFilms,
	popularSerials,
} from '../data/main-films';

const allFilmsData = [
	...popularFilms,
	...lastAddedFilms,
	...popularActionFilms,
	...popularComediaFilms,
	...popularHorrorFilms,
	...popularPolishFilms,
	...popularSerials,
];
interface NavbarProps {
	isCutted: boolean;
}

type FilmData = {
	image: string;
	title: string;
	year: number;
	type: string;
};

export const Navbar: React.FC<NavbarProps> = ({ isCutted }) => {
	const [isClickedBtn, setIsClickedBtn] = useState<boolean>(false);
	const [isUserOrMenuClicked, setIsUserOrMenuClicked] = useState<string | null>(null);
	const [isTyped, setIsTyped] = useState<boolean>(false);
	const [searchResults, setSearchResults] = useState<FilmData[]>([]);
	const [isSearchResultsNull, setIsSearchResultsNull] = useState<boolean>(true);
	const [whatSearchVal, setWhatSearchVal] = useState<string>('');

	const dropdownRef = useRef<HTMLDivElement>(null);
	const headerEl = useRef<HTMLElement>(null);

	const handleClickBtnDropdown = () => {
		setIsClickedBtn(!isClickedBtn);
	};

	const handleSearchDirectPage = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'Enter') {
			event.preventDefault();

			window.location.href = `/results?search_query=${encodeURIComponent(whatSearchVal)}`;
		}
	};

	const normalizePolishCharacters = (input: string): string => {
		const polishCharactersMap: Record<string, string> = {
			ą: 'a',
			ć: 'c',
			ę: 'e',
			ł: 'l',
			ń: 'n',
			ó: 'o',
			ś: 's',
			ź: 'z',
			ż: 'z',
		};

		return input.replace(/[ąćęłńóśźż]/g, match => polishCharactersMap[match]);
	};

	const handleSearchType = (event: React.ChangeEvent<HTMLInputElement>) => {
		const inputVal = normalizePolishCharacters(event.target.value.toLowerCase());
		setWhatSearchVal(inputVal);
		const uniqueTitles = new Set<string>();

		const filteredData = allFilmsData.filter(film => {
			const lowerCaseTitle = normalizePolishCharacters(film.title.toLowerCase());

			return !uniqueTitles.has(lowerCaseTitle) && lowerCaseTitle.includes(inputVal)
				? uniqueTitles.add(lowerCaseTitle)
				: false;
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

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				!dropdownRef.current?.contains(event.target as HTMLElement) &&
				!headerEl.current?.contains(event.target as HTMLElement)
			) {
				setIsClickedBtn(false);
			}
		};

		document.addEventListener('click', handleClickOutside);
		return () => {
			document.removeEventListener('click', handleClickOutside);
		};
	}, []);

	return (
		<>
			<header className='header-container' ref={headerEl}>
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
									onFocus={event => {
										if (event.target.value.length > 0 && !isSearchResultsNull) {
											setIsTyped(true);
										}
									}}
									onBlur={() => setIsTyped(false)}
								/>
								<button type='submit' style={{ display: 'none' }}></button>
							</form>
							<Link href='/results' className='header-search-icon-link'>
								<MagnifyingGlassIcon className='header-search-icon min-h-9 p-2' />
							</Link>
							<div className={`input-box-search ${isTyped ? 'active' : ''}`}>
								<ul>
									{searchResults.map((film: FilmData, index: number) => (
										<li key={index}>
											<img src={film.image} alt={film.title} />
											<section>
												<h1>{film.title}</h1>
												<span>{film.year}</span>
												<span>{film.type}</span>
											</section>
										</li>
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
								<Link href='/movies'>
									<FilmIcon className='header-fa' />
									<span>Filmy</span>
								</Link>
							</section>
							<section>
								<Link href='/series'>
									<TvIcon className='header-fa' />
									<span>Seriale</span>
								</Link>
							</section>
						</section>
					</nav>
				</section>
				<nav className='header-right-section'>
					<Link href='/register' className='header-register-btn'>
						Rejestracja
					</Link>
					<Link href='/login' className='header-login-btn'>
						Logowanie
					</Link>
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
			<div ref={dropdownRef} className={`typical-dropdown-style ${isClickedBtn ? 'active' : ''}`}>
				{isUserOrMenuClicked === 'menu' ? (
					<nav>
						<Link href='/movies'>
							<FilmIcon className='h-5' />
							<span>Filmy</span>
						</Link>
						<Link href='/series'>
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
