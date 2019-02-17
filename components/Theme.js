export const themes = {
    white: 'white',
    black: 'black',
}

export default ({ 
    theme,
    onChange,
}) => (
    <div
        style={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            padding: '15px 0'
        }}
    >
        <form action="#" className="container">
            {Object.keys(themes).map((currentTheme) => (
                <label
                    key={currentTheme}
                    style={{ marginRight: '20px' }}
                >
                    <input
                        name="theme"
                        type="radio"
                        defaultChecked={theme === currentTheme}
                        onChange={() => onChange(currentTheme)}
                    />
                    <span>{themes[currentTheme]}</span>
                </label>
            ))}
        </form>
    </div>
);
