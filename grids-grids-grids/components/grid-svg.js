function GridSVG({ unit }) {
    return (
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <pattern id="smallGrid" width={unit} height={unit} patternUnits="userSpaceOnUse">
                    <path d={`M ${unit} 0 L 0 0 0 ${unit}`} fill="none" stroke="black" strokeWidth="0.5" />
                </pattern>
                <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
                    <rect width="50" height="50" fill="url(#smallGrid)" />
                </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
    )
}

export default GridSVG;