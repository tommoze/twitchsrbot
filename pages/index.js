import { Component } from 'react';
import fetch from 'isomorphic-unfetch';
import Table from 'components/Table';
import Badge from 'components/Badge';
import 'materialize-css/dist/css/materialize.css';

class App extends Component {
    // fetch old list data from the server
    static async getInitialProps({ req }) {
        const response = await fetch('http://localhost:3000/list');
        const list = await response.json();
        return list;
    }

    static defaultProps = {
        list: []
    }

    state = {
        list: this.props.list,
        subscribe: false,
        subscribed: false
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
                    <h1>
                        Song request
                        <Badge count={list.length} />
                    </h1>
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
