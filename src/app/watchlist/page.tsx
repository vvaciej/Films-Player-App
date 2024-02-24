'use client';

import useDocumentTitle from '../helpers/PageTitle';
import { Navbar } from '../layouts/Navbar';
import { Footer } from '../layouts/Footer';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import getCookie from '../helpers/GetCookie';

import '../../style/css/filteres-page.css';
import Link from 'next/link';

import {
	Bars3BottomLeftIcon,
	Squares2X2Icon,
	ListBulletIcon,
	ViewColumnsIcon,
	ShareIcon,
} from '@heroicons/react/24/solid';

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

const Watchlist = () => {
	useDocumentTitle('Watchlist - vvaciej.app');
	const router = useRouter();

	const [mostPopularChoosed, setMostPopularChoosed] = useState<string>(getCookie('mostPopularChoosed'));
	const [siatkaChoosed, setSiatkaChoosed] = useState<string>(getCookie('siatkaChoosed'));

	useEffect(() => {
		document.cookie = `siatkaChoosed=${siatkaChoosed}; path=/;`;
		document.cookie = `mostPopularChoosed=${mostPopularChoosed}; path=/;`;
	}, [siatkaChoosed, mostPopularChoosed]);

	const isLogged = getCookie('email') ? true : false;

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

	// switch (mostPopularChoosed) {
	// 	case 'most_popular':
	// 		mappingBy.sort((a: FilmData, b: FilmData) => b.filmwebPopularity - a.filmwebPopularity);
	// 		break;
	// 	case 'last_added':
	// 		mappingBy.sort((a: FilmData, b: FilmData) => new Date(b.addedDate).getTime() - new Date(a.addedDate).getTime());
	// 		break;
	// 	case 'highest_rating':
	// 		mappingBy.sort((a: FilmData, b: FilmData) => b.rating - a.rating);
	// 		break;
	// 	case 'highest_budget':
	// 		mappingBy.sort((a: FilmData, b: FilmData) => b.budget - a.budget);
	// 		break;
	// 	case 'highest_profit':
	// 		mappingBy.sort((a: FilmData, b: FilmData) => b.profit - a.profit);
	// 		break;
	// }

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
				<div className='main-container-width-padd-top-1240'>
					{isLogged ? (
						<>
							<header className='films-heading-section flex flex-col gap-y-4'>
								<section className='flex justify-between w-full'>
									<span className='films-category-heading-text'>Do obejrzenia</span>
									<section className='films-category-filter-btns'>
										<section className='relative' ref={mostPopularDropdownRef}>
											<button className={`films-category-filter-btn`} onClick={handleMostPopularClick}>
												<Bars3BottomLeftIcon className='h-5' />
												<span>
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
														router.push(`?order=highest_budget`);
														setMostPopularBtnClicked(false);
														setMostPopularChoosed('highest_budget');
													}}>
													Największy budżet
												</button>
												<button
													className={`${mostPopularChoosed === 'highest_profit' ? 'choosed' : ''}`}
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
												<span>
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
													Pejzaż
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
								<section
									className='flex justify-between w-full'
									style={{
										fontSize: '13.5px',
									}}>
									<section className='flex items-center gap-x-2'>
										<img
											src='https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png'
											alt='user avatar'
											className='h-6 mr-1'
											style={{
												outline: '1px solid var(--gray-3232)',
												borderRadius: '50%',
											}}
										/>
										<p>
											<span>List by&nbsp;</span>
											<b>{getCookie('email').match(/^(.+)@/)?.[1] || ''}</b>
										</p>
									</section>
									<section className='text-zinc-300 flex items-center'>
										<button className='transparent-btn-style flex gap-x-2 items-center'>
											<ShareIcon className='h-4' />
											<span>Udostępnij</span>
										</button>
										<section className='hidden sm:flex'>
											<span
												className='film-list-rating-separate-symbol'
												style={{
													color: 'var(--gray-5050)',
												}}>
												|
											</span>
											<span className='px-3 block'>Updated -- temu</span>
											<span
												className='film-list-rating-separate-symbol'
												style={{
													color: 'var(--gray-5050)',
												}}>
												|
											</span>
											<span className='pl-3'>Prywatne</span>
										</section>
									</section>
								</section>
							</header>
							<main className='mt-36'>
								<section className='content-full-space-centered flex-col items-center gap-y-3'>
									<img
										className='h-36 rounded brightness-75'
										src='https://img.freepik.com/free-vector/cup-popcorn-graphic-illustration_53876-8059.jpg?t=st=1708697305~exp=1708700905~hmac=1050d7486db690c64dd4d2361098ec9f8ff52254d9670e1f832f97f723aac393&w=826'
										alt='poster for watchlist, popcorn'
									/>
									<span className='text-sm text-center px-2'>The list does not have any content yet</span>
								</section>
							</main>
						</>
					) : (
						<section className='content-full-space-centered flex-col items-center gap-y-3 h-56'>
							<span>You must be logged</span>
							<Link href='/login' className='orange-btn-style'>
								Zaloguj się
							</Link>
						</section>
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

export default Watchlist;
