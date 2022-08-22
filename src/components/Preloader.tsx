import React, {FC} from 'react';

const Preloader:FC = () => {
    return (
        <div className={"preloader"}>
            <div className="lds-dual-ring"/>
        </div>
    );
};

export default Preloader;