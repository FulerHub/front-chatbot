import React, {FC} from 'react';
import Sidebar from "../components/Sidebar";
import Content from "../components/Content";

const Home:FC = () => {
    return (
        <div className="container">
            <div className="wrap">
                <Sidebar/>
                <Content/>
            </div>
        </div>
    );
};

export default Home;