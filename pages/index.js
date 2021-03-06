import { Component } from 'react';
import fetch from 'isomorphic-unfetch';
import Table from 'components/Table';
import Header from 'components/Header';
import { themes } from 'components/Constants';
import 'materialize-css/dist/css/materialize.css';

class App extends Component {
    // fetch old list data from the server
    static async getInitialProps({ query }) {
        const response = await fetch('http://localhost:3000/list');
        const list = await response.json();
        const theme = query.theme || themes.black;

        return {
            ...list,
            theme
        };
    }

    static defaultProps = {
        list: [],
        theme: themes.black
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
            <main className="container">
                <Header count={list.length} />
                {list.length > 0 && (
                    <Table 
                        list={list}
                        onDelete={this.handleDelete}
                        onNotFound={this.handleNotFound}
                        onMove={this.handleMove}
                    />
                )}
            </main>
        );
    }
}

export default App;
