'use client';

import Link from 'next/link';
import { Navbar } from '../layouts/Navbar';
import { Footer } from '../layouts/Footer';
import getCookie from '../../../helpers/GetCookie';

import useDocumentTitle from '../../../helpers/PageTitle';
import { useTranslation } from 'react-i18next';

const SiteNotFound: React.FC = () => {
	const { t } = useTranslation();
	useDocumentTitle(`${t(`Not found`)} - vvaciej.app`);

	return (
		<div className='space-light'>
			<Navbar isCutted={false} />
			<div className='flex justify-center w-full'>
				<div className='flex items-center sm:pb-32 pb-64 md:justify-between w-11/12 gap-x-24 h-screen lg:w-[1240px] justify-center'>
					<main className='flex flex-col gap-y-2'>
						<h1 className='md:text-2xl text-xl font-semibold'>
							{t('It looks like you\'ve found the door to a big nothing.')}
						</h1>
						<span className='md:text-md text-sm'>
							{t('Sorry about that! Please visit our homepage to get where you need to go.')}
						</span>
						<Link
							href={`/${getCookie('langChoosed') === 'angielski' ? 'en' : 'pl'}/`}
							className='orange-btn-style mt-2'>
							{t('Take me there!')}
						</Link>
					</main>
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default SiteNotFound;
