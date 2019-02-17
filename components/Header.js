import Badge from 'components/Badge';
import Link from 'next/link';

export default ({ count }) => (
    <header
        style={{
            display: 'flex',
            alignItems: 'center',
            margin: '20px 0 10px 0',
        }}
    >
        <h1 style={{ margin: 0 }}>
            Song requests
        </h1>
        <Badge count={count} />
        <Link href="/view">
            <a>Preview mode</a>
        </Link>
    </header>
);
