export default ({ count }) => (
    <span 
        className="new badge blue" 
        data-badge-caption="in list"
        style={{
            height: 'auto',
            fontSize: '14px',
            lineHeight: '24px',
            margin: '0 5px',
        }}
    >
        {count}
    </span>
);
