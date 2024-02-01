'use client';

import '../../../style/css/home.css';
import '../../../style/css/regulamin.css';

import { Navbar } from '@/app/layouts/Navbar';
import { Footer } from '@/app/layouts/Footer';
import useDocumentTitle from '@/app/helpers/PageTitle';

const Policy: React.FC = () => {
	useDocumentTitle('vvaciej.app - Regulamin');

	return (
		<>
			<Navbar isCutted={true} />
			<div className='policy-container'>
				<h1>Regulamin</h1>
				<p>Soon...</p>
			</div>
			<Footer isVisible={true} />
		</>
	);
};

export default Policy;
