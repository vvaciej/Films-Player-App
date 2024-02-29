'use client';

import { faTwitter, faInstagram, faFacebook, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { GlobeAltIcon } from '@heroicons/react/24/outline';
import { ChevronDownIcon } from '@heroicons/react/24/solid';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import getCookie from '../../../helpers/GetCookie';

export const Footer: React.FC = () => {
	const { t } = useTranslation();

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
		if (typeof window !== 'undefined') {
			const url = window.location.pathname;
			const urlLang = url.startsWith('/en') ? 'english' : 'polish';
			setLangSelected(urlLang);
		}

		document.body.addEventListener('click', handleDocumentClick);

		return () => {
			document.body.removeEventListener('click', handleDocumentClick);
		};
	}, []);

	return (
		<div className='flex w-full justify-center'>
			<footer className='relative xl:w-[1240px] w-[93%] sm:h-max h-[11rem] mt-28 sm:mt-16 pb-8 text-sm text-lightGrayDdd'>
				<section className='flex justify-between w-full relative sm:flex-row flex-col sm:gap-y-0 gap-y-4'>
					<section className='flex gap-x-5 text-sm'>
						<Link
							href={`/${getCookie('langChoosed') === 'english' ? 'en' : 'pl'}/pages/regulamin`}
							className='orange-link'>
							{t('Rules')}
						</Link>
						<Link href={`/${getCookie('langChoosed') === 'english' ? 'en' : 'pl'}/kontakt`} className='orange-link'>
							{t('Contact')}
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
							{t('Źródło')} <Link href={`/${getCookie('langChoosed') === 'english' ? 'en' : 'pl'}`}>obejrzyj.to</Link>
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
							className={`absolute sm:w-[11rem] w-[8rem] h-18 rounded right-1/2 sm:translate-x-0 translate-x-1/2 sm:right-0 sm:bottom-10 bottom-10 py-1 transition-opacity ${
								langBtnClickedBool ? 'active visible opacity-100' : 'invisible opacity-0'
							} border-[1px] border-gray3232 bg-1a1a transition-opacity`}
							ref={LangSelectDropdownRef}>
							<button
								onClick={() => {
									setLangBtnClickedBool(!langBtnClickedBool);
									setLangSelected('polish');
									const currentPath = window.location.pathname;
									const newPath = currentPath.startsWith('/en') ? currentPath.replace('/en', '/pl') : '/pl';
									window.location.href = newPath;
								}}
								className={`btn-choosed-style ${langSelected === 'polish' ? 'choosed' : ''} gap-x-1 flex`}>
								{t('polish')}
							</button>
							<button
								onClick={() => {
									setLangBtnClickedBool(!langBtnClickedBool);
									setLangSelected('english');
									const currentPath = window.location.pathname;
									const newPath = currentPath.startsWith('/pl') ? currentPath.replace('/pl', '/en') : '/en';
									window.location.href = newPath;
								}}
								className={`btn-choosed-style ${langSelected === 'english' ? 'choosed' : ''} gap-x-1 flex`}>
								{t('english')}
							</button>
						</div>
					</section>
				</section>
			</footer>
		</div>
	);
};
