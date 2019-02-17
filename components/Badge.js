export default ({ count }) => (
    <span 
        className="new badge blue" 
        data-badge-caption="in list"
        style={{
            height: 'auto',
            fontSize: '20px',
            lineHeight: '32px',
            padding: '5px 15px',
            margin: '0 15px',
        }}
    >
        {count}
    </span>
);
