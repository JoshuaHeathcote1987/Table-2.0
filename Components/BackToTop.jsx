import React, { useState, useEffect } from "react";

const BackToTopButton = () => {
    const [isVisible, setIsVisible] = useState(false);

    // Function to handle scroll event
    const handleScroll = () => {
        if (window.scrollY > 300) { // Show button when scrolled more than 300px
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    // Scroll to top function
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    // UseEffect to listen for scroll events
    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        isVisible && (
            <button
                onClick={scrollToTop}
                className="fixed bottom-5 right-5 bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition"
            >
                ↑
            </button>
        )
    );
};

export default BackToTopButton;
