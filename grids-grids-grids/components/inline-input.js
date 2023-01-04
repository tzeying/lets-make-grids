import { useEffect, useState } from "react";
import classNames from "classnames";

function InlineInput({ className, inputValue, placeholder }) {
    let [value, setValue] = useState('');
    
    useEffect(() => { setValue(inputValue) }, [inputValue]);
    
    let handleChange = e => setValue(e.target.value); 
    
    let defaultClasses = "focus:border-none focus:outline-none focus:bg-neutral-100 px-1 rounded-sm";
    let classes = classNames([defaultClasses, className])

    return (
        <input type="text"
            placeholder={placeholder}
            className={classes}
            value={value}
            onChange={handleChange} />
    );
}

export default InlineInput;