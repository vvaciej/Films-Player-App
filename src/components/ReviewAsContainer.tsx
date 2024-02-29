import { StarIcon } from '@heroicons/react/24/solid';
import getCookie from '../helpers/GetCookie';
import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/navigation';

const ReviewAs = ({ infoOfChoosedFilm }: any) => {
	const isLogged = getCookie('email');
	const { t } = useTranslation();
	const router = useRouter();

	const [isHoveredStar, setHoveredStars] = useState<number | null>(null);
	const [indexStars, setIndexStars] = useState<number | null>(null);
	const [isAddOpinionSelected, setAddOpinionSelected] = useState<boolean>(false);

	const [reviewDescription, setReviewDescription] = useState<string>('');
	const [reviewTitle, setReviewTitle] = useState<string>('');
	const [reviewAdded, setReviewAdded] = useState<boolean>(false);

	const reviewDescriptionRef = useRef<HTMLTextAreaElement>(null);
	const reviewTitleRef = useRef<HTMLInputElement>(null);

	return (
		<>
			<div
				className={`bg-dark0f0f p-5 px-3 rounded w-full gap-y-4 flex outline-[1px] outline outline-gray3232 flex-col ${
					reviewAdded ? 'hidden' : 'block'
				} `}>
				<section className='flex sm:items-center justify-between flex-col sm:flex-row gap-y-2'>
					<section className='!w-max px-[2px] text-lightGrayD0d0 text-sm flex mb-1'>
						{isLogged ? (
							<img
								src='https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png'
								alt='user avatar'
								className='mr-4 hidden sm:block w-12 h-max outline-[1px] outline outline-gray3232 rounded-[50%]'></img>
						) : (
							<img
								className='object-cover max-w-12 max-h-12 mr-4 w-12 h-max hidden sm:block'
								src='https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/default-profile-picture-grey-male-icon.png'
								alt={`Poster for ${infoOfChoosedFilm?.title}`}
							/>
						)}
						<section>
							<span className='pl-1'>
								{t('Review by')}&nbsp;
								<b className='text-white'>{isLogged ? getCookie('email').match(/^(.+)@/)?.[1] || '' : ''}</b>
							</span>
							<section className={`flex mt-1`}>
								{Array.from({ length: 10 }).map((_, index: number) => (
									<StarIcon
										className={`sm:h-6 h-5 cursor-pointer sm:px-1 pr-1 ${
											(!indexStars &&
												!isHoveredStar &&
												infoOfChoosedFilm &&
												index < Number(String(infoOfChoosedFilm?.rating).slice(0, 1))) ||
											(isHoveredStar && isHoveredStar > index) ||
											(indexStars && !isHoveredStar && indexStars >= index + 1)
												? 'text-orange'
												: 'text-gray5050'
										}`}
										key={index}
										onMouseOver={() => setHoveredStars(index + 1)}
										onMouseOut={() => setHoveredStars(null)}
										onClick={() => setIndexStars(index + 1)}
									/>
								))}
							</section>
						</section>
					</section>
					<button
						className={`${isLogged ? 'orange-btn-style' : 'orange-outlined-btn-style brightness-75'} ${
							isAddOpinionSelected ? 'hidden' : 'flex'
						} text-[13.5px] font-medium w-max !px-3 !py-2`}
						onClick={() => {
							if (getCookie('email')) {
								setAddOpinionSelected(!isAddOpinionSelected);
							} else {
								router.push(`/${getCookie('langChoosed') === 'english' ? 'en' : 'pl'}/login`);
							}
						}}>
						{t('Add a review')}
					</button>
				</section>
				{isLogged && isAddOpinionSelected ? (
					<>
						<div>
							<section className='flex flex-col gap-y-4 sm:gap-y-7 w-full mt-3'>
								<section className='flex flex-col gap-y-1'>
									<label className='text-sm' htmlFor='title'>
										{t('Title')}
									</label>
									<input
										className='input-style orange-outline-focus transition-all'
										type='text'
										id='title'
										ref={reviewTitleRef}
										onChange={e => {
											setReviewTitle(e.currentTarget.value);
										}}
									/>
								</section>
								<section className='flex flex-col gap-y-1'>
									<label className='text-sm' htmlFor='opinion-mess'>
										{t('Review')}
									</label>
									<textarea
										className='input-style orange-outline-focus !pt-2 transition-all'
										ref={reviewDescriptionRef}
										onChange={e => {
											setReviewDescription(e.currentTarget.value);
										}}
										id='opinion-mess'
									/>
								</section>
							</section>
							<section className='flex gap-x-2 justify-end mt-3'>
								<button
									className='btn-style-outlined w-max sm:!px-7 !py-2 !text-md'
									onClick={() => setAddOpinionSelected(!isAddOpinionSelected)}>
									{t('Cancel')}
								</button>
								<button
									className='orange-btn-style w-max sm:!px-7 !py-2 text-sm'
									onClick={() => {
										if (reviewDescriptionRef.current?.value !== '' && reviewTitleRef.current?.value !== '') {
											setReviewAdded(true);
										} else {
											if (reviewDescriptionRef.current) {
												reviewDescriptionRef.current.style.outline = '1px solid var(--red)';
												setTimeout(() => {
													if (reviewDescriptionRef.current) {
														reviewDescriptionRef.current.style.outline = '';
													}
												}, 1000);
											}
											if (reviewTitleRef.current) {
												reviewTitleRef.current.style.outline = '1px solid var(--red)';
												setTimeout(() => {
													if (reviewTitleRef.current) {
														reviewTitleRef.current.style.outline = '';
													}
												}, 1000);
											}
										}
									}}>
									{t('Add')}
								</button>
							</section>
						</div>
					</>
				) : (
					''
				)}
			</div>
			{reviewAdded ? (
				<div
					className={`w-full h-max mt-6 ${
						reviewAdded ? 'block' : 'hidden'
					} bg-dark0f0f rounded outline outline-[1px] outline-gray3232 p-3 py-4`}>
					<div className='h-max px-5 flex gap-x-1 border-b-[1px] border-gray3232 pb-3'>
						<img
							src='https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png'
							alt='user avatar'
							className='mr-4 hidden sm:block w-12 h-max outline-[1px] outline outline-gray3232 rounded-[50%]'></img>
						<section className={`flex gap-y-1 flex-col w-full overflow-hidden`}>
							<h1 className='font-medium'>{getCookie('email').match(/^(.+)@/)?.[1] || ''}</h1>
							<section className='flex gap-x-2 items-center'>
								<StarIcon className='text-orange h-6 w-max' />
								<span className='text-sm'>{indexStars || infoOfChoosedFilm?.rating} / 10</span>
							</section>
							<h1 className='font-medium mb-1 text-base'>{reviewTitle}</h1>
							<p className='text-sm font-normal'>{reviewDescription}</p>
						</section>
					</div>
				</div>
			) : getCookie('email') ? (
				<div className='flex items-center w-full h-full justify-center mt-6 flex-col'>
					<h1 className='text-zinc-100'>{t('Seems a little quiet over here')}</h1>
					<span className=' text-sm text-zinc-300'>{t('Be the first to comment')}</span>
				</div>
			) : (
				''
			)}
		</>
	);
};

export default ReviewAs;
