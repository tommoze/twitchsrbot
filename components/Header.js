import Badge from 'components/Badge';
import Link from 'next/link';

export default ({ count }) => (
    <header
        style={{
            display: 'flex',
            alignItems: 'center',
            margin: '15px 0 10px 0',
        }}
    >
        <h1 style={{ margin: '0 5px 0 0', fontSize: '24px' }}>
            Song requests
        </h1>
        <Badge count={count} />
        <div style={{ margin: '0 5px' }}>
            <Link href={{ pathname: '/view', query: { theme: 'black' } }}>
                <a>black preview</a>
            </Link>
        </div>
        <div style={{ margin: '0 5px' }}>
            <Link href={{ pathname: '/view', query: { theme: 'white' } }}>
                <a>white preview</a>
            </Link>
        </div>
    </header>
);
