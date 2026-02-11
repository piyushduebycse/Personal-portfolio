
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className="p-2 rounded-full transition-all duration-300 hover:bg-black/5 dark:hover:bg-white/10 group relative"
            aria-label="Toggle theme"
        >
            <div className="relative w-6 h-6">
                <Sun
                    className={`absolute inset-0 w-6 h-6 text-yellow-500 transition-all duration-500 rotate-0 scale-100 ${theme === 'dark' ? 'rotate-90 scale-0 opacity-0' : ''
                        }`}
                />
                <Moon
                    className={`absolute inset-0 w-6 h-6 text-blue-400 transition-all duration-500 rotate-90 scale-0 opacity-0 ${theme === 'dark' ? 'rotate-0 scale-100 opacity-100' : ''
                        }`}
                />
            </div>

            {/* Glow effect */}
            <span className={`absolute inset-0 rounded-full blur-md bg-yellow-400/30 scale-0 transition-transform duration-300 ${theme === 'light' ? 'group-hover:scale-150' : ''
                }`}
            />
            <span className={`absolute inset-0 rounded-full blur-md bg-blue-500/30 scale-0 transition-transform duration-300 ${theme === 'dark' ? 'group-hover:scale-150' : ''
                }`}
            />
        </button>
    );
}
