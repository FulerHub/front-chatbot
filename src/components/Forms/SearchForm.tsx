import React, {FC, useEffect, useState} from 'react';
import {useInput} from "../../hook/useInput";
interface SearchFormType {
    placeholder:string;
    handleChange: (search:string)=>void
}
const SearchForm:FC<SearchFormType> = ({placeholder,handleChange}) => {
    const {bind,value} = useInput('',handleChange);
    return (
        <div className="sidebar__search">
            <div className="input-block">
                <input {...bind} className={'input-search'} type="text" placeholder={placeholder}/>
                <i className="fa fa-search" aria-hidden="true"/>
            </div>
        </div>
    );
};

export default SearchForm;