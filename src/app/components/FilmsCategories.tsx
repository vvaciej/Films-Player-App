'use client';

import React, { useRef, useEffect, useState } from 'react';
import { ChevronRightIcon, StarIcon, PlayIcon, ChevronLeftIcon } from '@heroicons/react/24/solid';
import { Navigation, Pagination, A11y } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { Swiper, SwiperSlide } from 'swiper/react';

import {
	popularFilmsData,
	lastAddedFilmsData,
	popularActionFilmsData,
	popularComediaFilmsData,
	popularHorrorFilms,
	popularPolishFilms,
	popularSerials,
} from '../data/main-films';

interface FilmProps {
	headingText: string;
	filmsData: FilmData[];
}

type FilmData = {
	image: string;
	title: string;
	rating: number;
}

const FilmCategory: React.FC<FilmProps> = ({ headingText, filmsData }) => {
	const navigationPrevRef = useRef<HTMLButtonElement>(null);
	const navigationNextRef = useRef<HTMLButtonElement>(null);
	const [swiper, setSwiper] = useState<any>(null);

	const [slidesPerView, setSlidesPerView] = useState<number>(6);
	const [slidesPerGroup, setSlidesPerGroup] = useState<number>(6);

	useEffect(() => {
		const handleResize = () => {
			const windowWidth = window.innerWidth;

			if (windowWidth >= 1220) {
				setSlidesPerView(6);
			} else if (windowWidth >= 980) {
				setSlidesPerView(5);
				setSlidesPerGroup(3);
			} else if (windowWidth >= 750) {
				setSlidesPerView(4);
				setSlidesPerGroup(2);
			} else if (windowWidth >= 460) {
				setSlidesPerView(3);
				setSlidesPerGroup(2);
			} else if (windowWidth >= 270) {
				setSlidesPerView(2);
				setSlidesPerGroup(1);
			} else {
				setSlidesPerView(1);
				setSlidesPerGroup(1);
			}
		};

		handleResize();

		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	const handlePrevClick = () => {
		swiper?.slidePrev?.();
	};

	const handleNextClick = () => {
		swiper?.slideNext?.();
	};

	return (
		<div className='films-category-container'>
			<section className='popular-films-heading-section'>
				<a href='#' className='popular-films-category-heading-text'>
					<span>{headingText}</span>
					<ChevronRightIcon className='h-6 popular-films-category-heading-icon transition-all' />
				</a>
				<div className='popular-films-category-control-btns'>
					<button ref={navigationPrevRef} onClick={handlePrevClick} className={`popular-films-category-control-btn`}>
						<ChevronLeftIcon className='h-5' />
					</button>
					<button ref={navigationNextRef} onClick={handleNextClick} className={`popular-films-category-control-btn`}>
						<ChevronRightIcon className='h-5' />
					</button>
				</div>
			</section>
			<Swiper
				modules={[Navigation, Pagination, A11y]}
				navigation={{ prevEl: navigationPrevRef.current, nextEl: navigationNextRef.current }}
				spaceBetween={20}
				slidesPerView={slidesPerView}
				// cssMode
				mousewheel
				freeMode
				keyboard
				slidesPerGroup={slidesPerGroup}
				onSwiper={swiper => setSwiper(swiper)}>
				{filmsData.map((film: FilmData, index: number) => (
					<SwiperSlide key={index}>
						<article className='film-container'>
							<section className='films-image-section'>
								<a href='#'>
									<img src={film.image} alt={`Poster for ${film.title}`} />
									<button className='film-play-btn'>
										<PlayIcon className='text-black h-5' />
									</button>
								</a>
							</section>
							<section className='films-text-section'>
								<p className='main-text-rating flex items-center'>
									<StarIcon
										className='h-5 mr-2'
										style={{
											color: 'var(--orange)',
										}}
									/>
									<span>{film.rating} / 10</span>
								</p>
								<a className='film-container-title'>{film.title}</a>
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
		<div className='films-wrapper'>
			<FilmCategory headingText='Popularne filmy' filmsData={popularFilmsData} />
			<FilmCategory headingText='Ostatnio dodane filmy' filmsData={lastAddedFilmsData} />
			<FilmCategory headingText='Popularne filmy akcji' filmsData={popularActionFilmsData} />
			<FilmCategory headingText='Popularne komedie' filmsData={popularComediaFilmsData} />
			<FilmCategory headingText='Popularne horrory' filmsData={popularHorrorFilms} />
			<FilmCategory headingText='Popularne polskie filmy' filmsData={popularPolishFilms} />
			<FilmCategory headingText='Popularne seriale' filmsData={popularSerials} />
		</div>
	);
}
