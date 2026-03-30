export default function ApplicationLogo(props) {
    return (
        <svg
            {...props}
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
        >
            {/* Background Circle */}
            <circle cx="50" cy="50" r="48" fill="currentColor" className="opacity-10" />
            
            {/* Car Body */}
            <path 
                d="M15 75 L85 75 L85 65 C85 58 80 55 75 55 L25 55 C20 55 15 58 15 65 Z" 
                fill="currentColor" 
            />
            
            {/* Raised Hood */}
            <path 
                d="M25 55 L5 30 L40 55 Z" 
                fill="currentColor" 
            />
            
            {/* Windows */}
            <path 
                d="M35 60 L65 60 L60 65 L40 65 Z" 
                fill="white" 
                className="opacity-40"
            />
            
            {/* Wheels */}
            <circle cx="30" cy="75" r="6" fill="currentColor" stroke="white" strokeWidth="2" />
            <circle cx="70" cy="75" r="6" fill="currentColor" stroke="white" strokeWidth="2" />
        </svg>
    );
}
