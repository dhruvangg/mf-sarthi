'use client';

import { usePathname } from 'next/navigation';

type Breadcrumb = {
    label: string;
    href: string;
};

export function useBreadcrumbs(): Breadcrumb[] {
    const pathname = usePathname();
    const pathArray = pathname.split('/').filter((path) => path)

    const breadcrumbs = pathArray.map((path, index) => {
        const href = '/' + pathArray.slice(0, index + 1).join('/');
        const label = decodeURIComponent(path.replace(/-/g, ' ')); // Format labels

        return { label, href };
    });

    return [{ label: 'Home', href: '/' }, ...breadcrumbs];
}
