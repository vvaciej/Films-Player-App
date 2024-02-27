'use client';

import {
	MagnifyingGlassIcon,
	Bars3Icon,
	UserIcon,
	ChevronDownIcon,
	UserCircleIcon,
	Cog8ToothIcon,
	CheckBadgeIcon,
	ArrowRightEndOnRectangleIcon,
} from '@heroicons/react/24/solid';
import { TvIcon, FilmIcon } from '@heroicons/react/24/outline';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import normalizePolishCharacters from '../helpers/NormalizePolishSymbols';
import getCookie from '../helpers/GetCookie';
import { useTranslation } from 'react-i18next';

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
	const {t, i18n} = useTranslation();

	const [isClickedBtn, setIsClickedBtn] = useState<boolean>(false);
	const [isUserOrMenuClicked, setIsUserOrMenuClicked] = useState<string | null>(null);
	const [isTyped, setIsTyped] = useState<boolean>(false);
	const [searchResults, setSearchResults] = useState<FilmData[]>([]);
	const [isSearchResultsNull, setIsSearchResultsNull] = useState<boolean>(true);
	const [whatSearchVal, setWhatSearchVal] = useState<string>('');
	const [userDropdownClicked, setUserDropdownClicked] = useState(false);

	const mobileDropdownsRef = useRef<HTMLDivElement>(null);
	const searchDropdownRef = useRef<HTMLDivElement>(null);
	const searchInputRef = useRef<HTMLInputElement>(null);
	const userDropdownRef = useRef<HTMLDivElement>(null);
	const userBtnDropdownRef = useRef<any>(null);

	const [isLogged, setIsLogged] = useState(getCookie('email') ? true : false);

	const deleteCookie = (name: string) => {
		document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
		setIsLogged(false);
	};

	const handleSearchDirectPage = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'Enter') {
			event.preventDefault();

			window.location.href = `/${
				getCookie('langChoosed') === 'angielski' ? 'en' : 'pl'
			}/results?query=${encodeURIComponent(whatSearchVal)}`;
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

		if (
			!isInsideDropdown(event.target, userDropdownRef) &&
			!isInsideDropdown(event.target, mobileDropdownsRef) &&
			!isInsideDropdown(event.target, userBtnDropdownRef)
		) {
			setUserDropdownClicked(false);
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
			<header className='header-container !z-20'>
				<section className='header-left-section'>
					<Link href={`/${getCookie('langChoosed') === 'angielski' ? 'en' : 'pl'}`} className='header-brand-text'>
						VVACIEJ.APP
					</Link>
					<nav className={`header-left-nav-section ${isCutted ? 'navbar-cutted-style' : ''}`}>
						<section className='header-search-section'>
							<form
								className='header-search-form'
								onSubmit={event => {
									event.preventDefault();
								}}>
								<input
									type='text'
									placeholder={t('Szukaj filmu lub serialu')}
									className='header-search-input orange-outline-focus'
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
							<Link
								href={`/${getCookie('langChoosed') === 'angielski' ? 'en' : 'pl'}/results`}
								className='header-search-icon-link'>
								<MagnifyingGlassIcon className='header-search-icon' />
							</Link>
							<div className={`input-box-search lg:block hidden ${isTyped ? 'active' : ''}`} ref={searchDropdownRef}>
								<ul className='flex flex-col'>
									{searchResults.map((film: FilmData, index: number) => (
										<Link
											href={`/${getCookie('langChoosed') === 'angielski' ? 'en' : 'pl'}/titles/${
												film.ref
											}/${convertTitleToUrl(film.title)}`}
											key={index}>
											<li className='flex h-[5.2rem] cursor-pointer gap-x-3 px-9 pl-4 py-2 transparent-btn-style'>
												<img className='h-full object-cover rounded' src={film.image} alt={film.title} />
												<section className='pt-[0.22rem] pb-[0.15rem] flex flex-col justify-between'>
													<h1>{t(film.title)}</h1>
													<span
														className='text-xs'
														style={{
															color: 'var(--light-gray-d0d0)',
														}}>
														{film.year}
													</span>
													<span
														className='text-xs'
														style={{
															color: 'var(--light-gray-d0d0)',
														}}>
														{film.type}
													</span>
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
								setIsClickedBtn(!isClickedBtn);
							}}>
							<Bars3Icon className='h-7 header-menu-icon' />
						</button>
						<section className='header-btn-section'>
							<section>
								<Link
									className='header-nav-btns-films-serials'
									href={`/${getCookie('langChoosed') === 'angielski' ? 'en' : 'pl'}/movies?order=${
										getCookie('filterOrderChoosed') || 'most_popular'
									}`}>
									<FilmIcon className='header-fa' />
									<span>{t('Filmy')}</span>
								</Link>
							</section>
							<section>
								<Link
									className='header-nav-btns-films-serials'
									href={`/${getCookie('langChoosed') === 'angielski' ? 'en' : 'pl'}/series?order=${
										getCookie('filterOrderChoosed') || 'most_popular'
									}`}>
									<TvIcon className='header-fa' />
									<span>{t('Seriale')}</span>
								</Link>
							</section>
						</section>
					</nav>
				</section>
				<nav className='header-right-section relative'>
					{isLogged ? (
						<>
							<button
								ref={userBtnDropdownRef}
								className='transparent-btn-style flex gap-x-2 items-center'
								onClick={() => setUserDropdownClicked(!userDropdownClicked)}>
								<img
									src='https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png'
									alt='user avatar'
									className='h-8 mr-1'
									style={{
										outline: '1px solid var(--gray-3232)',
										borderRadius: '2px',
									}}
								/>
								{getCookie('email').match(/^(.+)@/)?.[1] || ''}
								<ChevronDownIcon className='h-4' />
							</button>
							<div
								className={`user-dropdown-container btn-choosed-style ${userDropdownClicked ? 'active' : ''} py-1`}
								ref={userDropdownRef}>
								<Link
									href={`/${getCookie('langChoosed') === 'angielski' ? 'en' : 'pl'}/watchlist?order=${
										getCookie('filterOrderChoosed') || 'most_popular'
									}`}
									className='user-dropdown-options overwrite'>
									<CheckBadgeIcon className='h-5' />
									{t('Do obejrzenia')}
								</Link>
								<Link
									href={`/${getCookie('langChoosed') === 'angielski' ? 'en' : 'pl'}/account-settings`}
									className='user-dropdown-options'>
									<Cog8ToothIcon className='h-5' />
									{t('Ustawienia konta')}
								</Link>
								<Link
									href={`/${getCookie('langChoosed') === 'angielski' ? 'en' : 'pl'}/user/${getCookie('ref') || 1}/${
										getCookie('email').match(/^(.+)@/)?.[1] || ''
									}`}
									className='user-dropdown-options'>
									<UserCircleIcon className='h-5' />
									{t('Mój profil')}
								</Link>
								<button className='user-dropdown-options' onClick={() => deleteCookie('email')}>
									<ArrowRightEndOnRectangleIcon className='h-5' />
									{t('Wyloguj sie')}
								</button>
							</div>
						</>
					) : (
						<>
							<Link
								href={`/${getCookie('langChoosed') === 'angielski' ? 'en' : 'pl'}/register`}
								className='transparent-btn-style'>
								Rejestracja
							</Link>
							<Link
								href={`/${getCookie('langChoosed') === 'angielski' ? 'en' : 'pl'}/login`}
								className='orange-btn-style'>
								Logowanie
							</Link>
						</>
					)}
				</nav>
				<nav
					className='header-right-user-btn'
					onClick={() => {
						setIsUserOrMenuClicked('user');
						setIsClickedBtn(!isClickedBtn);
						setUserDropdownClicked(!userDropdownClicked);
					}}>
					<UserIcon className='h-6 header-right-user-icon' />
				</nav>
			</header>
			<div
				ref={mobileDropdownsRef}
				className={`typical-dropdown-style ${isClickedBtn ? 'active pointer-events-auto' : 'pointer-events-none'}`}
				style={{
					height: 'max-content',
				}}>
				{isUserOrMenuClicked === 'menu' ? (
					<nav
						style={{
							height: '6rem',
						}}>
						<Link
							href={`/${getCookie('langChoosed') === 'angielski' ? 'en' : 'pl'}/movies?order=${
								getCookie('filterOrderChoosed') || 'most_popular'
							}`}>
							<FilmIcon className='h-5' />
							<span>Filmy</span>
						</Link>
						<Link
							href={`/${getCookie('langChoosed') === 'angielski' ? 'en' : 'pl'}/series?order=${
								getCookie('filterOrderChoosed') || 'most_popular'
							}`}>
							<TvIcon className='h-5' />
							<span>Seriale</span>
						</Link>
					</nav>
				) : isLogged ? (
					<div
						className={`${userDropdownClicked ? 'active' : ''}`}
						ref={userDropdownRef}
						style={{
							height: '11rem',
						}}>
						<Link
							href={`/${getCookie('langChoosed') === 'angielski' ? 'en' : 'pl'}/watchlist?order=${
								getCookie('filterOrderChoosed') || 'most_popular'
							}`}
							className='user-dropdown-options'>
							<CheckBadgeIcon className='h-5' />
							Do obejrzenia
						</Link>
						<Link
							href={`/${getCookie('langChoosed') === 'angielski' ? 'en' : 'pl'}/account-settings`}
							className='user-dropdown-options'>
							<Cog8ToothIcon className='h-5' />
							Ustawienia konta
						</Link>
						<Link
							href={`/${getCookie('langChoosed') === 'angielski' ? 'en' : 'pl'}/user/${getCookie('ref') || 1}/${
								getCookie('email').match(/^(.+)@/)?.[1] || ''
							}`}
							className='user-dropdown-options'>
							<UserCircleIcon className='h-5' />
							Mój profil
						</Link>
						<button className='user-dropdown-options' onClick={() => deleteCookie('email')}>
							<ArrowRightEndOnRectangleIcon className='h-5' />
							Wyloguj się
						</button>
					</div>
				) : (
					<nav
						style={{
							height: '6rem',
						}}>
						<Link href={`/${getCookie('langChoosed') === 'angielski' ? 'en' : 'pl'}/login`}>Logowanie</Link>
						<Link href={`/${getCookie('langChoosed') === 'angielski' ? 'en' : 'pl'}/register`}>Rejestracja</Link>
					</nav>
				)}
			</div>
			<div className={`opacity-el ${isClickedBtn ? 'active' : ''}`}></div>
		</>
	);
};
