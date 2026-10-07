'use client'

import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useState, useEffect, useCallback } from 'react';

export function useUrlPagination(defaultPage = 1) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const pageFromUrl = Number(searchParams.get('page')) || defaultPage;

    const [page, setPage] = useState(pageFromUrl);

    useEffect(() => {
        setPage(pageFromUrl);
    }, [pageFromUrl]);

    const changePage = useCallback((newPage: number) => {
        setPage(newPage);
        const params = new URLSearchParams(searchParams.toString());
        params.set('page', newPage.toString());

        router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    }, [pathname, searchParams, router]);

    return { page, changePage };
}