import { Component } from 'react';
import fetch from 'isomorphic-unfetch';
import Table from 'components/Table';
import Header from 'components/Header';
import cookies from 'js-cookie';
import { themes } from 'components/Theme';
import nextcookies from 'next-cookies';
import 'materialize-css/dist/css/materialize.css';

class App extends Component {
    // fetch old list data from the server
    static async getInitialProps(ctx) {
        const response = await fetch('http://localhost:3000/list');
        const list = await response.json();
        const { theme } = nextcookies(ctx);

        return {
            ...list,
            theme
        };
    }

    static defaultProps = {
        list: [],
        theme: cookies.get('theme') || themes.white
    }

    state = {
        list: this.props.list,
        theme: this.props.theme,
        subscribe: false,
        subscribed: false,
    }

    subscribe = () => {
        if (this.state.subscribe && !this.state.subscribed) {
            // connect to WS server and listen event
            this.props.socket.on('list.update', this.handleUpdate);
            this.setState({ subscribed: true })
        }
    }
    componentDidMount() {
        this.subscribe();
    }

    componentDidUpdate() {
        this.subscribe();
    }

    static getDerivedStateFromProps(props, state) {
        if (props.socket && !state.subscribe) return { subscribe: true }
        return null
    }

    // close socket connection
    componentWillUnmount() {
        this.props.socket.off('list.update', this.handleUpdate)
    }

    handleUpdate = list => {
        this.setState({ list });
    }

    handleDelete = (index, notFound = false) => {
        this.props.socket.emit('list.delete', index, notFound);
    }

    handleMove = (from, to) => {
        this.props.socket.emit('list.move', from, to)
    }

    render() {
        const { list } = this.state;

        return (
            <main>
                <div className="container">
                    <Header count={list.length} />
                    <Table 
                        list={list}
                        onDelete={this.handleDelete}
                        onNotFound={this.handleNotFound}
                        onMove={this.handleMove}
                    />
                </div>
            </main>
        );
    }
}

export default App;
