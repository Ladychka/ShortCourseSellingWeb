import { useEffect, useState } from "react";
import { setUser } from "../utils/auth";


const MainWrapper = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');

    useEffect(() => {
        const handler = async () => {
            setLoading(true);
            try {
                await setUser();
            } catch (error) {
                console.error("Auth error:", error);
            } finally {
                setLoading(false);
            }
        };

        handler();
    }, []);

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => setTheme(t => t === 'light' ? 'dark' : 'light');

    return (
        <>
            {loading ? null : (
                <>
                    <button onClick={toggleTheme} style={{ position: 'fixed', right: 16, bottom: 16, zIndex: 1050 }} className="btn btn-sm btn-secondary shadow">
                        {theme === 'light' ? <i className='fas fa-moon'></i> : <i className='fas fa-sun'></i>}
                    </button>
                    {children}
                </>
            )}
        </>
    );
};

export default MainWrapper;
