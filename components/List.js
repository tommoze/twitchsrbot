import { themes } from 'components/Theme';
const config = require('../config');

const style = {
    [themes.white]: {
        color: {},
        by: {
            background: 'white',
        },
        border: '1px solid #ccc',
        colorSecondary: {
            color: '#666'
        },
    },
    [themes.black]: {
        color: {
            color: 'white'
        },
        by: {
            background: '#000'
        },
        border: '1px solid #333',
        colorSecondary: {
            color: '#999'
        },
    },
};

export default ({
    list,
    theme,
}) => {
    if (list.length) {
        return (
            <ul 
                style={{ 
                    margin: 0,
                    padding: '30px 0 70px 0' 
                }}
            >
                {list.map((item, index) => (
                    <li
                        key={item.title}
                        style={{
                            position: 'relative',
                            lineHeight: '24px',
                            padding: '0 5px',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            borderBottom: index == list.length - 1 ? 'none' : style[theme].border,
                        }}
                    >
                        <span
                            style={{
                                marginRight: '10px',
                                textAlign: 'right',
                                display: 'inline-block',
                                width: '15px',
                                ...style[theme].colorSecondary,
                            }}
                        >
                            {index === 0 ? '►' : index}
                        </span>
                        <span style={style[theme].color}>
                            {item.title}
                        </span>
                        <span
                            style={{
                                position: 'absolute',
                                top: 0,
                                right: 0,
                                padding: '0 5px 0 10px',
                                ...style[theme].colorSecondary,
                                ...style[theme].by,
                            }}
                        >
                            {item.by}
                        </span>
                    </li>
                ))}
            </ul>
        );
    }

    return (
        <div 
            style={{
                ...style[theme].color,
                padding: '20px 0'
            }}
        >
            {`Queue is empty, use '${config.request} Artist - Title' to add song`}
        </div>
    );
};
