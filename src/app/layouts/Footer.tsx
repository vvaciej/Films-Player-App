'use client';

import { faTwitter, faInstagram, faFacebook, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { GlobeAltIcon } from '@heroicons/react/24/outline';
import { ChevronDownIcon } from '@heroicons/react/24/solid';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

export const Footer: React.FC = () => {
	const [langBtnClickedBool, setLangBtnClickedBool] = useState<boolean>(false);

	const LangSelectDropdownRef = useRef<HTMLDivElement>(null);
	const LangSelectBtnRef = useRef<HTMLButtonElement>(null);

	const handleDocumentClick = (event: MouseEvent) => {
		const isInsideDropdown = (target: EventTarget | null, dropdownRef: React.RefObject<HTMLDivElement | HTMLButtonElement>) => {
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
						<Link href='/pages/regulamin' className='orange-link'>
							Regulamin
						</Link>
						<Link href='/kontakt' className='orange-link'>
							Kontakt
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
							Source <Link href='/'>obejrzyj.to</Link>, site for learning coding
						</p>
					</section>
					<section className='relative'>
						<button
							ref={LangSelectBtnRef}
							className='flex items-center gap-x-2 py-2 px-3 rounded-md relative'
							onClick={() => setLangBtnClickedBool(!langBtnClickedBool)}>
							<GlobeAltIcon className='h-5' />
							<span className='mr-1'>Polski</span>
							<ChevronDownIcon className='h-4' />
						</button>
						<div
							className={`absolute sm:w-[11rem] w-[8rem] h-max rounded right-1/2 sm:translate-x-0 translate-x-1/2 sm:right-0 sm:bottom-12 bottom-8 py-1 transition-opacity ${
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
								onClick={() => setLangBtnClickedBool(!langBtnClickedBool)}
								className='btn-choosed-style choosed gap-x-2 flex'>
								Polski
							</button>
						</div>
					</section>
				</section>
			</footer>
		</div>
	);
};
