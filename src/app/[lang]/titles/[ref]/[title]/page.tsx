'use client';

import useDocumentTitle from '@/helpers/PageTitle';
import { Navbar } from '@/app/[lang]/layouts/Navbar';
import { Footer } from '@/app/[lang]/layouts/Footer';
import SiteNotFound from '@/app/[lang]/[...not_found]/page';
import convertTitleToUrl from '@/helpers/ConvertTitleToURL';
import { useTranslation } from 'react-i18next';
import {
	ChevronRightIcon,
	StarIcon,
	PlayIcon,
	ChevronLeftIcon,
	PlusIcon,
	Bars3BottomLeftIcon,
	PlayCircleIcon,
	HeartIcon,
	CheckIcon,
} from '@heroicons/react/24/solid';
import Link from 'next/link';

import { Navigation, Pagination, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { useEffect, useRef, useState } from 'react';

import { allFilms } from '@/app/[lang]/data/films-data';
import getCookie from '@/helpers/GetCookie';
import ReviewAs from '@/app/[lang]/components/ReviewAsContainer';
import normalizePolishCharacters from '@/helpers/NormalizePolishSymbols';
import SomethingDone from '@/app/[lang]/components/SomethingDoneDropdown';
import ShareBtn from '@/app/[lang]/components/ShareBtn';
interface pageProps {
	params: { ref: number; title: string };
}

const FilmPage: React.FC<pageProps> = ({ params }) => {
	const { t } = useTranslation();

	const [isLoaded, setIsLoaded] = useState<boolean>(false);

	const alikeFilmsSwiperNextBtn = useRef<HTMLButtonElement>(null);
	const alikeFilmsSwiperPrevtn = useRef<HTMLButtonElement>(null);
	const sourcesSwiperNextBtn = useRef<HTMLButtonElement>(null);
	const sourcesSwiperPrevBtn = useRef<HTMLButtonElement>(null);

	const [swiperAlikeFilms, setSwiperAlikeFilms] = useState<any>(null);
	const [swiperSources, setSwiperSources] = useState<any>(null);

	const [isVisibleSthDone, setIsVisibleSthDone] = useState<boolean>(false);

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
		`${t(infoOfChoosedFilm?.title || '')} (${extractYearFromReleaseDate(infoOfChoosedFilm?.releaseDate)}) - vvaciej-app`
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

	const formatedWatchlistArr = (getCookie('watchlist') || '').split(',').map(Number);
	const [refsAddedToWatchlist, setRefsAddedToWatchlist] = useState<Set<number | undefined>>(
		new Set(formatedWatchlistArr)
	);

	useEffect(() => {
		const watchlistArray = Array.from(refsAddedToWatchlist);
		const watchlistString = watchlistArray.join(',');

		document.cookie = `watchlist=${watchlistString}; path=/`;
	}, [refsAddedToWatchlist]);

	return (
		<>
			<div className='space-light'>
				<Navbar isCutted={false} />
				{isLoaded ? (
					isFilmExist ? (
						<main>
							<div className='w-full bg-black h-[18rem] sm:h-[25rem] lg:h-[32rem] overflow-hidden relative sm:pt-0 pt-12'>
								<Link
									href={`/${getCookie('langChoosed') === 'english' ? 'en' : 'pl'}/watch/${infoOfChoosedFilm?.ref}`}
									className='bg-white right-1/2 translate-x-1/2 top-1/2 absolute z-10 h-12 w-12 flex justify-center items-center rounded-[50%] hover:brightness-75 transition-all'>
									<PlayIcon className='text-black h-6' />
								</Link>
								<img
									className='w-full h-full absolute object-cover z-[1] opacity-[0.3] blur-md'
									src={infoOfChoosedFilm?.imgFullHd1280}
									alt={`Image for ${t(infoOfChoosedFilm?.title || '')}`}
								/>
								<div className='relative h-full w-full items-center flex justify-center'>
									<img
										className='h-full relative sm:mt-[120px] lg:mt-[140px] z-[3] brightness-50 w-[92%] lg:w-[1240px] object-cover'
										src={infoOfChoosedFilm?.imgFullHd1280}
										alt={`Image for ${t(infoOfChoosedFilm?.title || '')}`}
									/>
								</div>
							</div>
							<div className='flex w-full justify-center'>
								<div
									className='relative w-[93%] xl:w-[1240px] h-max lg:h-full mb-12 mt-8 flex flex-col lg:grid gap-x-8'
									style={{
										gridTemplateColumns: 'minmax(5rem, 17rem) minmax(35rem, 60rem)',
									}}>
									<aside className='sticky top-[5rem] hidden lg:flex flex-col gap-y-3 h-max w-full'>
										<img
											src={infoOfChoosedFilm?.image}
											alt={`Poster for ${t(infoOfChoosedFilm?.title || '')}`}
											className='cursor-pointer'
										/>
										<div className='flex flex-col gap-y-3'>
											<Link
												href={`/${getCookie('langChoosed') === 'english' ? 'en' : 'pl'}/watch/${
													infoOfChoosedFilm?.ref
												}`}
												className='flex items-center justify-center !w-full gap-x-2 text-[13px] font-medium h-[2.3rem] orange-btn-style'>
												<PlayIcon className='h-4' />
												{t('Watch this')}
											</Link>
											{getCookie('email') ? (
												<button
													className={`flex items-center justify-center gap-x-2 text-[13px] h-[2.3rem] font-medium rounded transition-all ${
														refsAddedToWatchlist.has(infoOfChoosedFilm?.ref)
															? 'outline-[1px] outline outline-orangeOpacited text-darkOrange'
															: 'outline-[1px] outline outline-gray3232 text-gray9999'
													}`}
													onClick={() => {
														if (
															infoOfChoosedFilm?.ref !== undefined &&
															!refsAddedToWatchlist.has(infoOfChoosedFilm?.ref)
														) {
															setRefsAddedToWatchlist(prevSet => new Set([...prevSet, infoOfChoosedFilm.ref]));
														} else {
															if (
																infoOfChoosedFilm?.ref !== undefined &&
																refsAddedToWatchlist.has(infoOfChoosedFilm?.ref)
															) {
																setRefsAddedToWatchlist(prevSet => {
																	const newSet = new Set([...prevSet]);
																	newSet.delete(infoOfChoosedFilm.ref);
																	return newSet;
																});
															}
														}
													}}>
													{refsAddedToWatchlist.has(infoOfChoosedFilm?.ref) ? (
														<CheckIcon className='h-5' />
													) : (
														<PlusIcon className='h-5' />
													)}
													{t('Watch later')}
												</button>
											) : (
												<Link
													href={`/${getCookie('langChoosed') === 'english' ? 'en' : 'pl'}/login`}
													className='flex items-center justify-center !w-full gap-x-2 text-[13px] font-medium h-[2.3rem] orange-btn-style'>
													<PlusIcon className='h-5' />
													{t('Watch later')}
												</Link>
											)}
											<ShareBtn setIsVisibleSthDone={setIsVisibleSthDone} whatBtnLook='not-basic' />
										</div>
										<div className='flex flex-col gap-y-2'>
											<section className='flex flex-col text-[14.5px] mt-3'>
												<b className='font-medium text-[15px] mb-1'>{t('Original language')}</b>
												<span>{infoOfChoosedFilm?.originalLang}</span>
											</section>
											<section
												className={`flex flex-col text-[14.5px] mt-3 ${
													infoOfChoosedFilm?.title === infoOfChoosedFilm?.originalTitle ? 'hidden' : 'flex'
												}`}>
												<b className='font-medium text-[15px] mb-1'>{t('Original title')}</b>
												<span>{infoOfChoosedFilm?.originalTitle}</span>
											</section>
											<section
												className={`flex flex-col text-[14.5px] mt-3 ${
													infoOfChoosedFilm?.budget === 1 ? 'hidden' : 'flex'
												}`}>
												<b className='font-medium text-[15px] mb-1'>{t('Budget')}</b>
												<span>
													{infoOfChoosedFilm?.budget.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
												</span>
											</section>
											<section
												className={`flex flex-col text-[14.5px] mt-3 ${
													infoOfChoosedFilm?.profit === 1 ? 'hidden' : 'flex'
												}`}>
												<b className='font-medium text-[15px] mb-1'>{t('Profit')}</b>
												<span>
													{infoOfChoosedFilm?.profit.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
												</span>
											</section>
											<section
												className={`flex flex-col text-[14.5px] mt-3 ${
													infoOfChoosedFilm?.filmedIn.length === 0 ? '!hidden' : 'flex'
												}`}>
												<b className='font-medium text-[15px] mb-1'>{t('Filmed in')}</b>
												<ul className='flex flex-wrap gap-2 mt-1'>
													{infoOfChoosedFilm?.filmedIn &&
														infoOfChoosedFilm?.filmedIn.map((filmedIn: string[] | string, index: number) => (
															<Link
																href={`/${
																	getCookie('langChoosed') === 'english' ? 'en' : 'pl'
																}/production-countries/${encodeURIComponent(
																	normalizePolishCharacters(String(filmedIn).toLowerCase()).replace(/ /g, '-') as any
																)}?order=${getCookie('filterOrderChoosed') || 'most_popular'}`}
																key={index}>
																<li className='px-2 py-[1px] outline outline-[1px] outline-gray4040 text-[13px] rounded-xl hover:underline'>
																	{t(filmedIn)}
																</li>
															</Link>
														))}
												</ul>
											</section>
											<section
												className={`flex flex-col text-[14.5px] mt-3 ${
													infoOfChoosedFilm?.keywords.length === 0 ? '!hidden' : 'flex'
												}`}>
												<b className='font-medium text-[15px] mb-1'>{t('Keywords')}</b>
												<ul className='flex flex-wrap gap-2 mt-1'>
													{infoOfChoosedFilm?.keywords &&
														infoOfChoosedFilm?.keywords.map((keyword: string[] | string, index: number) => (
															<Link
																href={`/${
																	getCookie('langChoosed') === 'english' ? 'en' : 'pl'
																}/keyword/${encodeURIComponent(
																	normalizePolishCharacters(String(keyword).toLowerCase()).replace(/ /g, '-') as any
																)}?order=${getCookie('filterOrderChoosed') || 'most_popular'}`}
																key={index}>
																<li className='px-2 py-[1px] outline outline-[1px] outline-gray4040 text-[13px] rounded-xl hover:underline'>
																	{keyword}
																</li>
															</Link>
														))}
												</ul>
											</section>
										</div>
									</aside>
									<main className='text-sm'>
										<section className='pb-4'>
											<section className='flex items-center mb-4'>
												<section>
													<h1 className='text-2xl sm:text-4xl mb-1 leading-6'>{t(infoOfChoosedFilm?.title || '')}</h1>
													<section>
														<span>{infoOfChoosedFilm?.releaseDate}</span>
														<span className='ml-2 mr-2'>•</span>
														<span>{infoOfChoosedFilm?.time}</span>
													</section>
												</section>
											</section>
											<section className='mb-4'>
												<ul className='flex flex-wrap gap-2 text-[13px]'>
													{infoOfChoosedFilm?.categoryArr &&
														infoOfChoosedFilm?.categoryArr.map((category: string | string, index: number) => (
															<Link
																href={`/${
																	getCookie('langChoosed') === 'angielski' ? 'en' : 'pl'
																}/genre/${encodeURIComponent(
																	normalizePolishCharacters(String(category).toLowerCase()).replace(/ /g, '-')
																).toLowerCase()}?order=${getCookie('filterOrderChoosed') || 'most_popular'}`}
																key={index}>
																<li className='py-[6px] px-3 rounded-2xl hover:underline bg-gray6161'>{t(category)}</li>
															</Link>
														))}
												</ul>
											</section>
											<p>{t(infoOfChoosedFilm?.description || '')}</p>
										</section>
										<section className='mt-6 mb-16'>
											<section className='films-heading-section mb-4'>
												<h1 className='films-category-heading-text'>{t('Reviews')}</h1>
												<section className='sm:flex hidden'>
													<section className='sm:text-[0.9rem] text-[13px] flex items-center min-w-max'>
														<StarIcon className='h-5 mr-2 text-orange' />
														<span>{infoOfChoosedFilm?.rating} / 10</span>
													</section>
												</section>
											</section>
											<ReviewAs infoOfChoosedFilm={infoOfChoosedFilm} />
											<div className={`w-[95%] h-max py-5 border-[1px] border-dotted border-gray3232 rounded !mt-8 flex items-center justify-center flex-col text-center  ${isLogged ? '!hidden' : 'flex'}`} style={{
												margin: '0 auto'
											}}>
												<h1 className='sm:text-[1.2rem] text-lg font-medium px-3 mb-1'>{t('Register is required')}</h1>
												<p className='text-lightGrayD0d0 sm:text-[15px] text-[14px] px-4'>
													<Link
														href={`/${getCookie('langChoosed') === 'angielski' ? 'en' : 'pl'}/login`}
														className='orange-link'>
														{t('Login')}
													</Link>
													&nbsp;{t('or')}&nbsp;
													<Link
														href={`/${getCookie('langChoosed') === 'angielski' ? 'en' : 'pl'}/register`}
														className='orange-link'>
														{t('create account')}
													</Link>
													&nbsp;{t('to add review')}
												</p>
											</div>
										</section>
										<div>
											<section className='films-heading-section'>
												<section className='flex items-center gap-x-2'>
													<h1 className='films-category-heading-text'>{t('Sources')}</h1>
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
															cssMode: true,
														},
														370: {
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
																href={`/${getCookie('langChoosed') === 'angielski' ? 'en' : 'pl'}/watch/${
																	infoOfChoosedFilm?.ref
																}`}
																className='relative cursor-pointer w-full text-sm pr-[0.6rem]'>
																<div className='h-full w-full absolute text-sm font-normal'>
																	<section className='flex items-center gap-x-2 absolute bottom-2 sm:bottom-3 sm:left-3 left-2'>
																		<PlayCircleIcon className='h-6 z-10' />
																		<span className='z-10'>{t('Full video')}</span>
																	</section>
																</div>
																<img
																	className='opacity-60 rounded'
																	src={infoOfChoosedFilm?.imgFullHd500}
																	alt={`Poster for ${t(infoOfChoosedFilm?.title || '')}`}
																/>
															</Link>
															<Link
																href={`/${getCookie('langChoosed') === 'angielski' ? 'en' : 'pl'}/watch/${
																	infoOfChoosedFilm?.ref
																}`}
																className='hover:underline font-medium text-sm'>
																{t('Polish')} Dubbing
															</Link>
														</article>
													</SwiperSlide>
												</Swiper>
											</section>
										</div>
										<div
											className={`${
												findSimilarFilms(infoOfChoosedFilm?.keywords, infoOfChoosedFilm?.title).length > 0
													? 'block'
													: 'hidden'
											}`}>
											<section className='films-heading-section mt-10 mb-4'>
												<h1 className='films-category-heading-text'>{t('Alike films')}</h1>
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
															cssMode: true,
														},
														650: {
															slidesPerView: 4,
															slidesPerGroup: 4,
															spaceBetween: 10,
															cssMode: true,
														},
														400: {
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
																		<Link
																			href={`/${getCookie('langChoosed') === 'angielski' ? 'en' : 'pl'}/titles/${
																				similarFilm?.ref
																			}/${convertTitleToUrl(similarFilm?.title)}`}>
																			<img src={similarFilm?.image} alt={`Poster for ${t(similarFilm?.title)}`} />
																		</Link>
																	</section>
																	<section className='pt-3 flex flex-col gap-y-1'>
																		<section className='sm:text-[0.9rem] text-[13px] flex items-center'>
																			<StarIcon className='h-5 mr-2 text-orange' />
																			<span>{similarFilm?.rating} / 10</span>
																		</section>
																		<Link
																			href={`/${getCookie('langChoosed') === 'english' ? 'en' : 'pl'}/titles/${
																				similarFilm?.ref
																			}/${convertTitleToUrl(similarFilm?.title)}`}
																			className='text-[14px] font-medium max-h-10'>
																			{t(similarFilm?.title)}
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
				<SomethingDone visible={isVisibleSthDone} text={t('Skopiowano link do schowka')} />
			</div>
		</>
	);
};

export default FilmPage;
