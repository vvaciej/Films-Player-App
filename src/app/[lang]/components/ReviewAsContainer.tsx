import { StarIcon } from '@heroicons/react/24/solid';
import getCookie from '../helpers/GetCookie';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const ReviewAs = ({ infoOfChoosedFilm }: any) => {
	const isLogged = getCookie('email');
	const { t } = useTranslation();

	const [isHoveredStar, setHoveredStars] = useState<number | null>(null);
	const [indexStars, setIndexStars] = useState<number | null>(null);
	const [isAddOpinionSelected, setAddOpinionSelected] = useState<boolean>(false);

	return (
		<div className='film-page-opinion-ab-film-review-container'>
			<section className='flex sm:items-center justify-between flex-col sm:flex-row gap-y-2 film-page-opinion-ab-film-heading-section'>
				<section className='!w-max film-page-opinion-ab-film-left-section'>
					{isLogged ? (
						<img
							src='https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png'
							alt='user avatar'
							className='mr-4 hidden sm:block w-12 h-max'
							style={{
								outline: '1px solid var(--gray-3232)',
								borderRadius: '50%',
							}}></img>
					) : (
						<img
							className='object-cover max-w-12 max-h-12 mr-4 w-12 h-max hidden sm:block'
							src='https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/default-profile-picture-grey-male-icon.png'
							alt={`Poster for ${infoOfChoosedFilm?.title}`}
						/>
					)}
					<section>
						<span className='pl-1'>
							{t('Recenzja przez')}&nbsp;
							<b className='text-white'>{isLogged ? getCookie('email').match(/^(.+)@/)?.[1] || '' : ''}</b>
						</span>
						<section className='flex mt-1'>
							{Array.from({ length: 10 }).map((_, index: number) => (
								<StarIcon
									className='film-page-opinions-stars-icons cursor-pointer sm:px-1 pr-1'
									key={index}
									onMouseOver={() => setHoveredStars(index + 1)}
									onMouseOut={() => setHoveredStars(null)}
									onClick={() => setIndexStars(index + 1)}
									style={{
										color:
											(!indexStars &&
												!isHoveredStar &&
												infoOfChoosedFilm &&
												index < Number(String(infoOfChoosedFilm?.rating).slice(0, 1))) ||
											(isHoveredStar && isHoveredStar > index) ||
											(indexStars && !isHoveredStar && indexStars >= index + 1)
												? 'var(--orange)'
												: 'var(--gray-5050)',
									}}
								/>
							))}
						</section>
					</section>
				</section>
				<button
					className={`${isLogged ? 'logged' : ''} ${
						isAddOpinionSelected ? 'hidden' : 'flex'
					} film-page-add-opinion-btn`}
					onClick={() => setAddOpinionSelected(!isAddOpinionSelected)}>
					{t('Dodaj recenzję')}
				</button>
			</section>
			{isLogged && isAddOpinionSelected ? (
				<div>
					<section className='flex flex-col gap-y-4 sm:gap-y-7 w-full mt-3'>
						<section className='flex flex-col gap-y-1'>
							<label className='text-sm' htmlFor='title'>
								{t('Tytuł')}
							</label>
							<input className='input-style orange-outline-focus' type='text' id='title' />
						</section>
						<section className='flex flex-col gap-y-1'>
							<label className='text-sm' htmlFor='opinion-mess'>
								{t('Recenzja')}
							</label>
							<textarea className='input-style orange-outline-focus !pt-2' id='opinion-mess' />
						</section>
					</section>
					<section className='flex gap-x-2 justify-end mt-1'>
						<button
							className='btn-style-outlined w-max sm:!px-7 !py-2 !text-md'
							onClick={() => setAddOpinionSelected(!isAddOpinionSelected)}>
							{t('Anuluj')}
						</button>
						<button className='orange-btn-style w-max sm:!px-7 !py-2 text-sm'>{t('Dodaj')}</button>
					</section>
				</div>
			) : (
				''
			)}
		</div>
	);
};

export default ReviewAs;
