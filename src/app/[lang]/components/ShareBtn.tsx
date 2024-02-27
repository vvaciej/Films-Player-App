import { useRef, useEffect, useState } from 'react';
import { ShareIcon, ClipboardDocumentCheckIcon } from '@heroicons/react/24/solid';
import { useTranslation } from 'react-i18next';
import { faTwitter, faFacebook } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ShareBtn = ({ setIsVisibleSthDone, whatBtnLook }: any) => {
	const [shareDropdownActive, setShareDropdownActive] = useState<boolean>(false);
	const shareDropdownRef = useRef<HTMLDivElement>(null);
	const shareBtnRef = useRef<HTMLButtonElement>(null);

	const { t } = useTranslation();

	const handleDocumentClick = (event: MouseEvent) => {
		const isInsideDropdown = (
			target: EventTarget | null,
			dropdownRef: React.RefObject<HTMLDivElement | HTMLButtonElement>
		) => {
			return dropdownRef.current && dropdownRef.current.contains(target as Node);
		};

		if (!isInsideDropdown(event.target, shareDropdownRef) && !isInsideDropdown(event.target, shareBtnRef)) {
			setShareDropdownActive(false);
		}
	};

	useEffect(() => {
		document.body.addEventListener('click', handleDocumentClick);

		return () => {
			document.body.removeEventListener('click', handleDocumentClick);
		};
	}, []);

	return (
		<section className='relative w-full h-full'>
			{whatBtnLook === 'basic' ? (
				<button
					className=' transparent-btn-style cursor-pointer !p-2'
					ref={shareBtnRef}
					onClick={() => setShareDropdownActive(!shareDropdownActive)}>
					<ShareIcon className='h-4' />
				</button>
			) : (
				<button
					ref={shareBtnRef}
					className='film-page-aside-btns orange-outlined-btn-style'
					onClick={() => setShareDropdownActive(!shareDropdownActive)}>
					<ShareIcon className='h-4' />
					{t('Udostępnij')}
				</button>
			)}
			<div
				ref={shareDropdownRef}
				className='absolute h-max w-full min-w-64 top-10 rounded py-1 transition-all z-10 right-0'
				style={{
					visibility: shareDropdownActive ? 'visible' : 'hidden',
					opacity: shareDropdownActive ? '1' : '0',
					pointerEvents: shareDropdownActive ? 'all' : 'none',
					backgroundColor: 'var(--dark-1a1a)',
					outline: '1px solid var(--gray-3232)',
				}}>
				<button
					className='flex items-center px-7 btn-choosed-style w-full !py-[10.5px]'
					onClick={() => {
						navigator.clipboard.writeText(window.location.href);
						setShareDropdownActive(false);
						setIsVisibleSthDone(true);
						setTimeout(() => setIsVisibleSthDone(false), 2500);
					}}>
					<ClipboardDocumentCheckIcon className='h-6 text-zinc-200' />
					<span className=' !text-[13px] text-zinc-200 w-max pl-2'>{t('Skopiuj link')}</span>
				</button>
				<button
					className='flex items-center px-7 !py-[10.5px] btn-choosed-style w-full'
					onClick={() => {
						setShareDropdownActive(false);
						window.location.href = `https://www.facebook.com/share.php?u=${encodeURI(window.location.href)}`;
					}}>
					<FontAwesomeIcon icon={faFacebook} className='h-5 text-zinc-200' />
					<span className='!text-[13px] text-zinc-200 w-max pl-3'>{t('Udostępnij na facebooku')}</span>
				</button>
				<button
					className='flex items-center px-7 !py-[10.5px] btn-choosed-style w-full'
					onClick={() => {
						setShareDropdownActive(false);
						window.location.href = `https://twitter.com/share?&url=${window.location.href}`;
					}}>
					<FontAwesomeIcon icon={faTwitter} className='h-5 text-zinc-200' />
					<span className='!text-[13px] text-zinc-200 w-max pl-3'>{t('Udostępnij na twitterze')}</span>
				</button>
			</div>
		</section>
	);
};

export default ShareBtn;
