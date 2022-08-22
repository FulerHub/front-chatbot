import {ChangeEvent, useState} from "react";

export const useInput = (defaultValue:any,handleChange?:any)=>{
    const [value,setValue] = useState(defaultValue);

    const reset = ()=>{
        setValue(defaultValue);
    };
    const bind = {
        value: value,
        onChange: (event: ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => {
            if(handleChange) handleChange(event.target.value);
            setValue(event.target.value)
        }
    };
    return {value, reset, bind}
};