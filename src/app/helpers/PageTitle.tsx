'use client';

import React, { useEffect } from 'react';

const useDocumentTitle = (title: string) => {
	useEffect(() => {
		document.title = title;
	}, [title]);
};


const PageTitle = ({ title }: { title: string }) => {
	if (typeof window !== 'undefined') {
		useDocumentTitle(title);
	}

	return null;
};

export default PageTitle;