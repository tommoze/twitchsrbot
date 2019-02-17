import App from './index';
import List from 'components/List';
import Theme from 'components/Theme';
import { themes } from 'components/Theme';
import cookies from 'js-cookie';

const style = {
    [themes.white]: {
        main: {},
    },
    [themes.black]: {
        main: {
            backgroundColor: '#000',
            minHeight: '100%'
        },
    },
}

class View extends App {
    constructor(props) {
        super(props);

        this.onThemeChange = this.onThemeChange.bind(this);
    }

    onThemeChange(theme) {
        cookies.set('theme', theme)

        this.setState({
            ...this.state,
            theme: theme
        });
    }

    render() {
        const { list, theme } = this.state;

        return (
            <main style={style[theme].main}>
                <div className="container">
                    <List list={list} theme={theme} />
                    <Theme
                        onChange={this.onThemeChange}
                        theme={theme}
                    />
                </div>
            </main>
        );
    }
}

export default View;
