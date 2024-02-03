'use client';

import { faTwitter, faInstagram, faFacebook, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { GlobeAltIcon } from '@heroicons/react/24/outline';
import { ChevronDownIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';
import Link from 'next/link';

export const Footer: React.FC = () => {
	const [btnClickedBool, setBtnClickedBool] = useState<boolean>(false);

	return (
		<div className='content-full-space-centered'>
			<footer className='footer-container'>
				<section className='footer-topside-section'>
					<section className='footer-topside-leftside-section'>
						<Link href='/pages/regulamin'>Regulamin</Link>
						<Link href='/kontakt'>Kontakt</Link>
					</section>
					<section className='footer-topside-rightside-section'>
						<FontAwesomeIcon className='cursor-pointer footer-brand-icon' icon={faFacebook} />
						<FontAwesomeIcon className='cursor-pointer footer-brand-icon' icon={faTwitter} />
						<FontAwesomeIcon className='cursor-pointer footer-brand-icon' icon={faInstagram} />
						<FontAwesomeIcon className='cursor-pointer footer-brand-icon' icon={faYoutube} />
					</section>
				</section>
				<hr className='mt-3 mb-3 border-neutral-700' />
				<section className='footer-bottomside-section'>
					<section>
						<p className='mb-1'>
							Source <Link href='#'>obejrzyj.to</Link>, site for learning coding
						</p>
					</section>
					<section className='relative'>
						<button
							className='footer-lang-btn-select flex items-center gap-x-2 py-2 px-3 rounded-md relative'
							onClick={() => setBtnClickedBool(!btnClickedBool)}>
							<GlobeAltIcon className='h-5' />
							<span className='mr-1'>Polski</span>
							<ChevronDownIcon className='h-4' />
						</button>
						<div className={`footer-choose-lang-div ${btnClickedBool ? 'active' : ''}`}>
							<button className='footer-lang-option' onClick={() => setBtnClickedBool(!btnClickedBool)}>
								Polski
							</button>
						</div>
					</section>
				</section>
			</footer>
		</div>
	);
}
