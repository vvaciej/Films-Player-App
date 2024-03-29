'use client';

import { Navbar } from '../../layouts/Navbar';
import { Footer } from '../../layouts/Footer';
import useDocumentTitle from '@/helpers/PageTitle';
import { useTranslation } from 'react-i18next';

const Policy: React.FC = () => {
	const { t } = useTranslation();
	useDocumentTitle(`${t(`Rules`)} - vvaciej.app`);

	return (
		<div className='space-dark'>
			<Navbar isCutted={true} />
			<div className='flex w-full justify-center h-[76vh] overflow-hidden'>
				<main className='main-container-width-padd-top-1240'>
					<h1 className='text-2xl mb-4'>{t(`Rules`)}</h1>
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
