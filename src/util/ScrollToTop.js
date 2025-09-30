import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// This component will automatically scroll the page to the top on any route change.
const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]); // The effect runs every time the pathname changes

    return null; // This component does not render any visible UI
};

export default ScrollToTop;
