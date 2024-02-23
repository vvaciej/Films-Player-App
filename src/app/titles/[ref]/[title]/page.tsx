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
	AdjustmentsHorizontalIcon,
	ListBulletIcon,
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
								<img src={infoOfChoosedFilm?.imgFullHd1280} alt={`Image for ${infoOfChoosedFilm?.title}`} />
								<div className='relative'>
									<img src={infoOfChoosedFilm?.imgFullHd1280} alt={`Image for ${infoOfChoosedFilm?.title}`} />
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
											<section className='film-page-main-film-categories-section'>
												<ul>
													{infoOfChoosedFilm?.categoryArr &&
														infoOfChoosedFilm?.categoryArr.map((categories: string[] | string, index: number) => (
															<Link href='#' key={index}>
																<li>{categories}</li>
															</Link>
														))}
												</ul>
											</section>
											<p className='film-page-film-description'>{infoOfChoosedFilm?.description}</p>
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
											<div className='film-page-opinion-ab-film-review-container'>
												<section className='flex sm:items-center justify-between flex-col sm:flex-row gap-y-2 film-page-opinion-ab-film-heading-section'>
													<section className='!w-max film-page-opinion-ab-film-left-section'>
														{isLogged ? (
															<img
																src='https://www.gravatar.com/avatar/713725b435cc9533ff473f1f8c956f10?s=&d=retro'
																alt='user avatar'
																className='mr-4 hidden sm:block w-12 h-max'
																style={{
																	outline: '1px solid var(--gray-3232)',
																	borderRadius: '50%',
																}}></img>
														) : (
															<img
																className='object-cover max-w-12 max-h-12 mr-4 w-12 h-max'
																src='https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/default-profile-picture-grey-male-icon.png'
																alt={`Poster for ${infoOfChoosedFilm?.title}`}
															/>
														)}
														<section>
															<span className='pl-1'>
																Review as&nbsp;
																<b className='text-white'>
																	{isLogged ? getCookie('email').match(/^(.+)@/)?.[1] || '' : ''}
																</b>
															</span>
															<section className='flex mt-1'>
																{Array.from({ length: 10 }).map((_, index: number) => (
																	<StarIcon
																		className='film-page-opinions-stars-icons cursor-pointer sm:px-1 pr-1'
																		key={index}
																		onMouseOver={() => setHoveredStars(index + 1)}
																		onMouseOut={() => setHoveredStars(null)}
																		onClick={() => setIndexStars(index + 1)}
																		style={{
																			color:
																				(!indexStars &&
																					!isHoveredStar &&
																					infoOfChoosedFilm &&
																					index < Number(String(infoOfChoosedFilm?.rating).slice(0, 1))) ||
																				(isHoveredStar && isHoveredStar > index) ||
																				(indexStars && !isHoveredStar && indexStars >= index + 1)
																					? 'var(--orange)'
																					: 'var(--gray-5050)',
																		}}
																	/>
																))}
															</section>
														</section>
													</section>
													<button
														className={`${isLogged ? 'logged' : ''} ${
															isAddOpinionSelected ? 'hidden' : 'flex'
														} film-page-add-opinion-btn`}
														onClick={() => setAddOpinionSelected(!isAddOpinionSelected)}>
														Dodaj recenzję
													</button>
												</section>
												{isLogged && isAddOpinionSelected ? (
													<>
														<section className='film-page-adding-opinion-container'>
															<section>
																<label htmlFor='title'>Tytuł</label>
																<input type='text' id='title' />
															</section>
															<section>
																<label htmlFor='opinion-mess'>Recenzja</label>
																<textarea id='opinion-mess' />
															</section>
														</section>
														<section className='flex gap-x-2 justify-end'>
															<button
																className='btn-style-outlined w-max sm:!px-7 !py-2 !text-md'
																onClick={() => setAddOpinionSelected(!isAddOpinionSelected)}>
																Anuluj
															</button>
															<button
																className='orange-btn-style w-max sm:!px-7 !py-2 text-sm'>
																Dodaj
															</button>
														</section>
													</>
												) : (
													''
												)}
											</div>
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
										<div className='film-page-sources-container'>
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
											<section className='film-page-sources-landscapes-container'>
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
														<article className='mb-2'>
															<Link href={`/watch/${infoOfChoosedFilm?.ref}`} className='relative'>
																<div className='film-page-sources-gradient-image'></div>
																<div className='film-page-sources-imageontext'>
																	<section>
																		<PlayCircleIcon className='h-6' />
																		<span>Full Video</span>
																	</section>
																</div>
																<img
																	src={infoOfChoosedFilm?.imgFullHd500}
																	alt={`Poster for ${infoOfChoosedFilm?.title}`}
																/>
															</Link>
															<Link href={`/watch/${infoOfChoosedFilm?.ref}`} className='hover:underline font-medium'>
																Cały film, Lektor Polski
															</Link>
														</article>
													</SwiperSlide>
													<SwiperSlide>
														<article>
															<Link href={`/watch/${infoOfChoosedFilm?.ref}`} className='relative'>
																<div className='film-page-sources-gradient-image'></div>
																<div className='film-page-sources-imageontext'>
																	<section>
																		<PlayCircleIcon className='h-6' />
																		<span>Trailer</span>
																	</section>
																</div>
																<img
																	src={infoOfChoosedFilm?.imgFullHd500}
																	alt={`Poster for ${infoOfChoosedFilm?.title}`}
																/>
															</Link>
															<Link href='#' className='hover:underline font-medium'>
																Zwiastun
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
											<div className='film-page-alike-films-container'>
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
