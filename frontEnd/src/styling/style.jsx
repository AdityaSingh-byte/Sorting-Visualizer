const styles = {
    header: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center', 
        marginBottom: '20px',
    },
    algorithmName: {
        fontSize: '44px',
        color: 'white',
        marginBottom: '10px', 
    },
    buttonContainer: {
        display: 'flex',
        flexDirection: 'row', 
        alignItems: 'center', 
        marginBottom: '20px',
    },
    sliderContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center', // Center the slider
        marginLeft: '10px', // Add space between buttons and slider
    },
    iconButton: {
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        color: 'white',
        fontSize: '24px',
        marginRight: '10px', // Space between buttons
    },
    sliderLabel: {
        color: 'white',
        marginRight: '10px',
    },
    slider: {
        width: '200px', // Adjust slider width
    },
    infoContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: '20px',
        padding: '20px',
        borderRadius: '8px',
        background: 'transparent',
        color: 'white',
        flexWrap: 'wrap', // Allow wrapping for smaller screens
    },
    description: {
        flex: 1,
        marginRight: '20px',
        minWidth: '250px', // Ensure a minimum width for description
    },
    codeSnippet: {
        flex: 1,
        border: '2px solid white', // Added white outline
        borderRadius: '8px',
        padding: '10px',
        background: 'transparent',
        minWidth: '250px', // Ensure a minimum width for code snippet
    },
    languageIcons: {
        display: 'flex',
        justifyContent: 'flex-start',
        marginBottom: '10px',
    },
    languageButton: {
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        color: 'white',
        transition: 'transform 0.2s, background 0.2s',
        marginRight: '10px',
    },
    activeButton: {
        transform: 'scale(1.1)',
        background: 'rgba(255, 255, 255, 0.1)',
        borderRadius: '5px',
    },
    codeBlockWrapper: {
        background: 'transparent',
        borderRadius: '8px',
        padding: '10px',
        maxWidth: '100%',
        overflow: 'auto',
        border: '2px solid white', // Added white outline
    },
};
export default styles