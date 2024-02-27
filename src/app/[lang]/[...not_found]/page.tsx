'use client';

import Link from 'next/link';
import { Navbar } from '../layouts/Navbar';
import { Footer } from '../layouts/Footer';
import getCookie from '../helpers/GetCookie';

import useDocumentTitle from '../helpers/PageTitle';
import { useTranslation } from 'react-i18next';

const SiteNotFound: React.FC = () => {
	const { t, i18n } = useTranslation();
	useDocumentTitle(`${t(`Nie znaleziono`)} - vvaciej.app`);

	return (
		<div className='space-light'>
			<Navbar isCutted={false} />
			<div className='content-full-space-centered'>
				<div className='flex items-center sm:pb-32 pb-64 md:justify-between w-11/12 gap-x-24 h-screen lg:w-[1240px] justify-center'>
					<main className='flex flex-col gap-y-2'>
						<h1 className='md:text-2xl text-xl font-semibold'>
							{t('Wygląda na to, że znalazłeś drzwi do wielkiego niczego.')}
						</h1>
						<span className='md:text-md text-sm'>
							{t('Przepraszamy za to! Odwiedź naszą stronę główną, aby dostać się tam, gdzie chcesz.')}
						</span>
						<Link
							href={`/${getCookie('langChoosed') === 'angielski' ? 'en' : 'pl'}/`}
							className='orange-btn-style mt-2'>
							{t('Zabierz mnie tam!')}
						</Link>
					</main>
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default SiteNotFound;
