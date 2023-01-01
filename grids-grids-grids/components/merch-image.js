import { useEffect, useRef, useState } from 'react';
import useColorThief from 'use-color-thief';

function MerchImage({ image }) {
    const imgRef = useRef();
    const [bgColor, setBgColor] = useState('light-grey')
    const { color, palette } = useColorThief(imgRef, { format: 'rgb' });

    useEffect(() => {
        if (color == null) return; 
        setBgColor(`rgba(${color[0]}, ${color[1]}, ${color[2]}, 0.2)`);
    }, [palette, color]);

    return (
        <div className="w-12 h-12 rounded-sm bg-neutral-100 flex p-2" style={{ backgroundColor: bgColor }}>
            <img ref={imgRef} src={image != undefined ? `/merch/${image}` : `/merch/Empty.svg`} alt="" />
        </div>
    );
}

export default MerchImage;