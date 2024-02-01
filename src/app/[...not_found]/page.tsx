'use client';

import Link from 'next/link';
import { Navbar } from '../layouts/Navbar';
import RootLayout from '../layout';

import '../../style/css/home.css';
import '../../style/css/not-found.css';
import useDocumentTitle from '../helpers/PageTitle';

const SiteNotFound: React.FC = () => {
	useDocumentTitle('Nie znaleziono - vvaciej.app')
	
	return (
		<RootLayout componentsVisible={true}>
			<Navbar isCutted={false} />
			<div className='notfound-container'>
				<section className='notfound-left-section'>
					<h1>Wygląda na to, że znalazłeś drzwi do wielkiego niczego.</h1>
					<span>Sorry about that! Please visit our homepage to get where you need to go.</span>
					<Link href='/'>Zabierz mnie tam!</Link>
				</section>
				<section className='notfound-right-section'>
					<img src='https://obejrzyj.to/build/assets/404-1-176145e9.png' alt='error-art' />
				</section>
			</div>
		</RootLayout>
	);
}

export default SiteNotFound;
