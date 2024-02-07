'use client';

import { ChevronLeftIcon, ChevronRightIcon, StarIcon, PlayIcon } from '@heroicons/react/24/solid';
import { sidebarFilmsData, headingFilmsData } from '../data/heading-films';
import { useState, useEffect } from 'react';

interface HeadingProps {
	rating: string;
	title: string;
	description: string;
	imgMiniaturePath: string;
	imgFullHDPath: string;
	rightBtnFunction: () => void;
	leftBtnFunction: () => void;
}

type FilmData = {
	image: string;
	title: string;
	rating: number;
};

export const HeadingContainer: React.FC<HeadingProps> = ({
	rating,
	title,
	description,
	imgMiniaturePath,
	imgFullHDPath,
	rightBtnFunction,
	leftBtnFunction,
}) => {
	
	const isWindowDefined = typeof window !== 'undefined';

	const [isWindowUnder800, setIsWindowUnder800] = useState<boolean>(
		isWindowDefined ? window.innerWidth < 800 : false
	);

	useEffect(() => {
		const handleResize = () => {
			setIsWindowUnder800(isWindowDefined && window.innerWidth <= 800);
		};

		handleResize();

		if (isWindowDefined) {
			window.addEventListener('resize', handleResize);

			return () => {
				window.removeEventListener('resize', handleResize);
			};
		}
	}, []);

	return (
		<section className='main-heading-left-container'>
			{isWindowUnder800 ? (
				headingFilmsData.map((film, index: number) => (
					<div className='main-heading-left-film-wrapper' key={index}>
						<img
							className='main-heading-fullhd-img'
							src={film.imgFullHDPath}
							alt={`Poster for ${film.title}`}
							loading='eager'
						/>
						<div className='main-heading-fullhd-img-gradient'></div>
						<div className='main-heading-onimage-container'>
							<button className='main-heading-control-btn' onClick={leftBtnFunction}>
								<ChevronLeftIcon className='h-7' />
							</button>
							<button className='main-heading-control-btn right-btn' onClick={rightBtnFunction}>
								<ChevronRightIcon className='h-7' />
							</button>
							<div className='main-heading-left-bottom-section'>
								<img
									src={film.imgMiniaturePath}
									alt={`Poster for ${film.title}`}
									className='main-heading-miniature'
									srcSet={`${film.imgMiniaturePath} 300w, ${film.imgFullHDPath} 1200w`}
									sizes='(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 25vw'
									loading='eager'
								/>
								<div className='main-heading-left-text-container'>
									<p className='main-text-rating flex items-center'>
										<StarIcon
											className='h-5 mr-2'
											style={{
												color: 'var(--orange)',
											}}
										/>
										<span>{film.rating} / 10</span>
									</p>
									<a href='#' className='main-heading-left-text-film-title'>
										{film.title}
									</a>
									<p className='main-heading-left-text-film-description'>{film.description}</p>
									<button className='main-heading-left-text-btn'>
										<PlayIcon className='h-4' />
										<span>Obejrzyj to</span>
									</button>
								</div>
							</div>
						</div>
					</div>
				))
			) : (
				<div className='main-heading-left-film-wrapper'>
					<img className='main-heading-fullhd-img' src={imgFullHDPath} alt={`Poster for ${title}`} loading='eager' />
					<div className='main-heading-fullhd-img-gradient'></div>
					<div className='main-heading-onimage-container'>
						<button className='main-heading-control-btn' onClick={leftBtnFunction}>
							<ChevronLeftIcon className='h-7' />
						</button>
						<button className='main-heading-control-btn right-btn' onClick={rightBtnFunction}>
							<ChevronRightIcon className='h-7' />
						</button>
						<div className='main-heading-left-bottom-section'>
							<img
								src={imgMiniaturePath}
								alt={`Poster for ${title}`}
								className='main-heading-miniature'
								loading='eager'
							/>
							<div className='main-heading-left-text-container'>
								<p className='main-text-rating flex items-center'>
									<StarIcon
										className='h-5 mr-2'
										style={{
											color: 'var(--orange)',
										}}
									/>
									<span>{rating} / 10</span>
								</p>
								<a href='#' className='main-heading-left-text-film-title'>
									{title}
								</a>
								<p className='main-heading-left-text-film-description'>{description}</p>
								<button className='main-heading-left-text-btn'>
									<PlayIcon className='h-4' />
									<span>Obejrzyj to</span>
								</button>
							</div>
						</div>
					</div>
				</div>
			)}
		</section>
	);
}

interface SidebarProps {
	currentIndexes: [number, number];
}

const SidebarContainer: React.FC<SidebarProps> = ({ currentIndexes }) => (
	<section className='main-heading-right-container'>
		<h1 className='main-heading-right-top-text'>Następne</h1>
		<div className='main-heading-right-films-container'>
			{sidebarFilmsData.slice(...currentIndexes).map((film: FilmData, index: number) => (
				<div key={index} className='main-heading-right-film'>
					<section className={'main-heading-right-film-miniature-section'}>
						<a href='#' className='main-heading-right-film-miniature-link'>
							<img src={film.image} alt={`Poster for ${film.title}`} loading='eager' />
							<button className='film-play-btn'>
								<PlayIcon className='text-black h-5' />
							</button>
						</a>
					</section>
					<section>
						<h3 className='font-semibold main-heading-right-film-title'>{film.title}</h3>
						<p className='main-heading-left-text-rating flex mt-1'>
							<StarIcon
								className='h-5 mr-2'
								style={{
									color: 'var(--orange)',
								}}
							/>
							<span className='text-sm'>{film.rating} / 10</span>
						</p>
					</section>
				</div>
			))}
		</div>
	</section>
);

export const HeadingFilmsInteraction: React.FC = () => {
	const [currentIndex, setCurrentIndex] = useState<number>(0);
	const currentHeading = headingFilmsData[currentIndex];

	const [currentSidebarStart, setCurrentSidebarStart] = useState<number>(0);
	const [currentSidebarEnd, setCurrentSidebarEnd] = useState<number>(3);
	const sidebarIndexes: [number, number] = [currentSidebarStart, currentSidebarEnd];

	const handleLeftBtn = () => {
		if (currentIndex > 0) {
			setCurrentIndex(prevState => prevState - 1);
			setCurrentSidebarStart(prevState => prevState - 1);
			setCurrentSidebarEnd(prevState => prevState - 1);
		} else {
			setCurrentIndex(headingFilmsData.length - 1);
			setCurrentSidebarStart(headingFilmsData.length - 1);
			setCurrentSidebarEnd(headingFilmsData.length - -2);
		}
	};

	const handleRightBtn = () => {
		if (currentIndex < headingFilmsData.length - 1) {
			setCurrentIndex(prevState => prevState + 1);
			setCurrentSidebarStart(prevState => prevState + 1);
			setCurrentSidebarEnd(prevState => prevState + 1);
		} else if (currentIndex === headingFilmsData.length - 1) {
			setCurrentIndex(0);
			setCurrentSidebarStart(0);
			setCurrentSidebarEnd(3);
		}
	};

	return (
		<div className='main-heading-container'>
			<HeadingContainer
				rating={currentHeading.rating}
				title={currentHeading.title}
				description={currentHeading.description}
				imgMiniaturePath={currentHeading.imgMiniaturePath}
				imgFullHDPath={currentHeading.imgFullHDPath}
				rightBtnFunction={handleRightBtn}
				leftBtnFunction={handleLeftBtn}
			/>
			<SidebarContainer currentIndexes={sidebarIndexes} />
		</div>
	);
}
