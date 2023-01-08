import GridSVG from './grid-svg';
import { useEffect, useState } from 'react';
import _ from 'lodash';

function PlottedGrid({Unit, WidthFt, HeightFt, Scale=1}) {

    let [boundingRectStyles, setBoundingRectStyle] = useState({ width: 0, height: 0 });
    let [repeat, setRepeats] = useState({ x: 1, y: 0 }); 

    let getBoundingRectPx = (w, h) => ({ width: w * Unit, height: h * Unit });

    useEffect(() => {

        let { width, height } = getBoundingRectPx(WidthFt, HeightFt);
        setBoundingRectStyle({ width: width, height: height });
        setRepeats({ x: Math.floor(WidthFt / 5), y: Math.floor(HeightFt / 5) })

    }, [WidthFt, HeightFt, Unit]);

    return (
        <div className="w-full h-full bg-white relative" style={{transform: `scale(${Scale})`}}>
            {/* <div className="grid-mask h-full">
                <GridSVG unit={Unit} />
            </div> */}
            <div className="absolute w-full h-full top-0 flex justify-center items-center">
                <div style={boundingRectStyles} className='rounded outline outline-purple-500 bg-gradient-to-t from-purple-200 to-transparent flex justify-center items-center relative'>

                    <div className="flex absolute top-0 left-0">
                        {
                            _.times(repeat.x, (i) =>
                                <div className='w-[20px] h-[20px] bg-purple-700 opacity-20 rounded-sm m-[2.5px]'></div>
                            )
                        }
                    </div>
                    <div className="flex flex-col absolute left-0 top-0">
                        {
                            _.times(repeat.y, (i) =>
                                <div className='w-[20px] h-[20px] bg-purple-700 opacity-20 rounded-sm m-[2.5px]'></div>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PlottedGrid;