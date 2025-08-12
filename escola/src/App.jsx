import React, { useState } from 'react';
import { FaStar, FaEnvelope, FaMapMarkerAlt, FaPhoneAlt, FaChevronDown, FaFacebookF, FaTwitter, FaYoutube, FaLinkedinIn, FaUsers } from 'react-icons/fa';
import { getAuth, signInAnonymously, signInWithCustomToken, onAuthStateChanged } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';


// 
const PersonSVG = () => (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="./media/person.png">
        <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 5C13.66 5 15 6.34 15 8C15 9.66 13.66 11 12 11C10.34 11 9 9.66 9 8C9 6.34 10.34 5 12 5ZM12 19.2C9.5 19.2 7.29 17.92 6 15.98C6.03 13.99 10 12.9 12 12.9C13.99 12.9 17.97 13.99 18 15.98C16.71 17.92 14.5 19.2 12 19.2Z" fill="#1E3A8A"/>
    </svg>
);


// QuoteModal Component 
const QuoteModal = ({ isOpen, onClose }) => {
    const [prompt, setPrompt] = useState('');
    const [quote, setQuote] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const generateQuote = async () => {
        if (!prompt) return;

        setIsLoading(true);
        setQuote('');
        setError(null);

        const chatHistory = [{
            role: "user",
            parts: [{ text: `Generate a personalized educational service quote and a brief curriculum outline based on the following request. Make the response professional and friendly. Request: "${prompt}"` }]
        }];

        const payload = { contents: chatHistory };
        const apiKey = "";
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;

        // Implement exponential backoff for retries
        const maxRetries = 5;
        let retries = 0;
        let delay = 1000;

        while (retries < maxRetries) {
            try {
                const response = await fetch(apiUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });

                if (!response.ok) {
                    throw new Error(`API error: ${response.status} ${response.statusText}`);
                }

                const result = await response.json();

                if (result.candidates && result.candidates.length > 0 &&
                    result.candidates[0].content && result.candidates[0].content.parts &&
                    result.candidates[0].content.parts.length > 0) {
                    const text = result.candidates[0].content.parts[0].text;
                    setQuote(text);
                } else {
                    setError('Unable to generate quote. Please try again.');
                }
                break; // Exit the loop on success
            } catch (err) {
                console.error('Error fetching data:', err);
                retries++;
                if (retries < maxRetries) {
                    await new Promise(res => setTimeout(res, delay));
                    delay *= 2; // Double the delay for the next retry
                } else {
                    setError('Failed to fetch data after multiple retries. Please check your network connection.');
                }
            }
        }

        setIsLoading(false);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
            <div className="relative w-full max-w-2xl max-h-[90vh] p-8 overflow-y-auto bg-white rounded-xl shadow-lg">
                {/* Close button and header */}
                <div className="flex items-start justify-between mb-4">
                    <h2 className="text-3xl font-bold text-gray-800">Generate a Quote</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 transition-colors hover:text-gray-800"
                    >
                       <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" stroke="currentColor" d="M6 18L18 6M6 6l12 12"></path>
</svg>
                    </button>
                </div>
                <p className="mb-6 text-gray-600">Describe the custom educational service you need, and our AI will generate a personalized quote and curriculum for you.</p>

                {/* Textarea for user prompt */}
                <textarea
                    className="w-full p-3 mb-4 text-gray-800 resize-none rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:outline-none"
                    rows="4"
                    placeholder="E.g., I need a personalized curriculum for my 12-year-old focusing on advanced robotics and coding principles."
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                ></textarea>

                {/* Generate button */}
                <button
                    onClick={generateQuote}
                    disabled={isLoading}
                    className={`w-full py-3 px-4 font-semibold text-white transition-colors rounded-lg
                                ${isLoading ? 'cursor-not-allowed bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'}`}
                >
                    {isLoading ? 'Generating...' : 'Generate Quote ✨'}
                </button>

                {/* Error message */}
                {error && (
                    <div className="p-4 mt-4 text-red-700 bg-red-100 rounded-lg">
                        {error}
                    </div>
                )}

                {/* Generated quote display */}
                {quote && (
                    <div className="p-6 mt-6 bg-gray-50 rounded-xl border border-gray-200">
                        <h3 className="mb-3 text-xl font-bold text-gray-800">Your Personalized Quote:</h3>
                        <p className="leading-relaxed text-gray-700 whitespace-pre-wrap">{quote}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

// CourseSection Component
const CourseSection = () => {
    const courses = [
        {
            id: 1,
            tag: 'Development',
            image: 'media/1.png',
            title: 'The Power of Personal Branding',
            students: 50,
            rating: 4.5,
            authorImage: './media/custo1.jpg',
            authorName: 'By Angela',
        },
        {
            id: 2,
            tag: 'Design',
            image: 'media/2.png',
            title: 'Design of Personal Shape Our Your Path',
            students: 30,
            rating: 5,
            authorImage: './media/custo2.jpg',
            authorName: 'By Angela',
        },
        {
            id: 3,
            tag: 'Python',
            image: 'media/3.png',
            title: 'Python for Data Science & Machine',
            students: 25,
            rating: 4.5,
            authorImage: './media/tabletmff.jpg',
            authorName: 'By Angela',
        },
    ];

    return (
        <section className="px-4 py-16 bg-gray-50 font-['Inter'] sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                <div className="mb-12 text-center">
                    <h3 className="mb-2 text-sm font-semibold text-blue-500 uppercase">
                        Top Popular Course
                    </h3>
                    <h2 className="text-3xl font-extrabold text-gray-900 md:text-4xl">
                        Building a Better Tomorrow
                    </h2>
                </div>
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {courses.map((course) => (
                        <div key={course.id} className="relative flex flex-col justify-between overflow-hidden transition-transform duration-300 bg-white rounded-2xl shadow-xl hover:scale-105">
                            <div className="relative">
                                <img src={course.image} alt={course.title} className="object-cover w-full h-48" />
                                <span className="absolute top-4 left-4 rounded-full bg-blue-500 px-3 py-1 text-xs font-semibold text-white">
                                    {course.tag}
                                </span>
                            </div>
                            <div className="flex flex-col flex-grow p-6">
                                <h4 className="mb-4 text-xl font-bold text-gray-900">
                                    {course.title}
                                </h4>
                                <div className="flex items-center mb-4 text-sm text-gray-500">
                                    <div className="flex items-center mr-4">
                                        <FaUsers className="w-4 h-4 mr-2 text-blue-500" />
                                        <span>{course.students} Students</span>
                                    </div>
                                    <div className="flex items-center">
                                        {[...Array(5)].map((_, i) => (
                                            <FaStar key={i} className={`mr-1 text-yellow-500 ${i >= Math.floor(course.rating) ? 'opacity-30' : ''}`} />
                                        ))}
                                    </div>
                                </div>
                                <div className="flex items-center justify-between pt-4 mt-auto border-t border-gray-200">
                                    <div className="flex items-center">
                                        <img src={course.authorImage} alt={course.authorName} className="object-cover w-10 h-10 mr-3 rounded-full" />
                                        <span className="text-sm text-gray-500">{course.authorName}</span>
                                    </div>
                                    <a href="#" className="text-sm font-semibold text-blue-500 hover:underline">
                                        Enroll Now
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

// Main App Component that renders all sections.
function App() {
    const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
    const [isButtonHovered, setIsButtonHovered] = useState(false);
    const [activeLink, setActiveLink] = useState('Home');
    const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);
    const [isAboutUsDropdownOpen, setIsAboutUsDropdownOpen] = useState(false);
    const [isProjectsDropdownOpen, setIsProjectsDropdownOpen] = useState(false);

    // Placeholder for Firestore and Auth initialization
    const [db, setDb] = useState(null);
    const [auth, setAuth] = useState(null);
    const [userId, setUserId] = useState(null);

    React.useEffect(() => {
        const initializeFirebase = async () => {
            try {
                // Using global variables provided by the Canvas environment
                const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
                const firebaseConfig = typeof __firebase_config !== 'undefined' ? JSON.parse(__firebase_config) : {};
                const initialAuthToken = typeof __initial_auth_token !== 'undefined' ? __initial_auth_token : null;

                const app = initializeApp(firebaseConfig);
                const firestoreDb = getFirestore(app);
                const firebaseAuth = getAuth(app);

                // Sign in with custom token or anonymously
                if (initialAuthToken) {
                    await signInWithCustomToken(firebaseAuth, initialAuthToken);
                } else {
                    await signInAnonymously(firebaseAuth);
                }

                // Set up auth state change listener
                const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
                    if (user) {
                        setUserId(user.uid);
                    } else {
                        setUserId(null);
                    }
                });

                setDb(firestoreDb);
                setAuth(firebaseAuth);

                // Cleanup subscription on unmount
                return () => unsubscribe();
            } catch (error) {
                console.error("Failed to initialize Firebase:", error);
            }
        };

        initializeFirebase();
    }, []);

    return (
        <div className="font-['Inter']">
            {/* ========================================================= */}
            {/* Top Bar Component */}
            {/* ========================================================= */}
            <nav className="w-full py-3 text-gray-700 bg-white border-b border-gray-200">
                <div className="container flex items-center justify-between px-4 mx-auto">
                    <div className="items-center hidden gap-6 md:flex">
                        <a href="mailto:info@example.com" className="flex items-center text-sm text-gray-600 transition-colors duration-200 hover:text-blue-500">
                            <FaEnvelope className="mr-2" />
                            info@example.com
                        </a>
                        <a href="#" className="flex items-center text-sm text-gray-600 transition-colors duration-200 hover:text-blue-500">
                            <FaMapMarkerAlt className="mr-2" />
                            6391 Elgin St. Celina, 10299
                        </a>
                    </div>
                    <div className="flex items-center gap-5">
                        <button
                            className={`px-3 py-2 font-semibold text-white transition-all duration-300 rounded-md
                                ${isButtonHovered ? 'bg-blue-700 shadow-md' : 'bg-blue-600'}`}
                            onMouseEnter={() => setIsButtonHovered(true)}
                            onMouseLeave={() => setIsButtonHovered(false)}
                            onClick={() => setIsQuoteModalOpen(true)}
                        >
                            GET A QUOTE
                        </button>
                        <div className="items-center hidden gap-4 md:flex">
                            <a href="#" className="text-gray-500 transition-colors duration-200 hover:text-blue-500"><FaFacebookF /></a>
                            <a href="#" className="text-gray-500 transition-colors duration-200 hover:text-blue-500"><FaTwitter /></a>
                            <a href="#" className="text-gray-500 transition-colors duration-200 hover:text-blue-500"><FaYoutube /></a>
                            <a href="#" className="text-gray-500 transition-colors duration-200 hover:text-blue-500"><FaLinkedinIn /></a>
                        </div>
                    </div>
                </div>
            </nav>

            {/* ========================================================= */}
            {/* Main Navigation Bar Component */}
            {/* ========================================================= */}
            <header className="w-full py-4 text-gray-800 bg-white border-b border-gray-200">
                <div className="container flex items-center justify-between px-4 mx-auto">
                    <div className="flex items-center gap-10">
                        
                        <div className="flex items-center">
                         <img src="escola\media\logo.png" alt="Logo" />
                        </div>
                        <nav className="hidden lg:block">
                            <ul className="flex gap-6">
                                <li>
                                    <a href="#" onClick={() => setActiveLink('Home')} className={`font-medium transition-colors duration-200 hover:text-blue-600 ${activeLink === 'Home' ? 'text-blue-600' : 'text-gray-800'}`}>Home</a>
                                </li>
                                <li
                                    className="relative"
                                    onMouseEnter={() => setIsAboutUsDropdownOpen(true)}
                                    onMouseLeave={() => setIsAboutUsDropdownOpen(false)}
                                >
                                    <a href="#" onClick={() => setActiveLink('About Us')} className={`flex items-center font-medium transition-colors duration-200 hover:text-blue-600 ${activeLink === 'About Us' ? 'text-blue-600' : 'text-gray-800'}`}>
                                        About Us <FaChevronDown className="ml-1 text-xs" />
                                    </a>
                                    {isAboutUsDropdownOpen && (
                                        <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-40 p-2 bg-white rounded-lg shadow-lg">
                                            <a href="#" className="block p-2 text-gray-800 rounded-md hover:bg-gray-100">Our Team</a>
                                            <a href="#" className="block p-2 text-gray-800 rounded-md hover:bg-gray-100">Our Mission</a>
                                            <a href="#" className="block p-2 text-gray-800 rounded-md hover:bg-gray-100">Testimonials</a>
                                        </div>
                                    )}
                                </li>
                                <li
                                    className="relative"
                                    onMouseEnter={() => setIsServicesDropdownOpen(true)}
                                    onMouseLeave={() => setIsServicesDropdownOpen(false)}
                                >
                                    <a href="#" onClick={() => setActiveLink('Services')} className={`flex items-center font-medium transition-colors duration-200 hover:text-blue-600 ${activeLink === 'Services' ? 'text-blue-600' : 'text-gray-800'}`}>
                                        Services <FaChevronDown className="ml-1 text-xs" />
                                    </a>
                                    {isServicesDropdownOpen && (
                                        <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-40 p-2 bg-white rounded-lg shadow-lg">
                                            <a href="#" className="block p-2 text-gray-800 rounded-md hover:bg-gray-100">Service 1</a>
                                            <a href="#" className="block p-2 text-gray-800 rounded-md hover:bg-gray-100">Service 2</a>
                                            <a href="#" className="block p-2 text-gray-800 rounded-md hover:bg-gray-100">Service 3</a>
                                        </div>
                                    )}
                                </li>
                                <li
                                    className="relative"
                                    onMouseEnter={() => setIsProjectsDropdownOpen(true)}
                                    onMouseLeave={() => setIsProjectsDropdownOpen(false)}
                                >
                                    <a href="#" onClick={() => setActiveLink('Projects')} className={`flex items-center font-medium transition-colors duration-200 hover:text-blue-600 ${activeLink === 'Projects' ? 'text-blue-600' : 'text-gray-800'}`}>
                                        Projects <FaChevronDown className="ml-1 text-xs" />
                                    </a>
                                    {isProjectsDropdownOpen && (
                                        <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-40 p-2 bg-white rounded-lg shadow-lg">
                                            <a href="#" className="block p-2 text-gray-800 rounded-md hover:bg-gray-100">Case Studies</a>
                                            <a href="#" className="block p-2 text-gray-800 rounded-md hover:bg-gray-100">Portfolio</a>
                                            <a href="#" className="block p-2 text-gray-800 rounded-md hover:bg-gray-100">Client Work</a>
                                        </div>
                                    )}
                                </li>
                                <li>
                                    <a href="#" onClick={() => setActiveLink('Blog')} className={`font-medium transition-colors duration-200 hover:text-blue-600 ${activeLink === 'Blog' ? 'text-blue-600' : 'text-gray-800'}`}>Blog</a>
                                </li>
                                <li>
                                    <a href="#" onClick={() => setActiveLink('Contact')} className={`font-medium transition-colors duration-200 hover:text-blue-600 ${activeLink === 'Contact' ? 'text-blue-600' : 'text-gray-800'}`}>Contact</a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                    <div className="flex flex-col items-end hidden md:flex">
                        <span className="text-sm text-gray-600">Need help?</span>
                        <div className="text-xl font-bold text-blue-600">
                            <FaPhoneAlt className="inline-block mr-2 text-lg" /> (307) 555-0133
                        </div>
                    </div>
                </div>
            </header>

            {/* ========================================================= */}
            {/* Hero Section Component */}
            {/* ========================================================= */}
            <div className="relative w-full min-h-screen py-12 bg-gray-100 flex items-center">
                <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-6xl px-4 mx-auto md:flex-row gap-8">
                    {/* Left half - Image with text overlay */}
                    <div className="relative w-full md:w-1/2 rounded-2xl overflow-hidden shadow-2xl">
                        <img
                            src="./media/students.jpg"
                            alt="Students studying"
                            className="object-cover w-full h-full"
                        />
                        <div className="absolute inset-0 flex items-center justify-center p-8 text-white bg-gray-900 bg-opacity-60">
                            <div className="text-left max-w-lg">
                                <h3 className="mb-2 text-sm font-semibold tracking-wide uppercase text-cyan-400">Click Learn Thrive</h3>
                                <h1 className="mb-4 text-4xl font-extrabold leading-tight lg:text-5xl">
                                    Unlock your potential through education
                                </h1>
                                <p className="mb-8 text-lg text-gray-200">
                                    Magnis viverra nisl rhoncus egestas rhoncus elit at. Massa volutpat eleifend pellentesque vivamus nulla.
                                </p>
                                <button className="px-6 py-3 font-bold text-gray-900 transition-colors duration-300 bg-yellow-400 rounded-lg hover:bg-yellow-500">
                                    Contact Us
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Right half - Placeholder with shapes */}
                    <div className="relative w-full md:w-1/2 h-96 p-8 bg-white rounded-2xl shadow-2xl flex items-center justify-center">
                        <div className="relative w-full h-full border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center">
                            <span className="text-gray-400 text-lg">Placeholder</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* ========================================================= */}
            {/* Course Section Component */}
            {/* ========================================================= */}
            <CourseSection />

            {/* Assuming QuoteModal component exists for the button */}
            {isQuoteModalOpen && <QuoteModal isOpen={isQuoteModalOpen} onClose={() => setIsQuoteModalOpen(false)} />}
        </div>
    );
}

export default App;
