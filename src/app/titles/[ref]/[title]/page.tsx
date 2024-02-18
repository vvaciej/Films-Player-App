'use client';

import useDocumentTitle from '@/app/helpers/PageTitle';
import { Navbar } from '@/app/layouts/Navbar';
import { Footer } from '@/app/layouts/Footer';
import '../../../../style/css/film-page.css';
import SiteNotFound from '@/app/[...not_found]/page';
import convertTitleToUrl from '@/app/helpers/ConvertTitleToURL';
import { ChevronRightIcon, StarIcon, PlayIcon, ChevronLeftIcon, PlusIcon, ShareIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';

import { Navigation, Pagination, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { useEffect, useRef, useState } from 'react';

import { allFilms } from '@/app/data/films-data';
interface pageProps {
	params: { ref: number; title: string };
}

const FilmPage: React.FC<pageProps> = ({ params }) => {
	const [isLoaded, setIsLoaded] = useState<boolean>(false);

	const photosSwiperNextBtn = useRef<HTMLButtonElement>(null);
	const photosSwiperPrevBtn = useRef<HTMLButtonElement>(null);
	const [swiper, setSwiper] = useState<any>(null);

	const handlePrevClick = () => {
		swiper?.slidePrev?.();
	};

	const handleNextClick = () => {
		swiper?.slideNext?.();
	};

	useEffect(() => {
		setTimeout(() => {
			setIsLoaded(true);
		}, 200);
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
						<>
							<div className='film-page-image-fullhd-preview'>
								<button className='film-play-btn'>
									<PlayIcon className='text-black h-6' />
								</button>
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
										<section
											style={{
												display: findSimilarFilms(infoOfChoosedFilm?.keywords, infoOfChoosedFilm?.title).length > 0 ? 'block' : 'none'
											}}>
											<section className='films-heading-section mt-6'>
												<Link href={'#'} className='films-category-heading-text hover:underline !cursor-pointer'>
													<span>Podobne filmy</span>
													<ChevronRightIcon className='h-6 films-category-heading-icon transition-all' />
												</Link>
												<section className='films-category-control-btns'>
													<button
														className={`films-category-control-btn`}
														onClick={handlePrevClick}
														ref={photosSwiperPrevBtn}>
														<ChevronLeftIcon className='h-5' />
													</button>
													<button
														className={`films-category-control-btn`}
														onClick={handleNextClick}
														ref={photosSwiperNextBtn}>
														<ChevronRightIcon className='h-5' />
													</button>
												</section>
											</section>
											<div className='film-page-swiper-container'>
												<Swiper
													modules={[Navigation, Pagination, A11y]}
													navigation={{ prevEl: photosSwiperPrevBtn.current, nextEl: photosSwiperNextBtn.current }}
													className='film-page-main-similiar-films-section'
													onSwiper={swiper => setSwiper(swiper)}
													breakpoints={{
														800: {
															slidesPerView: 4,
															slidesPerGroup: 4,
															spaceBetween: 20,
														},
														420: {
															slidesPerView: 3,
															slidesPerGroup: 3,
															spaceBetween: 10,
														},
														0: {
															slidesPerView: 2,
															slidesPerGroup: 2,
															spaceBetween: 10,
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
										</section>
									</main>
								</div>
							</div>
							<Footer />
						</>
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
