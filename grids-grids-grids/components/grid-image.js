function GridSVG({ unit }) {
    return (
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <pattern id="smallGrid" width={unit} height={unit} patternUnits="userSpaceOnUse">
                    <path d={`M ${unit} 0 L 0 0 0 ${unit}`} fill="none" stroke="black" stroke-width="0.5" />
                </pattern>
                <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
                    <rect width="50" height="50" fill="url(#smallGrid)" />
                </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
    )
}

function GridImage() {
    return (
        <div className="w-20 min-w-[80px] bg-white relative">
            <div className="grid-mask max-h-[120px]">
                <GridSVG unit={5} className="h-20" />
            </div>
            <div className="absolute w-full h-full top-0 flex justify-center">
                <img className="w-6" src="/grid/plot_5x5.svg" alt="" />
            </div>
        </div>
    );
}

export default GridImage;
