import React from 'react';


// Use for comments
{/**/}
export default function Footer() {
    return (
        <footer className="bg-gray-900 text-gray-200">
            <div className="container mx-auto py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-12 grid-cols-1 gap-8">
                    {/*Logo*/}
                    <div className="lg:col-span-4 col-span-12">
                        <a href="/" className="inline-block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded">
                            <img
                                className="h-12"
                                src="/src/styles/brigham_logo.png"
                                alt="Brigham and Women's Hospital Logo"
                            />
                        </a>
                    </div>
                    {/*Company*/}
                    <div className="lg:col-span-2 md:col-span-4 col-span-12">
                        <h5 className="tracking-wide text-gray-100 font-semibold text-lg mb-4">
                            Company
                        </h5>
                        <ul className="list-none space-y-3">
                            <li>
                                <a
                                    href="#"
                                    className="text-gray-300 hover:text-white transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded px-1"
                                >
                                    About us
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="text-gray-300 hover:text-white transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded px-1"
                                >
                                    Services
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="text-gray-300 hover:text-white transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded px-1"
                                >
                                    Articles
                                </a>
                            </li>
                        </ul>
                    </div>
                    {/*Important Links*/}
                    <div className="lg:col-span-3 md:col-span-4 col-span-12">
                        <h5 className="tracking-wide text-gray-100 font-semibold text-lg mb-4">
                            Important Links
                        </h5>
                        <ul className="list-none space-y-3">
                            <li>
                                <a
                                    href="#"
                                    className="text-gray-300 hover:text-white transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded px-1"
                                >
                                    Terms of Service
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="text-gray-300 hover:text-white transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded px-1"
                                >
                                    Privacy Policy
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="text-gray-300 hover:text-white transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded px-1"
                                >
                                    Help
                                </a>
                            </li>
                        </ul>
                    </div>
                    {/*Newsletter*/}
                    <div className="lg:col-span-3 md:col-span-4 col-span-12">
                        <h5 className="tracking-wide text-gray-100 font-semibold text-lg mb-4">
                            Newsletter
                        </h5>
                        <p className="mt-2 mb-4 text-gray-300">Sign up and receive the latest news from our site via email</p>
                        <form action="" className="space-y-3">
                            <div>
                                <label htmlFor="email-input" className="block text-sm text-gray-300 mb-2">
                                    Enter your email <span className="text-red-400" aria-label="required">*</span>
                                </label>
                                <input
                                    type="email"
                                    id="email-input"
                                    className="w-full py-2 px-3 h-10 bg-gray-800 text-white rounded border border-gray-600 focus:border-[#0077b6] focus:ring-2 focus:ring-[#0077b6]/50 focus:outline-none transition-colors"
                                    placeholder="name@example.com"
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full py-2 px-5 tracking-wide text-base text-center bg-[#0077b6] hover:bg-[#005a8a] text-white rounded-md transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0077b6]/50"
                            >
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            <div className="border-t border-slate-700">
                <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8">
                    <p className="text-center text-gray-400 text-sm mb-2">
                        &copy; 2025 Brigham and Women's Hospital. All rights reserved.
                    </p>
                    <p className="text-center text-gray-500 text-xs max-w-4xl mx-auto">
                        <strong>Portfolio Project:</strong> This website is part of <strong>Keerthana Jayamoorthy's</strong> portfolio to demonstrate skills in the <strong>PERN stack</strong> (PostgreSQL, Express, React, Node.js). The original codebase was created by a team of nine developers over 7 weeks for the Software Engineering course at WPI, where I served as Lead Assistant Frontend Developer.
                    </p>
                </div>
            </div>
        </footer>
    );
}