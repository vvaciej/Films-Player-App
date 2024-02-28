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
	const { t } = useTranslation();
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
		<section className='main-heading-left-container hide-scrollbar'>
			{isWindowUnder800 ? (
				headingFilmsData.map((film, index: number) => (
					<div className='flex min-w-full h-full relative' key={index}>
						<img
							className='w-full h-full object-cover rounded !brightness-50'
							src={film.imgFullHd1280}
							alt={`Poster for ${film.title}`}
							loading='eager'
						/>
						<div className='absolute z-[1] top-0 left-0 h-full w-full px-2 sm:px-5 rounded-[0.3rem]'>
							<div className='flex items-center gap-x-6 h-full w-full pl-3'>
								<div className='flex flex-col gap-y-1 w-[37rem] select-none'>
									<p className='text-sm flex items-center mb-[2px]'>
										<StarIcon className='h-5 mr-2 text-orange' />
										<span>{film.rating} / 10</span>
									</p>
									<Link
										href={`/${
											getCookie('langChoosed') === 'english' ? 'en' : 'pl'
										}/titles/${reference}/${convertTitleToUrl(title)}`}
										className='text-[17px] mb-1 leading-5'>
										{t(film.title)}
									</Link>
									<p className='max-h-[5.3rem] overflow-hidden text-[14.5px] mb-3 sm:block hidden text-zinc-200'>
										{t(film.description)}
									</p>
									<Link
										href={`/${
											getCookie('langChoosed') === 'english' ? 'en' : 'pl'
										}/titles/${reference}/${convertTitleToUrl(title)}`}
										className='flex items-center sm:text-sm text-xs gap-x-1 font-medium !rounded-full orange-btn-style sm:!py-2 sm:!px-3 mt-1'>
										<PlayIcon className='h-4' />
										<span>{t('Watch this')}</span>
									</Link>
								</div>
							</div>
						</div>
					</div>
				))
			) : (
				<div className='flex min-w-full h-full relative'>
					<img
						className='w-full h-full object-cover rounded'
						src={imgFullHd1280}
						alt={`Poster for ${title}`}
						loading='eager'
					/>
					<div
						className='absolute z-[1] top-0 left-0 h-full w-full rounded-[0.3rem]'
						style={{
							background: 'linear-gradient(to top, #000 9%, transparent)',
						}}
					/>
					<div className='absolute h-full w-full z-[2] top-0 px-[1.5rem] py-7'>
						<button
							className='flex items-center justify-center text-[1.4rem] w-[3rem] h-[3rem] absolute left-4 top-[29.5%] transition-all hover:brightness-75 outline outline-[1px] outline-white rounded'
							onClick={leftBtnFunction}>
							<ChevronLeftIcon className='h-7' />
						</button>
						<button
							className='flex items-center justify-center text-[1.4rem] w-[3rem] h-[3rem] absolute right-4 top-[29.5%] transition-all hover:brightness-75 outline outline-[1px] outline-white rounded'
							onClick={rightBtnFunction}>
							<ChevronRightIcon className='h-7' />
						</button>
						<div className='flex items-end gap-x-6 h-full w-full pl-2'>
							<Link
								href={`/${getCookie('langChoosed') === 'english' ? 'en' : 'pl'}/titles/${reference}/${convertTitleToUrl(
									title
								)}`}>
								<img src={image} alt={`Poster for ${title}`} className='w-[13.1rem]' loading='eager' />
							</Link>
							<div className='flex flex-col gap-y-2 w-[37rem] select-none'>
								<p className='text-sm flex items-center'>
									<StarIcon className='h-5 mr-2 text-orange' />
									<span>{rating} / 10</span>
								</p>
								<Link
									href={`/${
										getCookie('langChoosed') === 'english' ? 'en' : 'pl'
									}/titles/${reference}/${convertTitleToUrl(title)}`}
									className='text-3xl hover:underline'>
									{t(title)}
								</Link>
								<p className='mb-[0.5rem] max-h-[8.1rem] overflow-hidden leading-[1.68] text-[15.5px]'>
									{t(description)}
								</p>
								<Link
									href={`/${
										getCookie('langChoosed') === 'english' ? 'en' : 'pl'
									}/titles/${reference}/${convertTitleToUrl(title)}`}
									className='flex items-center gap-x-2 !rounded-full text-sm font-medium orange-btn-style'>
									<PlayIcon className='h-4' />
									<span>{t('Watch this')}</span>
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
	<section className='h-full w-full hidden lg:block'>
		<h1>{t('Next')}</h1>
		<div className='flex flex-col justify-between h-[92%] mt-[1.2rem]'>
			{sidebarFilmsData.slice(...currentIndexes).map((film: any, index: number) => (
				<div key={index} className='w-full flex flex-col gap-y-1'>
					<section className={'text-[14px] hover:brightness-75 transition-all'}>
						<Link
							href={`/${getCookie('langChoosed') === 'english' ? 'en' : 'pl'}/titles/${film.ref}/${convertTitleToUrl(
								film.title
							)}`}>
							<img src={film.imgFullHd500} alt={`Poster for ${film.title}`} loading='eager' />
						</Link>
					</section>
					<section>
						<section className='max-h-6 overflow-hidden'>
							<Link
								href={`/${getCookie('langChoosed') === 'english' ? 'en' : 'pl'}/titles/${
									film.ref
								}/${convertTitleToUrl(film.title)}`}
								className='text-[14px] font-medium hover:underline'>
								{t(film.title)}
							</Link>
						</section>
						<p className='flex mt-1'>
							<StarIcon
								className='h-5 mr-2 text-orange'
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
	const { t } = useTranslation();

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
		<div className='flex gap-x-5 h-full md:h-[37rem]'>
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
