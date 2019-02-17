export default ({ count }) => (
    <span 
        className="new badge blue" 
        data-badge-caption="in list"
        style={{
            display: 'inline-block',
            float: 'none',
            verticalAlign: 'middle',
            height: 'auto',
            fontSize: '20px',
            lineHeight: '32px',
            padding: '5px 15px',
        }}
    >
        {count}
    </span>
);
