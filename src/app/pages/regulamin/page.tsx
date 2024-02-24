'use client';

import '../../../style/css/global.css';

import { Navbar } from '@/app/layouts/Navbar';
import { Footer } from '@/app/layouts/Footer';
import useDocumentTitle from '@/app/helpers/PageTitle';

const Policy: React.FC = () => {
	useDocumentTitle('vvaciej.app - Regulamin');

	return (
		<div className='space-dark'>
			<Navbar isCutted={true} />
			<div className='content-full-space-centered h-[76vh] overflow-hidden'>
				<main className='main-container-width-padd-top-1240'>
					<h1 className='text-2xl mb-4'>Regulamin</h1>
					<div>
						<h4>§ 1. ...</h4>
						<h4>§ 2. ...</h4>
						<h4>§ 3. ...</h4>
						<h4>§ 4. ...</h4>
						<h4>§ 5. ...</h4>
						<h4>§ 6. ...</h4>
						<h4>§ 7. ...</h4>
						<h4>§ 8. ...</h4>
						<h4>§ 8. ...</h4>
						<h4>§ 9. ...</h4>
						<h4>§ 10. ...</h4>
						<h4>§ 11. ...</h4>
						<h4>§ 12. ...</h4>
						<h4>§ 13. ...</h4>
						<h4>§ 14. ...</h4>
					</div>
				</main>
			</div>
			<Footer />
		</div>
	);
};

export default Policy;
