import { themes } from 'components/Theme';
import { request } from '../config';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

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
}) => (
    <ul
        style={{
            margin: 0,
            padding: '30px 0 70px 0'
        }}
    >
        <style jsx>{`
            .move-enter {
                opacity: 0.01;
                transform: translate(-100%, 0)
            }

            .move-enter-active {
                opacity: 1;
                transform: translate(0, 0);
                transition: all 300ms ease-in;
            }

            .move-exit {
                opacity: 1;
                transform: translate(0, 0)
            }

            .move-exit-active {
                opacity: 0.01;
                transform: translate(100%, 0);
                transition: all 300ms ease-in;
            }
        `}</style>
        {list.length === 0 && (
            <li
                key="empty"
                style={style[theme].color}
            >
                {`Queue is empty, use '${request} Artist - Title' to add song`}
            </li>
        )}
        <TransitionGroup>
            {list.map((item, index) => (
                <CSSTransition
                    key={item.title}
                    classNames="move"
                    timeout={300}
                >
                    <li
                        style={{
                            position: 'relative',
                            lineHeight: '24px',
                            padding: '0 5px',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            borderBottom: index == list.length - 1
                                ? 'none'
                                : style[theme].border,
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
                </CSSTransition>
            ))}
        </TransitionGroup>
    </ul>
);
