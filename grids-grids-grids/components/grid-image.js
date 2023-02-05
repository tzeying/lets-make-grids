import GridSVG from '../components/grid-svg';

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
