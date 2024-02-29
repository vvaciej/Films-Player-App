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
import normalizePolishCharacters from '../../../helpers/NormalizePolishSymbols';
import getCookie from '../../../helpers/GetCookie';
import { useTranslation } from 'react-i18next';

import React from 'react';

import { allFilms } from '../data/films-data';
import convertTitleToUrl from '../../../helpers/ConvertTitleToURL';

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
	const { t } = useTranslation();

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

	const handleLogout = (name: string) => {
		document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
		setIsLogged(false);
	};

	const handleSearchDirectPage = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'Enter') {
			event.preventDefault();

			window.location.href = `/${
				getCookie('langChoosed') === 'english' ? 'en' : 'pl'
			}/results?query=${encodeURIComponent(whatSearchVal)}`;
		}
	};

	const handleSearchType = (event: React.ChangeEvent<HTMLInputElement>) => {
		const inputVal = normalizePolishCharacters(event.target.value.toLowerCase());
		setWhatSearchVal(inputVal);

		const filteredData = allFilms.filter(film => {
			if (inputVal.length > 0) {
				const lowerCaseTitle = normalizePolishCharacters(film.title.toLowerCase());

				return lowerCaseTitle.includes(inputVal);
			}
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
			<header className='fixed flex top-0 justify-between w-full bg-dark121212 h-[3.8rem] lg:h-[4.3rem] border-b-[1px] border-1a1a px-3 sm:px-5 z-20'>
				<section className='flex items-center sm:mr-10 mr-4 w-[70rem]'>
					<Link
						href={`/${getCookie('langChoosed') === 'english' ? 'en' : 'pl'}`}
						className='lg:text-5xl font-bold mr-0 md:mr-6 md:text-3xl text-2xl'>
						VVACIEJ.APP
					</Link>
					<nav className={`flex items-center w-full h-full ${isCutted ? '!hidden' : ''}`}>
						<section className='relative h-full flex items-center w-0 lg:w-full'>
							<form
								className='flex items-center w-full h-full'
								onSubmit={event => {
									event.preventDefault();
								}}>
								<input
									type='text'
									placeholder={t('Search movie or serial')}
									className='lg:h-[calc(100%-2.2rem)] h-[calc(100%-1.8rem)] lg:block hidden bg-gray3232 rounded outline outline-[1px] outline-gray5050 text-sm w-full px-10 border-[1px] border-transparent orange-outline-focus placeholder:text-lightGrayD0d0'
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
								href={`/${getCookie('langChoosed') === 'english' ? 'en' : 'pl'}/results`}
								className='absolute left-1 lg:pointer-events-none pointer-events-auto'>
								<MagnifyingGlassIcon className='min-h-9 sm:min-h-[2.2rem] p-2 h-5 text-lightGrayD0d0' />
							</Link>
							<div
								className={`w-full absolute bg-1a1a top-[4rem] rounded outline outline-[1px] outline-gray5050 py-1 overflow-y-auto text-[0.8rem] lg:block hidden ${
									isTyped
										? 'opacity-100 pointer-events-auto max-h-[36.9rem] h-max'
										: 'h-0 opacity-0 pointer-events-none'
								}`}
								ref={searchDropdownRef}>
								<ul className='flex flex-col'>
									{searchResults.map((film: FilmData, index: number) => (
										<Link
											href={`/${getCookie('langChoosed') === 'english' ? 'en' : 'pl'}/titles/${
												film.ref
											}/${convertTitleToUrl(film.title)}`}
											key={index}>
											<li className='flex h-[5.2rem] cursor-pointer gap-x-3 px-9 pl-4 py-2 transparent-btn-style !rounded-none'>
												<img className='h-full object-cover rounded' src={film.image} alt={film.title} />
												<section className='pt-[0.22rem] pb-[0.15rem] flex flex-col justify-between'>
													<h1>{t(film.title)}</h1>
													<span className='text-xs text-lightGrayD0d0'>{film.year}</span>
													<span className='text-xs text-lightGrayD0d0'>{film.type}</span>
												</section>
											</li>
										</Link>
									))}
								</ul>
							</div>
						</section>
						<button
							className='lg:hidden lg:ml-0 ml-10 items-center justify-center cursor-pointer flex'
							onClick={() => {
								setIsUserOrMenuClicked('menu');
								setIsClickedBtn(!isClickedBtn);
							}}>
							<Bars3Icon className='h-6 sm:ml-1' />
						</button>
						<section className='lg:flex hidden ml-8 gap-x-8 xl:gap-x-5'>
							<section>
								<Link
									className='flex items-center gap-x-2 text-lightGrayDdd font-medium text-[0.8rem] hover:underline'
									href={`/${getCookie('langChoosed') === 'english' ? 'en' : 'pl'}/movies?order=${
										getCookie('filterOrderChoosed') || 'most_popular'
									}`}>
									<FilmIcon className='h-4 text-lightGrayDdd' />
									<span>{t('Films')}</span>
								</Link>
							</section>
							<section>
								<Link
									className='flex items-center gap-x-2 text-lightGrayDdd font-medium text-[0.8rem] hover:underline'
									href={`/${getCookie('langChoosed') === 'english' ? 'en' : 'pl'}/series?order=${
										getCookie('filterOrderChoosed') || 'most_popular'
									}`}>
									<TvIcon className='h-4 text-lightGrayDdd' />
									<span>{t('Serials')}</span>
								</Link>
							</section>
						</section>
					</nav>
				</section>
				<nav className='lg:flex hidden items-center gap-x-2 font-semibold text-[0.8rem] relative'>
					{isLogged ? (
						<>
							<button
								ref={userBtnDropdownRef}
								className='transparent-btn-style flex gap-x-2 items-center rounded !w-max'
								onClick={() => setUserDropdownClicked(!userDropdownClicked)}>
								<img
									src='https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png'
									alt='user avatar'
									className='h-8 mr-1 outline-[1px] outline outline-gray3232 rounded'
								/>
								{getCookie('email').match(/^(.+)@/)?.[1] || ''}
								<div>
									<ChevronDownIcon className='min-h-4' />
								</div>
							</button>
							<div
								className={`h-max bg-1a1a absolute right-0 w-full min-w-max rounded outline outline-[1px] outline-gray5050 transition-all py-1 ${
									userDropdownClicked
										? 'opacity-100 top-[57px] pointer-events-auto'
										: 'opacity-0 top-[64px] pointer-events-none'
								}`}
								ref={userDropdownRef}>
								<Link
									href={`/${getCookie('langChoosed') === 'english' ? 'en' : 'pl'}/watchlist?order=${
										getCookie('filterOrderChoosed') || 'most_popular'
									}`}
									className='btn-choosed-style flex gap-x-1 !text-zinc-200'>
									<CheckBadgeIcon className='h-5' />
									{t('Watchlist')}
								</Link>
								<Link
									href={`/${getCookie('langChoosed') === 'english' ? 'en' : 'pl'}/account-settings`}
									className='btn-choosed-style flex gap-x-1 !text-zinc-200'>
									<Cog8ToothIcon className='h-5' />
									{t('Account settings')}
								</Link>
								<Link
									href={`/${getCookie('langChoosed') === 'english' ? 'en' : 'pl'}/user/${getCookie('ref') || 1}/${
										getCookie('email').match(/^(.+)@/)?.[1] || ''
									}`}
									className='btn-choosed-style flex gap-x-1 !text-zinc-200'>
									<UserCircleIcon className='h-5' />
									{t('My profile')}
								</Link>
								<button className='btn-choosed-style flex gap-x-1 !text-zinc-200' onClick={() => handleLogout('email')}>
									<ArrowRightEndOnRectangleIcon className='h-5' />
									{t('Logout')}
								</button>
							</div>
						</>
					) : (
						<>
							<Link
								href={`/${getCookie('langChoosed') === 'english' ? 'en' : 'pl'}/register`}
								className='transparent-btn-style w-max'>
								{t('Sign in')}
							</Link>
							<Link
								href={`/${getCookie('langChoosed') === 'english' ? 'en' : 'pl'}/login`}
								className='orange-btn-style w-max'>
								{t('Logging')}
							</Link>
						</>
					)}
				</nav>
				<nav
					className='flex items-center justify-center lg:hidden'
					onClick={() => {
						setIsUserOrMenuClicked('user');
						setIsClickedBtn(!isClickedBtn);
						setUserDropdownClicked(!userDropdownClicked);
					}}>
					<UserIcon className='sm:h-6 h-5' />
				</nav>
			</header>
			<div
				ref={mobileDropdownsRef}
				className={`typical-dropdown-style-mobiles h-max ${
					isClickedBtn ? 'active pointer-events-auto' : 'pointer-events-none'
				}`}>
				{isUserOrMenuClicked === 'menu' ? (
					<nav className='h-[6rem]'>
						<Link
							href={`/${getCookie('langChoosed') === 'english' ? 'en' : 'pl'}/movies?order=${
								getCookie('filterOrderChoosed') || 'most_popular'
							}`}>
							<FilmIcon className='h-5' />
							<span>{t('Films')}</span>
						</Link>
						<Link
							href={`/${getCookie('langChoosed') === 'english' ? 'en' : 'pl'}/series?order=${
								getCookie('filterOrderChoosed') || 'most_popular'
							}`}>
							<TvIcon className='h-5' />
							<span>{t('Serials')}</span>
						</Link>
					</nav>
				) : isLogged ? (
					<div className={`${userDropdownClicked ? 'active' : ''} h-[11rem]`} ref={userDropdownRef}>
						<Link
							href={`/${getCookie('langChoosed') === 'english' ? 'en' : 'pl'}/watchlist?order=${
								getCookie('filterOrderChoosed') || 'most_popular'
							}`}
							className='btn-choosed-style flex gap-x-1 !text-zinc-200'>
							<CheckBadgeIcon className='h-5' />
							{t('Watchlist')}
						</Link>
						<Link
							href={`/${getCookie('langChoosed') === 'english' ? 'en' : 'pl'}/account-settings`}
							className='btn-choosed-style flex gap-x-1 !text-zinc-200'>
							<Cog8ToothIcon className='h-5' />
							{t('Account settings')}
						</Link>
						<Link
							href={`/${getCookie('langChoosed') === 'english' ? 'en' : 'pl'}/user/${getCookie('ref') || 1}/${
								getCookie('email').match(/^(.+)@/)?.[1] || ''
							}`}
							className='btn-choosed-style flex gap-x-1 !text-zinc-200'>
							<UserCircleIcon className='h-5' />
							{t('My profile')}
						</Link>
						<button className='btn-choosed-style flex gap-x-1 !text-zinc-200' onClick={() => handleLogout('email')}>
							<ArrowRightEndOnRectangleIcon className='h-5' />
							{t('Logout')}
						</button>
					</div>
				) : (
					<nav className='h-[6rem] w-max'>
						<Link href={`/${getCookie('langChoosed') === 'english' ? 'en' : 'pl'}/login`}>{t('Logging')}</Link>
						<Link href={`/${getCookie('langChoosed') === 'english' ? 'en' : 'pl'}/register`}>{t('Register')}</Link>
					</nav>
				)}
			</div>
			<div className={`blur-full-space ${isClickedBtn ? 'active' : ''}`}></div>
		</>
	);
};
