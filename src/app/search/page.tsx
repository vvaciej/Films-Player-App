import { Footer } from '../layouts/Footer';
import { Navbar } from '../layouts/Navbar';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import '../../style/css/home.css';

const Search: React.FC = () => {
	return (
		<div className='space-light'>
			<Navbar isCutted={false} />
			<div className='content-full-space-centered'>
				<div
					className='flex flex-col items-center gap-y-1'
					style={{
						height: '76vh',
						padding: 'calc(var(--main-container-padd-top) + 2rem) 0rem',
					}}>
					<MagnifyingGlassIcon className='min-h-10 h-10 mb-2' />
					<h1 className='text-lg'>Search vvaciej.to</h1>
					<span
						className='text-sm'
						style={{
							color: 'var(--gray-9999)',
              textAlign: 'center',
              padding: '0rem .4rem',
						}}>
						Find movies, tv series, people and more.
					</span>
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default Search;
