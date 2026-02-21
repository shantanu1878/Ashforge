import React from 'react';

interface AshforgeMarkProps {
    className?: string;
    title?: string;
}

const AshforgeMark: React.FC<AshforgeMarkProps> = ({ className, title }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 942.05 944.68"
            aria-hidden={!title ? "true" : undefined}
            role={title ? "img" : undefined}
            focusable="false"
            className={className}
        >
            {title && <title>{title}</title>}
            <polygon fill="currentColor" points="1.77 942.9 327.39 448.21 262.88 477.16 554.71 148.25 788.18 0.9 794.32 335.07 616.15 414.01 613.08 277.18 606.93 269.29 551.64 306.13 376.54 574.52 379.61 582.41 388.83 579.78 941.77 316.65 1.77 942.9" />
            <path fill="currentColor" d="M825.91,502.79q2.82,102.32,5.65,204.62H706.1l-8.25-9.53q-2.54-6.23-5.06-12.47l-8.19-19.48-15.36-47.36Z" transform="translate(-28.51 -28.08)" />
        </svg>
    );
};

export default AshforgeMark;
