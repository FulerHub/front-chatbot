import React, {FC} from 'react';
interface AvatarType {
    image: string|undefined;
    online?: boolean
}
const Avatar:FC<AvatarType> = ({image,online}) => {
    return (
        <div className="avatar">
            <div className="avatar__wrap">
                <img src={image} alt="" referrerPolicy="no-referrer"/>
            </div>
            {online &&  <div className="avatar__online"><i className="fa fa-check-circle-o" aria-hidden="true"/></div>}

        </div>
    );
};

export default Avatar;