'use client';

import Link from 'next/link';
import { Navbar } from '../layouts/Navbar';
import { Footer } from '../layouts/Footer';

import '../../style/css/global.css';
import useDocumentTitle from '../helpers/PageTitle';

const SiteNotFound: React.FC = () => {
	useDocumentTitle('Nie znaleziono - vvaciej.app');

	return (
		<div className='space-light'>
			<Navbar isCutted={false} />
			<div className='content-full-space-centered'>
				<div className='flex items-center sm:pb-32 pb-64 md:justify-between lg:w-10/12 gap-x-24 h-screen w-11/12 justify-center'>
					<main className='flex flex-col gap-y-2'>
						<h1 className='md:text-2xl text-xl font-semibold'>Wygląda na to, że znalazłeś drzwi do wielkiego niczego.</h1>
						<span className='md:text-md text-sm'>Sorry about that! Please visit our homepage to get where you need to go.</span>
						<Link href='/' className='orange-btn-style mt-2'>Zabierz mnie tam!</Link>
					</main>
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default SiteNotFound;
