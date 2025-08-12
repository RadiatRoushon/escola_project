import React, { useState } from 'react';

const QuoteModal = ({ isOpen, onClose }) => {
    const [prompt, setPrompt] = useState('');
    const [quote, setQuote] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    // This function calls the Gemini API to generate the quote.
    const generateQuote = async () => {
        if (!prompt) return;

        setIsLoading(true);
        setQuote('');
        setError(null);

        // Define the payload for the API call
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white p-8 rounded-xl shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-start mb-4">
                    <h2 className="text-3xl font-bold text-gray-800">Generate a Quote</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-800 transition-colors"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>
                <p className="text-gray-600 mb-6">Describe the custom educational service you need, and our AI will generate a personalized quote and curriculum for you.</p>

                <textarea
                    className="w-full p-3 mb-4 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-blue-500 resize-none text-gray-800"
                    rows="4"
                    placeholder="E.g., I need a personalized curriculum for my 12-year-old focusing on advanced robotics and coding principles."
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                ></textarea>

                <button
                    onClick={generateQuote}
                    disabled={isLoading}
                    className={`w-full py-3 px-4 rounded-lg font-semibold transition-colors
                               ${isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}
                >
                    {isLoading ? 'Generating...' : 'Generate Quote ✨'}
                </button>

                {error && (
                    <div className="mt-4 p-4 text-red-700 bg-red-100 rounded-lg">
                        {error}
                    </div>
                )}

                {quote && (
                    <div className="mt-6 p-6 bg-gray-50 rounded-xl border border-gray-200">
                        <h3 className="text-xl font-bold text-gray-800 mb-3">Your Personalized Quote:</h3>
                        <p className="whitespace-pre-wrap text-gray-700 leading-relaxed">{quote}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default QuoteModal;