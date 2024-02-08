'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import '../../style/css/search-page.css';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

import {
	popularFilmsData,
	lastAddedFilmsData,
	popularActionFilmsData,
	popularComediaFilmsData,
	popularHorrorFilms,
	popularPolishFilms,
	popularSerials,
} from '../data/main-films';
import { text } from 'stream/consumers';

const allFilmsData = [
	...popularFilmsData,
	...lastAddedFilmsData,
	...popularActionFilmsData,
	...popularComediaFilmsData,
	...popularHorrorFilms,
	...popularPolishFilms,
	...popularSerials,
];

type FilmData = {
	image: string;
	title: string;
	rating: number;
};

interface SearchProps {
	textVisible: boolean,
}

let searchTimeout: NodeJS.Timeout;

const Search: React.FC<SearchProps> = ({ textVisible }) => {
	const [searchResults, setSearchResults] = useState<FilmData[]>([]);
	const [whatSearchVal, setWhatSearchVal] = useState<string>('');
	const router = useRouter();

	const handleSearchType = (event: React.ChangeEvent<HTMLInputElement>) => {
		const inputVal = event.target.value.toLowerCase();
		setWhatSearchVal(inputVal);
		const uniqueTitles = new Set<string>();

		allFilmsData.forEach(film => {
			if (film.title.toLowerCase().includes(inputVal)) {
				uniqueTitles.add(film.title);
			}
		});

		const filteredData = Array.from(uniqueTitles).map(title => allFilmsData.find(film => film.title === title));

		setSearchResults(filteredData as FilmData[]);
	};

	const handleKeyUp = () => {
		clearTimeout(searchTimeout);

		searchTimeout = setTimeout(() => {
			router.push(`/search/${whatSearchVal}`);
		}, 1000);
	};

	return (
    <div className='search-page-container'>
      <div className='w-full text-center'>
        <form action={`/search/${whatSearchVal}`} className='flex justify-center'>
          <input
            type='text'
            placeholder='Szukaj filmu, serialu lub aktora...'
            className='search-page-input-style'
            onChange={handleSearchType}
            onKeyUp={handleKeyUp}
          />
        </form>
        <section className={`search-page-text-section flex flex-col items-center gap-y-1 text-center ${textVisible ? 'active' : ''}`}>
          <MagnifyingGlassIcon className='min-h-10 h-10 mb-2' />
          <h1 className='text-lg'>Search vvaciej.to</h1>
          <span
            className='text-sm'
            style={{
              color: 'var(--gray-9999)',
              padding: '0rem .4rem',
            }}>
            Find movies, tv series, people and more.
          </span>
        </section>
      </div>
    </div>
	);
};

export default Search;
