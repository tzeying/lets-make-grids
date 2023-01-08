import { useEffect, useState } from 'react';
import PlottedGrid from '../components/plotted-grid';
import _ from 'lodash';

function GridGenerator({}) {

    let [widthFeet, setWidthFeet] = useState(5);
    let [heightFeet, setHeightFeet] = useState(5);
    let [gridUnit, setGridUnit] = useState(5);

    return (
        <>
            <div className="flex p-2 gap-4">
                <div className='flex flex-col w-16'>
                    <label className='text-neutral-400 text-xs'>Width</label>
                    <input type="number" value={widthFeet} onChange={e => setWidthFeet(e.target.value)} />
                </div>
                <div className='flex flex-col w-16'>
                    <label className='text-neutral-400 text-xs'>Height</label>
                    <input type="number" value={heightFeet} onChange={e => setHeightFeet(e.target.value)} />
                </div>
            </div>
            <PlottedGrid Unit={gridUnit} WidthFt={widthFeet} HeightFt={heightFeet} Scale={0.5}/>
        </>
    );
}

export default GridGenerator;