import React, {FC} from 'react';

interface PlaceholderType {
    header:string;
    message:string;
}

const Placeholder:FC<PlaceholderType> = ({header,message}) => {
    return (
        <div className={'placeholder'}>
            <i className="fa fa-user-circle-o" aria-hidden="true"/>
            <b>{header}</b>
            <p>{message}</p>
        </div>
    );
};

export default Placeholder;