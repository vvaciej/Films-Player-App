import Search from "./Search";
import { Navbar } from "../layouts/Navbar";
import { Footer } from "../layouts/Footer";

const SearchPage: React.FC = () => {
	return (
		<div className='space-light'>
			<Navbar isCutted={false} />
			<div className='content-full-space-centered'>
				<div
					style={{
						width: '100%',
						display: 'flex',
						justifyContent: 'center',
						height: '76vh',
						padding: 'var(--main-container-padd-top) 0rem',
					}}>
					<Search textVisible={true} />
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default SearchPage;