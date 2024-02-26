'use client';

import { faTwitter, faInstagram, faFacebook, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { GlobeAltIcon } from '@heroicons/react/24/outline';
import { ChevronDownIcon } from '@heroicons/react/24/solid';
import { useState, useEffect, useRef, useContext } from 'react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import getCookie from '../helpers/GetCookie';

export const Footer: React.FC = () => {
	const { t, i18n } = useTranslation();

	const [langBtnClickedBool, setLangBtnClickedBool] = useState<boolean>(false);
	const [langSelected, setLangSelected] = useState<string>(`${getCookie('langChoosed')}`);

	useEffect(() => {
		document.cookie = `langChoosed=${langSelected}; path=/`;
	}, [langSelected]);

	const LangSelectDropdownRef = useRef<HTMLDivElement>(null);
	const LangSelectBtnRef = useRef<HTMLButtonElement>(null);

	const handleDocumentClick = (event: MouseEvent) => {
		const isInsideDropdown = (
			target: EventTarget | null,
			dropdownRef: React.RefObject<HTMLDivElement | HTMLButtonElement>
		) => {
			return dropdownRef.current && dropdownRef.current.contains(target as Node);
		};

		if (!isInsideDropdown(event.target, LangSelectDropdownRef) && !isInsideDropdown(event.target, LangSelectBtnRef)) {
			setLangBtnClickedBool(false);
		}
	};

	useEffect(() => {
		document.body.addEventListener('click', handleDocumentClick);

		return () => {
			document.body.removeEventListener('click', handleDocumentClick);
		};
	}, []);

	return (
		<div className='content-full-space-centered'>
			<footer
				className='relative xl:w-[1240px] w-[93%] sm:h-max h-[11rem] mt-28 sm:mt-16 pb-8 text-sm'
				style={{
					color: 'var(--light-gray-ddd)',
				}}>
				<section className='flex justify-between w-full relative sm:flex-row flex-col sm:gap-y-0 gap-y-4'>
					<section className='flex gap-x-5 text-sm'>
						<Link
							href={`/${getCookie('langChoosed') === 'angielski' ? 'en' : 'pl'}/pages/regulamin`}
							className='orange-link'>
							{t('Regulamin')}
						</Link>
						<Link href={`/${getCookie('langChoosed') === 'angielski' ? 'en' : 'pl'}/kontakt`} className='orange-link'>
							{t('Kontakt')}
						</Link>
					</section>
					<section className='footer-topside-rightside-section flex gap-x-7 text-xl'>
						<FontAwesomeIcon className='cursor-pointer' icon={faFacebook} />
						<FontAwesomeIcon className='cursor-pointer' icon={faTwitter} />
						<FontAwesomeIcon className='cursor-pointer' icon={faInstagram} />
						<FontAwesomeIcon className='cursor-pointer' icon={faYoutube} />
					</section>
				</section>
				<hr className='mt-3 mb-3 border-neutral-700' />
				<section className='flex justify-between w-full relative h-max sm:flex-row flex-col sm:items-start items-center'>
					<section>
						<p className='mb-1'>
							{t('Źródło')} <Link href={`/${getCookie('langChoosed') === 'angielski' ? 'en' : 'pl'}`}>obejrzyj.to</Link>
						</p>
					</section>
					<section className='relative'>
						<button
							ref={LangSelectBtnRef}
							className='flex items-center gap-x-2 py-2 px-3 rounded-md relative'
							onClick={() => setLangBtnClickedBool(!langBtnClickedBool)}>
							<GlobeAltIcon className='h-5' />
							<span className='mr-1'>{t(langSelected)}</span>
							<ChevronDownIcon className='h-4' />
						</button>
						<div
							className={`absolute sm:w-[11rem] w-[8rem] h-12 rounded right-1/2 sm:translate-x-0 translate-x-1/2 sm:right-0 sm:bottom-15 bottom-16 py-1 transition-opacity ${
								langBtnClickedBool ? 'active' : ''
							}`}
							ref={LangSelectDropdownRef}
							style={{
								border: '1px solid var(--gray-3232)',
								backgroundColor: 'var(--dark-1a1a)',
								visibility: langBtnClickedBool ? 'visible' : 'hidden',
								opacity: langBtnClickedBool ? '1' : '0',
								transition: 'opacity 0.1s',
							}}>
							<button
								onClick={() => {
									setLangBtnClickedBool(!langBtnClickedBool);
									setLangSelected('polski');
									const currentPath = window.location.pathname;
									const newPath = currentPath.startsWith('/en') ? currentPath.replace('/en', '/pl') : '/pl';
									window.location.href = newPath;
								}}
								className={`btn-choosed-style ${langSelected === 'polski' ? 'choosed' : ''} gap-x-1 flex`}
								style={{
									paddingLeft: langSelected === 'polski' ? '1rem' : '2.3rem',
								}}>
								{t('polski')}
							</button>
							<button
								onClick={() => {
									setLangBtnClickedBool(!langBtnClickedBool);
									setLangSelected('angielski');
									const currentPath = window.location.pathname;
									const newPath = currentPath.startsWith('/pl') ? currentPath.replace('/pl', '/en') : '/en';
									window.location.href = newPath;
								}}
								className={`btn-choosed-style ${langSelected === 'angielski' ? 'choosed' : ''} gap-x-1 flex`}
								style={{
									paddingLeft: langSelected === 'angielski' ? '1rem' : '2.3rem',
								}}>
								{t('angielski')}
							</button>
						</div>
					</section>
				</section>
			</footer>
		</div>
	);
};
