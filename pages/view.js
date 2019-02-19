import App, {} from './index';
import List from 'components/List';
import { themes } from 'components/Constants';

const style = {
    [themes.white]: {
        main: {
            backgroundColor: '#fff',
            minHeight: '100%',
            padding: '15px',
        },
    },
    [themes.black]: {
        main: {
            backgroundColor: '#000',
            minHeight: '100%',
            padding: '15px',
        },
    },
}

class View extends App {
    render() {
        const { list, theme } = this.state;

        return (
            <main style={style[theme].main}>
                <List list={list} theme={theme} />
            </main>
        );
    }
}

export default View;
