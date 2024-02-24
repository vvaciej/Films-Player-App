'use client';

import useDocumentTitle from '@/app/helpers/PageTitle';
import { Navbar } from '@/app/layouts/Navbar';
import { Footer } from '@/app/layouts/Footer';
import '../../../../style/css/film-page.css';
import SiteNotFound from '@/app/[...not_found]/page';
import convertTitleToUrl from '@/app/helpers/ConvertTitleToURL';
import {
	ChevronRightIcon,
	StarIcon,
	PlayIcon,
	ChevronLeftIcon,
	PlusIcon,
	ShareIcon,
	Bars3BottomLeftIcon,
	PlayCircleIcon,
} from '@heroicons/react/24/solid';
import Link from 'next/link';

import { Navigation, Pagination, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { useEffect, useRef, useState } from 'react';

import { allFilms } from '@/app/data/films-data';
import getCookie from '@/app/helpers/GetCookie';
import ReviewAs from '@/app/components/ReviewAsContainer';
interface pageProps {
	params: { ref: number; title: string };
}

const FilmPage: React.FC<pageProps> = ({ params }) => {
	const [isLoaded, setIsLoaded] = useState<boolean>(false);

	const alikeFilmsSwiperNextBtn = useRef<HTMLButtonElement>(null);
	const alikeFilmsSwiperPrevtn = useRef<HTMLButtonElement>(null);
	const sourcesSwiperNextBtn = useRef<HTMLButtonElement>(null);
	const sourcesSwiperPrevBtn = useRef<HTMLButtonElement>(null);

	const [swiperAlikeFilms, setSwiperAlikeFilms] = useState<any>(null);
	const [swiperSources, setSwiperSources] = useState<any>(null);

	const [isHoveredStar, setHoveredStars] = useState<number | null>(null);
	const [indexStars, setIndexStars] = useState<number | null>(null);

	const [isAddOpinionSelected, setAddOpinionSelected] = useState<boolean>(false);

	const handlePrevClickAlikeSwiper = () => {
		swiperAlikeFilms?.slidePrev?.();
	};

	const handleNextClickAlikeSwiper = () => {
		swiperAlikeFilms?.slideNext?.();
	};

	const handlePrevClickSourcesSwiper = () => {
		swiperSources?.slidePrev?.();
	};

	const handleNextClickSourcesSwiper = () => {
		swiperSources?.slideNext?.();
	};

	const isLogged = getCookie('email');

	useEffect(() => {
		setTimeout(() => {
			setIsLoaded(true);
		}, 300);
	}, []);

	const infoOfChoosedFilm = allFilms.find(film => convertTitleToUrl(film.title) === params.title);

	const extractYearFromReleaseDate = (releaseDate: string | undefined) => {
		const yearRegex = /(\d{2})\/(\d{2})\/(\d{4})/;
		const match = releaseDate?.match(yearRegex);

		return match ? match[3] : null;
	};

	useDocumentTitle(
		`${infoOfChoosedFilm?.title} (${extractYearFromReleaseDate(infoOfChoosedFilm?.releaseDate)}) - vvaciej-app`
	);

	const [isFilmExist, setIsFilmExist] = useState<boolean>(false);

	useEffect(() => {
		const checkIfPageExist = allFilms.some(
			film => film.ref === Number(params.ref) && convertTitleToUrl(film.title) === params.title
		);

		checkIfPageExist ? setIsFilmExist(true) : setIsFilmExist(false);
	}, [params]);

	const findSimilarFilms = (keywords: string[] | undefined, title: string | undefined) => {
		const similarFilms = allFilms.filter(film => {
			if (film.title !== title) {
				return film.keywords.some(keyword => keywords?.includes(keyword));
			}
		});

		return similarFilms;
	};

	return (
		<>
			<div className='space-light'>
				<Navbar isCutted={false} />
				{isLoaded ? (
					isFilmExist ? (
						<main>
							<div className='film-page-image-fullhd-preview'>
								<Link href={`/watch/${infoOfChoosedFilm?.ref}`} className='film-play-btn'>
									<PlayIcon className='text-black h-6' />
								</Link>
								<div className='film-page-image-gradient'></div>
								<div className='film-page-image-blured'></div>
								<img className='w-full h-full absolute object-cover z-[1] opacity-[0.3]' src={infoOfChoosedFilm?.imgFullHd1280} alt={`Image for ${infoOfChoosedFilm?.title}`} />
								<div className='relative h-full w-full items-center flex justify-center'>
									<img className='h-full relative sm:mt-[120px] lg:mt-[140px] z-[3] brightness-75 w-[92%] lg:w-[1240px] object-cover' src={infoOfChoosedFilm?.imgFullHd1280} alt={`Image for ${infoOfChoosedFilm?.title}`} />
								</div>
							</div>
							<div className='content-full-space-centered'>
								<div className='film-page-container'>
									<aside className='film-page-aside'>
										<img
											src={infoOfChoosedFilm?.image}
											alt={`Poster for ${infoOfChoosedFilm?.title}`}
											className='cursor-pointer'
										/>
										<button className='orange-btn-style'>
											<PlayIcon className='h-4' />
											Obejrzyj to
										</button>
										<button className='orange-outlined-btn-style'>
											<PlusIcon className='h-4' />
											Obejrzyj potem
										</button>
										<button className='orange-outlined-btn-style'>
											<ShareIcon className='h-4' />
											Udostępnij
										</button>
										<section>
											<b>Oryginalny język</b>
											<span>{infoOfChoosedFilm?.originalLang}</span>
										</section>
										<section
											style={{
												display: infoOfChoosedFilm?.title === infoOfChoosedFilm?.originalTitle ? 'none' : 'flex',
											}}>
											<b>Oryginalny tytuł</b>
											<span>{infoOfChoosedFilm?.originalTitle}</span>
										</section>
										<section
											style={{
												display: infoOfChoosedFilm?.budget === 1 ? 'none' : 'flex',
											}}>
											<b>Budżet</b>
											<span>
												{infoOfChoosedFilm?.budget.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
											</span>
										</section>
										<section
											style={{
												display: infoOfChoosedFilm?.profit === 1 ? 'none' : 'flex',
											}}>
											<b>Przychód</b>
											<span>
												{infoOfChoosedFilm?.profit.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
											</span>
										</section>
										<section
											className='film-page-aside-filmed-in-keywords-section'
											style={{
												display: infoOfChoosedFilm?.filmedIn.length === 0 ? 'none' : 'flex',
											}}>
											<b>Nakręcono w</b>
											<ul>
												{infoOfChoosedFilm?.filmedIn &&
													infoOfChoosedFilm?.filmedIn.map((filmedIn: string[] | string, index: number) => (
														<Link href='#' key={index}>
															<li>{filmedIn}</li>
														</Link>
													))}
											</ul>
										</section>
										<section
											className='film-page-aside-filmed-in-keywords-section'
											style={{
												display: infoOfChoosedFilm?.keywords.length === 0 ? 'none' : 'flex',
											}}>
											<b>Słowa kluczowe</b>
											<ul>
												{infoOfChoosedFilm?.keywords &&
													infoOfChoosedFilm?.keywords.map((keywords: string[] | string, index: number) => (
														<Link href='#' key={index}>
															<li>{keywords}</li>
														</Link>
													))}
											</ul>
										</section>
									</aside>
									<main className='film-page-main'>
										<section className='film-page-main-top-info-text-section'>
											<section className='film-page-main-top-info-heading-section'>
												<section>
													<h1 className='film-page-film-title'>{infoOfChoosedFilm?.title}</h1>
													<section>
														<span>{infoOfChoosedFilm?.releaseDate}</span>
														<span className='ml-2 mr-2'>•</span>
														<span>{infoOfChoosedFilm?.time}</span>
													</section>
												</section>
												<section>
													<section className='main-text-rating flex items-center min-w-max'>
														<StarIcon
															className='h-5 mr-2'
															style={{
																color: 'var(--orange)',
															}}
														/>
														<span>{infoOfChoosedFilm?.rating} / 10</span>
														<span
															className='film-list-rating-separate-symbol ml-3'
															style={{
																color: 'var(--gray-5050)',
															}}>
															|
														</span>
														<button className='rate-this-btn flex items-center gap-x-2'>
															<StarIcon className='h-4' />
															Oceń to
														</button>
													</section>
												</section>
											</section>
											<section className='mb-4'>
												<ul className='flex flex-wrap gap-x-3 text-sm'>
													{infoOfChoosedFilm?.categoryArr &&
														infoOfChoosedFilm?.categoryArr.map((categories: string[] | string, index: number) => (
															<Link href='#' key={index}>
																<li
																	className='py-2 px-3 rounded-2xl hover:underline'
																	style={{
																		backgroundColor: 'var(--gray-6161)',
																	}}>
																	{categories}
																</li>
															</Link>
														))}
												</ul>
											</section>
											<p>{infoOfChoosedFilm?.description}</p>
										</section>
										<section className='film-page-opinion-ab-film'>
											<section className='films-heading-section'>
												<h1 className='films-category-heading-text hover:underline !cursor-pointer'>Recenzje</h1>
												<section className='flex'>
													<section className='main-text-rating flex items-center min-w-max'>
														<StarIcon
															className='h-5 mr-2'
															style={{
																color: 'var(--orange)',
															}}
														/>
														<span>{infoOfChoosedFilm?.rating} / 10</span>
														<span
															className='film-list-rating-separate-symbol ml-3'
															style={{
																color: 'var(--gray-5050)',
															}}>
															|
														</span>
													</section>
													<button className='btn-style-outlined ml-4'>
														<Bars3BottomLeftIcon className='h-4' />
														Najnowsze
													</button>
												</section>
											</section>
											<ReviewAs infoOfChoosedFilm={infoOfChoosedFilm} />
											<div
												className='opinion-must-be-logged-container'
												style={{
													display: `${isLogged ? 'none' : 'flex'}`,
												}}>
												<h1>Wymagana jest rejestracja</h1>
												<p>
													Please&nbsp;
													<Link href='/login' className='orange-link'>
														login
													</Link>
													&nbsp;or&nbsp;
													<Link href='/register' className='orange-link'>
														create account
													</Link>
													&nbsp;to add a review
												</p>
											</div>
										</section>
										<div className='film-page-sources-container mt-1'>
											<section className='films-heading-section'>
												<section className='flex items-center gap-x-2'>
													<h1 className='films-category-heading-text hover:underline !cursor-pointer'>Źródła</h1>
													<ChevronRightIcon className='h-6 films-category-heading-icon transition-all' />
												</section>
												<section className='films-category-control-btns'>
													<button
														className={`films-category-control-btn`}
														onClick={handlePrevClickSourcesSwiper}
														ref={sourcesSwiperPrevBtn}>
														<ChevronLeftIcon className='h-5' />
													</button>
													<button
														className={`films-category-control-btn`}
														onClick={handleNextClickSourcesSwiper}
														ref={sourcesSwiperNextBtn}>
														<ChevronRightIcon className='h-5' />
													</button>
												</section>
											</section>
											<section className='w-full h-max mt-6 sm:gap-x-5 gap-x-4'>
												<Swiper
													modules={[Navigation, Pagination, A11y]}
													navigation={{ prevEl: sourcesSwiperPrevBtn.current, nextEl: sourcesSwiperNextBtn.current }}
													breakpoints={{
														700: {
															slidesPerGroup: 3,
															slidesPerView: 3,
															spaceBetween: 20,
														},
														270: {
															slidesPerGroup: 2,
															slidesPerView: 2,
															spaceBetween: 10,
															cssMode: true,
														},
														0: {
															slidesPerGroup: 1,
															slidesPerView: 1,
															spaceBetween: 10,
															cssMode: true,
														},
													}}
													onSwiper={swiper => setSwiperSources(swiper)}>
													<SwiperSlide>
														<article className='mb-2 w-full flex flex-col gap-y-2 transition-all hover:brightness-75'>
															<Link
																href={`/watch/${infoOfChoosedFilm?.ref}`}
																className='relative cursor-pointer w-full text-sm pr-[0.6rem]'>
																<div
																	className='w-[97%] h-full absolute'
																	style={{
																		background: 'linear-gradient(to top, rgba(0, 0, 0, 0.6) 1%, transparent)',
																	}}></div>
																<div className='h-full w-full absolute text-sm font-normal'>
																	<section className='flex items-center gap-x-2 absolute bottom-2 sm:bottom-3 sm:left-3 left-2'>
																		<PlayCircleIcon className='h-6' />
																		<span>Full Video</span>
																	</section>
																</div>
																<img
																	src={infoOfChoosedFilm?.imgFullHd500}
																	alt={`Poster for ${infoOfChoosedFilm?.title}`}
																/>
															</Link>
															<Link
																href={`/watch/${infoOfChoosedFilm?.ref}`}
																className='hover:underline font-medium text-sm'>
																Cały film, Lektor Polski
															</Link>
														</article>
													</SwiperSlide>
												</Swiper>
											</section>
										</div>
										<div
											style={{
												display:
													findSimilarFilms(infoOfChoosedFilm?.keywords, infoOfChoosedFilm?.title).length > 0
														? 'block'
														: 'none',
											}}>
											<section className='films-heading-section mt-10'>
												<Link href={'#'} className='films-category-heading-text hover:underline !cursor-pointer'>
													<span>Podobne filmy</span>
													<ChevronRightIcon className='h-6 films-category-heading-icon transition-all' />
												</Link>
												<section className='films-category-control-btns'>
													<button
														className={`films-category-control-btn`}
														onClick={handlePrevClickAlikeSwiper}
														ref={alikeFilmsSwiperPrevtn}>
														<ChevronLeftIcon className='h-5' />
													</button>
													<button
														className={`films-category-control-btn`}
														onClick={handleNextClickAlikeSwiper}
														ref={alikeFilmsSwiperNextBtn}>
														<ChevronRightIcon className='h-5' />
													</button>
												</section>
											</section>
											<div className='w-full h-max'>
												<Swiper
													modules={[Navigation, Pagination, A11y]}
													navigation={{
														prevEl: alikeFilmsSwiperPrevtn.current,
														nextEl: alikeFilmsSwiperNextBtn.current,
													}}
													onSwiper={swiper => setSwiperAlikeFilms(swiper)}
													breakpoints={{
														1200: {
															slidesPerView: 5,
															slidesPerGroup: 5,
															spaceBetween: 10,
														},
														650: {
															slidesPerView: 4,
															slidesPerGroup: 4,
															spaceBetween: 10,
															cssMode: true,
														},
														420: {
															slidesPerView: 3,
															slidesPerGroup: 3,
															spaceBetween: 10,
															cssMode: true,
														},
														0: {
															slidesPerView: 2,
															slidesPerGroup: 2,
															spaceBetween: 10,
															cssMode: true,
														},
													}}>
													{findSimilarFilms(infoOfChoosedFilm?.keywords, infoOfChoosedFilm?.title).map(
														(similarFilm, index: number) => (
															<SwiperSlide key={index}>
																<article className='film-container !max-w-64'>
																	<section className='films-image-section'>
																		<Link href={`/titles/${similarFilm?.ref}/${convertTitleToUrl(similarFilm?.title)}`}>
																			<img src={similarFilm?.image} alt={`Poster for ${similarFilm?.title}`} />
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
																			<span>{similarFilm?.rating} / 10</span>
																		</section>
																		<Link
																			href={`/titles/${similarFilm?.ref}/${convertTitleToUrl(similarFilm?.title)}`}
																			className='film-container-title'>
																			{similarFilm?.title}
																		</Link>
																	</section>
																</article>
															</SwiperSlide>
														)
													)}
												</Swiper>
											</div>
										</div>
									</main>
								</div>
							</div>
							<Footer />
						</main>
					) : (
						<SiteNotFound />
					)
				) : (
					<div className='loader-container flex justify-center w-full h-full'>
						<div className='loader'></div>
					</div>
				)}
			</div>
		</>
	);
};

export default FilmPage;
