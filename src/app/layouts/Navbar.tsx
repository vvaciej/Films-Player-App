'use client';

import { MagnifyingGlassIcon, Bars3Icon, UserIcon } from '@heroicons/react/24/solid';
import { TvIcon, FilmIcon } from '@heroicons/react/24/outline';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

interface NavbarProps {
	isCutted: boolean,
}

export const Navbar: React.FC<NavbarProps> = ({ isCutted }) => {
	const [isClickedBtn, setIsClickedBtn] = useState<boolean>(false);
	const [isUserOrMenuClicked, setIsUserOrMenuClicked] = useState<string | null>(null);

	const dropdownRef = useRef<HTMLDivElement>(null);
	const headerEl = useRef<HTMLElement>(null);

	const handleClickBtnDropdown = () => {
		setIsClickedBtn(!isClickedBtn);
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
							<input type='text' placeholder='Szukaj filmu, serialu lub aktora...' className='header-search-input' />
							<MagnifyingGlassIcon className='header-search-icon' />
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
								<Link href='#'>
									<FilmIcon className='header-fa' />
									<span>Filmy</span>
								</Link>
							</section>
							<section>
								<Link href='#'>
									<TvIcon className='header-fa' />
									<span>Seriale</span>
								</Link>
							</section>
						</section>
					</nav>
				</section>
				<nav className='header-right-section'>
					<Link href='/register' className='header-register-btn'>Rejestracja</Link>
					<Link href='/login' className='header-login-btn'>Logowanie</Link>
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
			<div ref={dropdownRef} className={`navbar-dropdown ${isClickedBtn ? 'active' : ''}`}>
				{isUserOrMenuClicked === 'menu' ? (
					<nav>
						<Link href='#'>
							<FilmIcon className='h-5' />
							<span>Filmy</span>
						</Link>
						<Link href='#'>
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
