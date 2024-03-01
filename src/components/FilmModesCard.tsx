import Link from 'next/link';
import convertTitleToUrl from '@/helpers/ConvertTitleToURL';
import getCookie from '@/helpers/GetCookie';
import { StarIcon } from '@heroicons/react/24/solid';
import { useTranslation } from 'react-i18next';

const FilmModesCard = ({ film, mode, indexSource }: any) => {
	const { t } = useTranslation();

	return (
		<>
			{mode === 'portrait' ? (
				<article className='sm:mb-8 mb-6 text-sm font-medium' key={indexSource}>
					<section className='relative transition-all hover:brightness-75'>
						<Link
							href={`/${getCookie('langChoosed') === 'english' ? 'en' : 'pl'}/titles/${film.ref}/${convertTitleToUrl(
								film.title
							)}`}>
							<img
								className=' max-w-[188px] max-h-[17rem] sm:h-full w-full rounded object-cover brightness-90 cursor-pointer'
								src={film.image}
								alt={`Poster for ${t(film.title)}`}
							/>
						</Link>
					</section>
					<section className='pt-3 flex flex-col gap-y-1 max-h-12'>
						<section className='flex items-center'>
							<StarIcon className='h-5 mr-2 text-orange' />
							<span>{film.apiRating} / 10</span>
						</section>
						<Link
							href={`/${getCookie('langChoosed') === 'english' ? 'en' : 'pl'}/titles/${film.ref}/${convertTitleToUrl(
								film.title
							)}`}
							className='film-container-title'>
							{t(film.title)}
						</Link>
					</section>
				</article>
			) : mode === 'landscape' ? (
				<article className='film-container-landscape w-full' key={indexSource}>
					<section className='films-image-section'>
						<Link
							href={`/${getCookie('langChoosed') === 'english' ? 'en' : 'pl'}/titles/${film.ref}/${convertTitleToUrl(
								film.title
							)}`}>
							<img src={film.imgFullHd500} className='!max-h-[13rem]' alt={`Poster for ${t(film.title)}`} />
						</Link>
					</section>
					<section className='pt-3 flex flex-col gap-y-1'>
						<Link
							href={`/${getCookie('langChoosed') === 'english' ? 'en' : 'pl'}/titles/${film.ref}/${convertTitleToUrl(
								film.title
							)}`}
							className='text-[14.5px] font-medium search-title pr-1'>
							{t(film.title)}
						</Link>
						<span className='text-xs sm:text-sm'>{film.releaseDate}</span>
						<section className='sm:text-[0.9rem] text-[13px] flex items-center'>
							<StarIcon className='h-5 mr-2 text-orange' />
							<span>{film.apiRating} / 10</span>
						</section>
					</section>
				</article>
			) : mode === 'list' ? (
				<article className='flex gap-x-2 sm:gap-x-4 h-[200px] w-full' key={indexSource}>
					<section className='films-image-section'>
						<Link
							href={`/${getCookie('langChoosed') === 'english' ? 'en' : 'pl'}/titles/${film.ref}/${convertTitleToUrl(
								film.title
							)}`}>
							<img
								className='sm:min-w-[136px] min-w-[120px] max-h-[200px] sm:h-[200px] max-h-46 sm:max-w-32 pr-2'
								src={film.image}
								alt={`Poster for ${t(film.title)}`}
							/>
						</Link>
					</section>
					<section className='pt-3 flex flex-col gap-y-1'>
						<Link
							href={`/${getCookie('langChoosed') === 'english' ? 'en' : 'pl'}/titles/${film.ref}/${convertTitleToUrl(
								film.title
							)}`}
							className='text-[14.5px] font-medium search-title pr-1'>
							{t(film.title)}
						</Link>
						<span className='text-xs sm:text-sm'>{film.time}</span>
						<section className='flex sm:flex-row flex-col gap-y-[0.15rem] text-[13px] mt-1'>
							<section className='flex items-center'>
								<StarIcon className='h-4 mr-2 text-orange' />
								<span>{film.apiRating} / 10 &nbsp;&nbsp;</span>
							</section>
						</section>
						<p className='w-full hide-scrollbar text-[12px] sm:text-[13px] max-h-[200px] overflow-auto'>
							{t(film.description)}
						</p>
					</section>
				</article>
			) : (
				''
			)}
		</>
	);
};

export default FilmModesCard;
