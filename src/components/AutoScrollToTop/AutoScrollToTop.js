// ScrollToTop.js
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';


function AutoScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
        const shouldSkipScroll = /^\/course\/view\/\d+/.test(pathname);

        if (!shouldSkipScroll) {
            window.scrollTo(0, 0);
        }
    }, [pathname]);

    return null;
}

export default AutoScrollToTop;
