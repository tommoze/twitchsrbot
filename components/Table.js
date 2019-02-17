import copy from 'copy-to-clipboard';

export default ({
    list,
    onDelete,
    onMove,
}) => {
    if (list.length) {
        return (
            <table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th style={{ width: '100%' }}>Song</th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th>By</th>
                    </tr>
                </thead>
                <tbody>
                    {list.map((item, index) => (
                        <tr key={item.title}>
                            <td>{index + 1}</td>
                            <td>{item.title}</td>
                            <td>
                                <button
                                    style={{ textTransform: 'lowercase' }}
                                    className="btn-small waves-effect waves-light"
                                    onClick={() => copy(item.title)}
                                >copy</button>
                            </td>
                            <td>
                                <button
                                    style={{ textTransform: 'lowercase' }}
                                    className="btn-small materialize-red waves-effect waves-light"
                                    onClick={() => onDelete(index)}
                                >delete</button>
                            </td>
                            <td>
                                <button
                                    style={{ whiteSpace: 'nowrap', textTransform: 'lowercase' }}
                                    className="btn-small materialize-red darken-3 waves-effect waves-light"
                                    onClick={() => onDelete(index, true)}
                                >not found</button>
                            </td>
                            <td>
                                <button
                                    className="btn-small blue waves-effect waves-light"
                                    onClick={() => index !== 0 && onMove(index, index - 1)}
                                >↑</button>
                            </td>
                            <td>
                                <button
                                    className="btn-small blue waves-effect waves-light"
                                    onClick={() => index !== list.length - 1 && onMove(index, index + 1)}
                                >↓</button>
                            </td>
                            <td>{item.by}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    }

    return null;
};
