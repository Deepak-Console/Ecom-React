import React from 'react';
import Logo from '../images/logo.png';

const Avatar = ({ size }) => {
    const sizeClasses = {
        small: 'h-8 w-8',
        medium: 'h-12 w-12',
        large: 'h-16 w-16',
        xl: 'h-24 w-24', // Added extra-large size
    };

    return (
        <div className={`rounded-full bg-gray-200 ${sizeClasses[size]}`}>
            {/* Your avatar content here (e.g., user image) */}
            <img
                className="object-cover"
                src={Logo}
                alt="Avatar"
            />
        </div>
    );
};

Avatar.defaultProps = {
    size: 'medium',
};

export default Avatar;

