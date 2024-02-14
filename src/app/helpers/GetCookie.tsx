const getCookie = (name: string) => {
	if (typeof document === 'undefined') {
		return '';
	}

	const decoded = decodeURIComponent(document.cookie);
	const splited = decoded.split('; ');
	let result = '';

	splited.forEach(e => {
		const [cookieName, cookieValue] = e.split('=');
		if (cookieName === name) result = cookieValue;
	});

	return result;
};

export default getCookie;
