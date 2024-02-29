import Link from 'next/link';
import convertTitleToUrl from '@/helpers/ConvertTitleToURL';
import getCookie from '@/helpers/GetCookie';
import { StarIcon } from '@heroicons/react/24/solid';
import { useTranslation } from 'react-i18next';

const FilmCategoryCard = ({ film }: any) => {
	const { t } = useTranslation();
  
	return (
		<>
			<article className='sm:mb-8 mb-6 text-sm font-medium'>
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
						<span>{film.rating} / 10</span>
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
		</>
	);
};

export default FilmCategoryCard;
