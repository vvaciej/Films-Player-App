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
				<p>
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
				</p>
			</div>
			<Footer isVisible={true} />
		</>
	);
};

export default Policy;
