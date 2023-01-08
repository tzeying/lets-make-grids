import { useState } from "react";
import Spaces from "../data/spaces.json"; 

function UnitList({list}) {
    let [showing, setShowing] = useState(list.slice(0, 6))
    
    return (
        <div className="flex flex-wrap gap-2">
            {
                showing.map((space, i) =>
                    <button key={i} className='py-1 px-2 text-sm bg-white hover:bg-neutral-100 border border-neutral-300 rounded-sm text-neutral-600'>
                        {Spaces.find(S => S.id == space).name.slice(1)}
                    </button>
                )
            }
            {
                (list.length > 8) && <span className="text-xs p-1 pt-2 text-blue-600 cursor-pointer">+{list.length - 8} more</span>
            } 
        </div>
    );
}

export default UnitList;