export async function MovieAPI(movieId: number, type: string): Promise<number> {
	const res = await fetch(
		`https://api.themoviedb.org/3/${
			type === 'movie' ? 'movie' : 'tv'
		}/${movieId}?api_key=afe67cb61c49ff84eafa9936e527d05b`
	);

	return await res.json();
}