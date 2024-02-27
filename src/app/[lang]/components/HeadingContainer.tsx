'use client';

import { ChevronLeftIcon, ChevronRightIcon, StarIcon, PlayIcon } from '@heroicons/react/24/solid';
import { sidebarFilmsData, headingFilmsData } from '../data/heading-films';
import { useState, useEffect } from 'react';

import Link from 'next/link';
import convertTitleToUrl from '../../../helpers/ConvertTitleToURL';
import getCookie from '../../../helpers/GetCookie';
import { useTranslation } from 'react-i18next';

interface HeadingProps {
	rating: number;
	title: string;
	image: string;
	description: string;
	reference: number;
	imgFullHd1280: string | undefined;
	rightBtnFunction: () => void;
	leftBtnFunction: () => void;
}

export const HeadingContainer: React.FC<HeadingProps> = ({
	rating,
	title,
	description,
	image,
	reference,
	imgFullHd1280,
	rightBtnFunction,
	leftBtnFunction,
}) => {
	const { t, i18n } = useTranslation();
	const isWindowDefined = typeof window !== 'undefined';

	const [isWindowUnder800, setIsWindowUnder800] = useState<boolean>(isWindowDefined ? window.innerWidth < 800 : false);

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
							src={film.imgFullHd1280}
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
									<Link
										href={`/${
											getCookie('langChoosed') === 'english' ? 'en' : 'pl'
										}/titles/${reference}/${convertTitleToUrl(title)}`}
										className='main-heading-left-text-film-title'>
										{t(film.title)}
									</Link>
									<p className='main-heading-left-text-film-description'>{t(film.description)}</p>
									<Link
										href={`/${
											getCookie('langChoosed') === 'english' ? 'en' : 'pl'
										}/titles/${reference}/${convertTitleToUrl(title)}`}
										className='main-heading-left-text-btn orange-btn-style'>
										<PlayIcon className='h-4' />
										<span>{t('Obejrzyj to')}</span>
									</Link>
								</div>
							</div>
						</div>
					</div>
				))
			) : (
				<div className='main-heading-left-film-wrapper'>
					<img className='main-heading-fullhd-img' src={imgFullHd1280} alt={`Poster for ${title}`} loading='eager' />
					<div className='main-heading-fullhd-img-gradient'></div>
					<div className='main-heading-onimage-container'>
						<button className='main-heading-control-btn' onClick={leftBtnFunction}>
							<ChevronLeftIcon className='h-7' />
						</button>
						<button className='main-heading-control-btn right-btn' onClick={rightBtnFunction}>
							<ChevronRightIcon className='h-7' />
						</button>
						<div className='main-heading-left-bottom-section'>
							<Link
								href={`/${
									getCookie('langChoosed') === 'english' ? 'en' : 'pl'
								}/titles/${reference}/${convertTitleToUrl(title)}`}>
								<img src={image} alt={`Poster for ${title}`} className='main-heading-miniature' loading='eager' />
							</Link>
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
								<Link
									href={`/${
										getCookie('langChoosed') === 'english' ? 'en' : 'pl'
									}/titles/${reference}/${convertTitleToUrl(title)}`}
									className='main-heading-left-text-film-title'>
									{t(title)}
								</Link>
								<p className='main-heading-left-text-film-description'>{t(description)}</p>
								<Link
									href={`/${
										getCookie('langChoosed') === 'english' ? 'en' : 'pl'
									}/titles/${reference}/${convertTitleToUrl(title)}`}
									className='main-heading-left-text-btn orange-btn-style'>
									<PlayIcon className='h-4' />
									<span>{t('Obejrzyj to')}</span>
								</Link>
							</div>
						</div>
					</div>
				</div>
			)}
		</section>
	);
};

interface SidebarProps {
	currentIndexes: [number, number];
	t: any;
}

const SidebarContainer: React.FC<SidebarProps> = ({ currentIndexes, t }) => (
	<section className='main-heading-right-container'>
		<h1 className='main-heading-right-top-text'>{t('Następne')}</h1>
		<div className='main-heading-right-films-container'>
			{sidebarFilmsData.slice(...currentIndexes).map((film: any, index: number) => (
				<div key={index} className='main-heading-right-film'>
					<section className={'main-heading-right-film-miniature-section'}>
						<Link
							href={`/${getCookie('langChoosed') === 'english' ? 'en' : 'pl'}/titles/${film.ref}/${convertTitleToUrl(
								film.title
							)}`}
							className='main-heading-right-film-miniature-link'>
							<img src={film.imgFullHd500} alt={`Poster for ${film.title}`} loading='eager' />
						</Link>
					</section>
					<section>
						<section className='max-h-6 overflow-hidden'>
							<Link
								href={`/${getCookie('langChoosed') === 'english' ? 'en' : 'pl'}/titles/${
									film.ref
								}/${convertTitleToUrl(film.title)}`}
								className='font-medium main-heading-right-film-title hover:underline'>
								{t(film.title)}
							</Link>
						</section>
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
	const { t, i18n } = useTranslation();

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
				image={currentHeading.image}
				imgFullHd1280={currentHeading.imgFullHd1280}
				reference={currentHeading.ref}
				rightBtnFunction={handleRightBtn}
				leftBtnFunction={handleLeftBtn}
			/>
			<SidebarContainer currentIndexes={sidebarIndexes} t={t} />
		</div>
	);
};
