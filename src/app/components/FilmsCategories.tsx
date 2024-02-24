'use client';

import React, { useRef, useState } from 'react';
import { ChevronRightIcon, StarIcon, PlayIcon, ChevronLeftIcon } from '@heroicons/react/24/solid';
import { Navigation, Pagination, A11y } from 'swiper/modules';
import Link from 'next/link';
import convertTitleToUrl from '../helpers/ConvertTitleToURL';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { Swiper, SwiperSlide } from 'swiper/react';

import * as filmData from '../data/main-films';
import getCookie from '../helpers/GetCookie';

interface FilmProps {
	headingText: string;
	filmsData: FilmData[];
	linkDirectPage: string;
}

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

const FilmCategory: React.FC<FilmProps> = ({ headingText, filmsData, linkDirectPage }) => {
	const navigationPrevRef = useRef<HTMLButtonElement>(null);
	const navigationNextRef = useRef<HTMLButtonElement>(null);
	const [swiper, setSwiper] = useState<any>(null);

	const handlePrevClick = () => {
		swiper?.slidePrev?.();
	};

	const handleNextClick = () => {
		swiper?.slideNext?.();
	};

	return (
		<div className='films-category-container'>
			<section className='films-heading-section mb-4'>
				<Link href={linkDirectPage} className='films-category-heading-text hover:underline !cursor-pointer'>
					<span>{headingText}</span>
					<ChevronRightIcon className='h-6 films-category-heading-icon transition-all' />
				</Link>
				<section className='films-category-control-btns'>
					<button ref={navigationPrevRef} onClick={handlePrevClick} className={`films-category-control-btn`}>
						<ChevronLeftIcon className='h-5' />
					</button>
					<button ref={navigationNextRef} onClick={handleNextClick} className={`films-category-control-btn`}>
						<ChevronRightIcon className='h-5' />
					</button>
				</section>
			</section>
			<Swiper
				modules={[Navigation, Pagination, A11y]}
				navigation={{ prevEl: navigationPrevRef.current, nextEl: navigationNextRef.current }}
				breakpoints={{
					1120: {
						slidesPerView: 6,
						slidesPerGroup: 6,
						spaceBetween: 20,
						keyboard: true,
					},
					930: {
						slidesPerView: 5,
						slidesPerGroup: 2,
						spaceBetween: 15,
					},
					700: {
						slidesPerView: 4,
						slidesPerGroup: 2,
						spaceBetween: 15,
					},
					460: {
						slidesPerView: 3,
						spaceBetween: 10,
						cssMode: true,
					},
					270: {
						slidesPerView: 2,
						spaceBetween: 10,
						cssMode: true,
					},
					0: {
						slidesPerView: 1,
						spaceBetween: 10,
						cssMode: true,
					},
				}}
				onSwiper={swiper => setSwiper(swiper)}>
				{filmsData.map((film: FilmData, index: number) => (
					<SwiperSlide key={index}>
						<article className='sm:mb-8 mb-6 text-sm font-medium'>
							<section className='relative transition-all hover:brightness-75'>
								<Link href={`/titles/${film.ref}/${convertTitleToUrl(film.title)}`}>
									<img className='max-h-[19rem] sm:h-full w-full rounded object-cover brightness-90 cursor-pointer' src={film.image} alt={`Poster for ${film.title}`} />
									<button className='film-play-btn'>
										<PlayIcon className='text-black h-5' />
									</button>
								</Link>
							</section>
							<section className='films-text-section'>
								<section className='flex items-center'>
									<StarIcon
										className='h-5 mr-2'
										style={{
											color: 'var(--orange)',
										}}
									/>
									<span>{film.rating} / 10</span>
								</section>
								<Link href={`/titles/${film.ref}/${convertTitleToUrl(film.title)}`} className='film-container-title'>
									{film.title}
								</Link>
							</section>
						</article>
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	);
};

export const FilmsCategories: React.FC = () => {
	return (
		<div className='flex flex-col gap-y-10 sm:gap-y-16 mt-12 mb-10'>
			<FilmCategory
				headingText='Popularne filmy'
				filmsData={filmData.popularFilms}
				linkDirectPage={`/channel/popularne-filmy?order=${getCookie('mostPopularChoosed') || 'most_popular'}`}
			/>
			<FilmCategory
				headingText='Ostatnio dodane filmy'
				filmsData={filmData.lastAddedFilms}
				linkDirectPage={`/channel/ostatnio-dodane-filmy?order=${getCookie('mostPopularChoosed') || 'most_popular'}`}
			/>
			<FilmCategory
				headingText='Popularne filmy akcji'
				filmsData={filmData.popularActionFilms}
				linkDirectPage={`/channel/popularne-filmy-akcji?order=${getCookie('mostPopularChoosed') || 'most_popular'}`}
			/>
			<FilmCategory
				headingText='Popularne komedie'
				filmsData={filmData.popularComediaFilms}
				linkDirectPage={`/channel/popularne-komedie?order=${getCookie('mostPopularChoosed') || 'most_popular'}`}
			/>
			<FilmCategory
				headingText='Popularne horrory'
				filmsData={filmData.popularHorrorFilms}
				linkDirectPage={`/channel/popularne-horrory?order=${getCookie('mostPopularChoosed') || 'most_popular'}`}
			/>
			<FilmCategory
				headingText='Popularne polskie filmy'
				filmsData={filmData.popularPolishFilms}
				linkDirectPage={`/channel/popularne-polskie-filmy?order=${getCookie('mostPopularChoosed') || 'most_popular'}`}
			/>
			<FilmCategory
				headingText='Popularne seriale'
				filmsData={filmData.popularSerials}
				linkDirectPage={`/channel/popularne-seriale?order=${getCookie('mostPopularChoosed') || 'most_popular'}`}
			/>
		</div>
	);
};
