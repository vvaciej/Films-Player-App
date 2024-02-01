'use client';

import '../../../style/css/home.css';
import '../../../style/css/regulamin.css';

import { Navbar } from '@/app/layouts/Navbar';
import useDocumentTitle from '@/app/helpers/PageTitle';
import RootLayout from '@/app/layout';

const Policy: React.FC = () => {
	useDocumentTitle('vvaciej.app - Regulamin');

	return (
		<RootLayout componentsVisible={true}>
			<Navbar isCutted={true} />
			<div className='policy-container'>
				<h1>Regulamin</h1>
				<p>Soon...</p>
			</div>
		</RootLayout>
	);
};

export default Policy;
