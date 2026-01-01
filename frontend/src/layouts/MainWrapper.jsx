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
                <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
                    {children}
                    
                    <button 
                        onClick={toggleTheme} 
                        className="btn btn-primary rounded-circle shadow-lg d-flex align-items-center justify-content-center"
                        style={{ 
                            position: 'fixed', 
                            right: 30, 
                            bottom: 30, 
                            zIndex: 1050,
                            width: 50,
                            height: 50,
                            fontSize: '1.2rem'
                        }}
                    >
                        {theme === 'light' ? <i className='fas fa-moon'></i> : <i className='fas fa-sun'></i>}
                    </button>
                </div>
            )}
        </>
    );
};

export default MainWrapper;
