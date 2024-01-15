import React, {useState} from "react";

const TabSwitcher = ({ children }) => {
    const [activeTab, setActiveTab] = useState(0);

    const handleTabChange = (index) => {
        setActiveTab(index);
    };

    return (
        <div className="flex flex-col justify-center">
            <div className={'flex'}>
                {React.Children.map(children, (child, index) => (
                    <div
                        className={`cursor-pointer flex-grow p-2 ${activeTab === index ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
                        onClick={() => handleTabChange(index)}
                    >
                        {child.props.tabLabel}
                    </div>
                ))}
            </div>
            <div className={'flex'}>
                {React.Children.toArray(children)[activeTab]}
            </div>
        </div>
    );
};

export default TabSwitcher;