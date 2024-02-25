'use client';

import useDocumentTitle from '@/app/[lang]/helpers/PageTitle';
import { Navbar } from '@/app/[lang]/layouts/Navbar';
import { Footer } from '@/app/[lang]/layouts/Footer';
import '../../../../../style/css/film-page.css';
import SiteNotFound from '@/app/[lang]/[...not_found]/page';
import convertTitleToUrl from '@/app/[lang]/helpers/ConvertTitleToURL';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { useTranslation } from 'react-i18next';
import {
	ChevronRightIcon,
	StarIcon,
	PlayIcon,
	ChevronLeftIcon,
	PlusIcon,
	ShareIcon,
	Bars3BottomLeftIcon,
	PlayCircleIcon,
	ClipboardDocumentCheckIcon,
} from '@heroicons/react/24/solid';
import Link from 'next/link';

import { Navigation, Pagination, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { useEffect, useRef, useState } from 'react';

import { allFilms } from '@/app/[lang]/data/films-data';
import getCookie from '@/app/[lang]/helpers/GetCookie';
import ReviewAs from '@/app/[lang]/components/ReviewAsContainer';
import normalizePolishCharacters from '@/app/[lang]/helpers/NormalizePolishSymbols';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SomethingDone from '@/app/[lang]/components/SomethingDoneDropdown';
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

	const [shareDropdownActive, setShareDropdownActive] = useState<boolean>(false);

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

	const shareDropdownRef = useRef<HTMLDivElement>(null);
	const shareBtnRef = useRef<HTMLButtonElement>(null);

	const handleDocumentClick = (event: MouseEvent) => {
		const isInsideDropdown = (
			target: EventTarget | null,
			dropdownRef: React.RefObject<HTMLDivElement | HTMLButtonElement>
		) => {
			return dropdownRef.current && dropdownRef.current.contains(target as Node);
		};

		if (!isInsideDropdown(event.target, shareDropdownRef) && !isInsideDropdown(event.target, shareBtnRef)) {
			setShareDropdownActive(false);
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
			<div className='space-light'>
				<Navbar isCutted={false} />
				{isLoaded ? (
					isFilmExist ? (
						<main>
							<div className='film-page-image-fullhd-preview'>
								<Link
									href={`/${getCookie('langChoosed') === 'angielski' ? 'en' : 'pl'}/watch/${infoOfChoosedFilm?.ref}`}
									className='film-play-btn'>
									<PlayIcon className='text-black h-6' />
								</Link>
								<div className='film-page-image-gradient'></div>
								<div className='film-page-image-blured'></div>
								<img
									className='w-full h-full absolute object-cover z-[1] opacity-[0.3]'
									src={infoOfChoosedFilm?.imgFullHd1280}
									alt={`Image for ${t(infoOfChoosedFilm?.title || '')}`}
								/>
								<div className='relative h-full w-full items-center flex justify-center'>
									<img
										className='h-full relative sm:mt-[120px] lg:mt-[140px] z-[3] brightness-75 w-[92%] lg:w-[1240px] object-cover'
										src={infoOfChoosedFilm?.imgFullHd1280}
										alt={`Image for ${t(infoOfChoosedFilm?.title || '')}`}
									/>
								</div>
							</div>
							<div className='content-full-space-centered'>
								<div className='film-page-container'>
									<aside className='film-page-aside'>
										<img
											src={infoOfChoosedFilm?.image}
											alt={`Poster for ${t(infoOfChoosedFilm?.title || '')}`}
											className='cursor-pointer'
										/>
										<div className='flex flex-col gap-y-3'>
											<Link
												href={`/${getCookie('langChoosed') === 'angielski' ? 'en' : 'pl'}/watch/${
													infoOfChoosedFilm?.ref
												}`}
												className='film-page-aside-btns orange-btn-style'>
												<PlayIcon className='h-4' />
												{t('Obejrzyj to')}
											</Link>
											<button className='film-page-aside-btns orange-outlined-btn-style'>
												<PlusIcon className='h-4' />
												{t('Obejrzyj potem')}
											</button>
											<section className='relative w-full h-full'>
												<button
													ref={shareBtnRef}
													className='film-page-aside-btns orange-outlined-btn-style'
													onClick={() => setShareDropdownActive(!shareDropdownActive)}>
													<ShareIcon className='h-4' />
													{t('Udostępnij')}
												</button>
												<div
													ref={shareDropdownRef}
													className='absolute h-max w-full top-10 rounded py-1 transition-all z-10'
													style={{
														visibility: shareDropdownActive ? 'visible' : 'hidden',
														opacity: shareDropdownActive ? '1' : '0',
														pointerEvents: shareDropdownActive ? 'all' : 'none',
														backgroundColor: 'var(--dark-1a1a)',
														outline: '1px solid var(--gray-3232)',
													}}>
													<button
														className='flex items-center px-7 btn-choosed-style w-full !py-[10.5px]'
														onClick={() => {
															navigator.clipboard.writeText(window.location.href);
															setShareDropdownActive(false);
															setIsVisibleSthDone(true);
															setTimeout(() => setIsVisibleSthDone(false), 2500);
														}}>
														<ClipboardDocumentCheckIcon className='h-6 text-zinc-200' />
														<span className=' !text-[13px] text-zinc-200 w-max pl-2'>{t('Skopiuj link')}</span>
													</button>
													<button
														className='flex items-center px-7 !py-[10.5px] btn-choosed-style w-full'
														onClick={() => {
															setShareDropdownActive(false);
															window.location.href = `https://www.facebook.com/share.php?u=${encodeURI(
																window.location.href
															)}`;
														}}>
														<FontAwesomeIcon icon={faFacebook} className='h-5 text-zinc-200' />
														<span className='!text-[13px] text-zinc-200 w-max pl-2'>
															{t('Udostępnij na facebooku')}
														</span>
													</button>
													<button
														className='flex items-center px-7 !py-[10.5px] btn-choosed-style w-full'
														onClick={() => {
															setShareDropdownActive(false);
															window.location.href = `https://twitter.com/share?&url=${window.location.href}`;
														}}>
														<FontAwesomeIcon icon={faTwitter} className='h-5 text-zinc-200' />
														<span className='!text-[13px] text-zinc-200 w-max pl-2'>
															{t('Udostępnij na twitterze')}
														</span>
													</button>
												</div>
											</section>
										</div>
										<div className='flex flex-col gap-y-2'>
											<section className='film-page-aside-info-sections'>
												<b className='film-page-aside-info-sections-heading-text'>{t('Oryginalny język')}</b>
												<span>{infoOfChoosedFilm?.originalLang}</span>
											</section>
											<section
												className='film-page-aside-info-sections'
												style={{
													display: infoOfChoosedFilm?.title === infoOfChoosedFilm?.originalTitle ? 'none' : 'flex',
												}}>
												<b className='film-page-aside-info-sections-heading-text'>{t('Oryginalny tytuł')}</b>
												<span>{infoOfChoosedFilm?.originalTitle}</span>
											</section>
											<section
												className='film-page-aside-info-sections'
												style={{
													display: infoOfChoosedFilm?.budget === 1 ? 'none' : 'flex',
												}}>
												<b className='film-page-aside-info-sections-heading-text'>{t('Budżet')}</b>
												<span>
													{infoOfChoosedFilm?.budget.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
												</span>
											</section>
											<section
												className='film-page-aside-info-sections'
												style={{
													display: infoOfChoosedFilm?.profit === 1 ? 'none' : 'flex',
												}}>
												<b className='film-page-aside-info-sections-heading-text'>{t('Przychód')}</b>
												<span>
													{infoOfChoosedFilm?.profit.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
												</span>
											</section>
											<section
												className='film-page-aside-info-sections'
												style={{
													display: infoOfChoosedFilm?.filmedIn.length === 0 ? 'none' : 'flex',
												}}>
												<b className='film-page-aside-info-sections-heading-text'>{t('Nakręcono w')}</b>
												<ul className='film-page-aside-keywords-section-keywords-list'>
													{infoOfChoosedFilm?.filmedIn &&
														infoOfChoosedFilm?.filmedIn.map((filmedIn: string[] | string, index: number) => (
															<Link
																href={`/${
																	getCookie('langChoosed') === 'angielski' ? 'en' : 'pl'
																}/production-countries/${encodeURIComponent(
																	normalizePolishCharacters(String(filmedIn).toLowerCase()).replace(/ /g, '-') as any
																)}?order=${getCookie('filterOrderChoosed') || 'most_popular'}`}
																key={index}>
																<li className='film-page-aside-keywords-section-keyword'>{filmedIn}</li>
															</Link>
														))}
												</ul>
											</section>
											<section
												className='film-page-aside-info-sections'
												style={{
													display: infoOfChoosedFilm?.keywords.length === 0 ? 'none' : 'flex',
												}}>
												<b className='film-page-aside-info-sections-heading-text'>{t('Słowa kluczowe')}</b>
												<ul className='film-page-aside-keywords-section-keywords-list'>
													{infoOfChoosedFilm?.keywords &&
														infoOfChoosedFilm?.keywords.map((keyword: string[] | string, index: number) => (
															<Link
																href={`/${
																	getCookie('langChoosed') === 'angielski' ? 'en' : 'pl'
																}/keyword/${encodeURIComponent(
																	normalizePolishCharacters(String(keyword).toLowerCase()).replace(/ /g, '-') as any
																)}?order=${getCookie('filterOrderChoosed') || 'most_popular'}`}
																key={index}>
																<li className='film-page-aside-keywords-section-keyword'>{keyword}</li>
															</Link>
														))}
												</ul>
											</section>
										</div>
									</aside>
									<main className='film-page-main'>
										<section className='film-page-main-top-info-text-section'>
											<section className='film-page-main-top-info-heading-section'>
												<section>
													<h1 className='film-page-film-title'>{t(infoOfChoosedFilm?.title || '')}</h1>
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
																<li
																	className='py-[6px] px-3 rounded-2xl hover:underline'
																	style={{
																		backgroundColor: 'var(--gray-6161)',
																	}}>
																	{t(category)}
																</li>
															</Link>
														))}
												</ul>
											</section>
											<p>{t(infoOfChoosedFilm?.description || '')}</p>
										</section>
										<section className='film-page-opinion-ab-film'>
											<section className='films-heading-section'>
												<h1 className='films-category-heading-text'>{t('Recenzje')}</h1>
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
														{t('Najnowsze')}
													</button>
												</section>
											</section>
											<ReviewAs infoOfChoosedFilm={infoOfChoosedFilm} />
											<div
												className='opinion-must-be-logged-container'
												style={{
													display: `${isLogged ? 'none' : 'flex'}`,
												}}>
												<h1>{t('Wymagana jest rejestracja')}</h1>
												<p>
													<Link
														href={`/${getCookie('langChoosed') === 'angielski' ? 'en' : 'pl'}/login`}
														className='orange-link'>
														{t('Zaloguj sie')}
													</Link>
													&nbsp;{t('lub')}&nbsp;
													<Link
														href={`/${getCookie('langChoosed') === 'angielski' ? 'en' : 'pl'}/register`}
														className='orange-link'>
														{t('stwórz konto')}
													</Link>
													&nbsp;{t('aby dodać recenzje')}
												</p>
											</div>
										</section>
										<div className='film-page-sources-container mt-1'>
											<section className='films-heading-section'>
												<section className='flex items-center gap-x-2'>
													<h1 className='films-category-heading-text'>{t('Źródła')}</h1>
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
																href={`/${getCookie('langChoosed') === 'angielski' ? 'en' : 'pl'}/watch/${
																	infoOfChoosedFilm?.ref
																}`}
																className='relative cursor-pointer w-full text-sm pr-[0.6rem]'>
																<div
																	className='w-[97%] h-full absolute'
																	style={{
																		background: 'linear-gradient(to top, rgba(0, 0, 0, 0.6) 1%, transparent)',
																	}}></div>
																<div className='h-full w-full absolute text-sm font-normal'>
																	<section className='flex items-center gap-x-2 absolute bottom-2 sm:bottom-3 sm:left-3 left-2'>
																		<PlayCircleIcon className='h-6' />
																		<span>{t('Całe video')}</span>
																	</section>
																</div>
																<img
																	src={infoOfChoosedFilm?.imgFullHd500}
																	alt={`Poster for ${t(infoOfChoosedFilm?.title || '')}`}
																/>
															</Link>
															<Link
																href={`/${getCookie('langChoosed') === 'angielski' ? 'en' : 'pl'}/watch/${
																	infoOfChoosedFilm?.ref
																}`}
																className='hover:underline font-medium text-sm'>
																{t('Polski')} Dubbing
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
												<h1 className='films-category-heading-text mb-4'>{t('Podobne filmy')}</h1>
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
																	<section className='films-image-section relative'>
																		<Link
																			href={`/${getCookie('langChoosed') === 'angielski' ? 'en' : 'pl'}/titles/${
																				similarFilm?.ref
																			}/${convertTitleToUrl(similarFilm?.title)}`}>
																			<img src={similarFilm?.image} alt={`Poster for ${t(similarFilm?.title)}`} />
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
																			href={`/${getCookie('langChoosed') === 'angielski' ? 'en' : 'pl'}/titles/${
																				similarFilm?.ref
																			}/${convertTitleToUrl(similarFilm?.title)}`}
																			className='film-container-title max-h-10'>
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
