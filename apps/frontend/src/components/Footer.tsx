import React from 'react';


// Use for comments
{/**/}
export default function Footer() {
    return (
        <>
        <footer className="bg-gray-900 text-gray-200">
            <div className="container mx-auto py-8 px-6 pd-500">
                <div className="grid md:grid-cols-12 grid-cols-1 gap-4">
                    {/*Logo*/}
                    <div className="lg:col-span-4 col-span-12">
                        <a href="/">
                            <img
                                className="h-12"
                                src="/src/styles/brigham_logo.png"
                                alt=""
                            />
                        </a>
                        <p className="mt-6">
                            CS 3733 - Team D
                        </p>
                    </div>
                    {/*Company*/}
                    <div className="lg:col-span-2 md:col-span-4 col-span-12">
                        <h5 className="tracking-wide text-gray-100 font-semibold">
                            Company
                        </h5>
                        <ul className="list-none mt-6 space-y-2">
                            <li>
                                <a
                                    href="#"
                                    className=" hover:text-gray-400 transition-all duration-500 ease-in-out"
                                >
                                    About us </a
                                >
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className=" hover:text-gray-400 transition-all duration-500 ease-in-out"
                                >
                                    Services </a
                                >
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className=" hover:text-gray-400 transition-all duration-500 ease-in-out"
                                >
                                    Articles </a
                                >
                            </li>
                        </ul>
                    </div>
                    {/*Important Links*/}
                    <div className="lg:col-span-3 md:col-span-4 col-span-12">
                          <h5 className="tracking-wide text-gray-100 font-semibold">
                              Important Links
                          </h5>
                            <ul className="list-none mt-6 space-y-2">
                                <li>
                                    <a
                                        href="#"
                                        className=" hover:text-gray-400 transition-all duration-500 ease-in-out"
                                    >
                                        Terms of Service </a
                                    >
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className=" hover:text-gray-400 transition-all duration-500 ease-in-out"
                                    >
                                        Privacy Policy </a
                                    >
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className=" hover:text-gray-400 transition-all duration-500 ease-in-out"
                                    >
                                        Help </a
                                    >
                                </li>
                            </ul>

                        </div>
                    {/*Newsletter*/}
                    <div className="lg:col-span-3 md:col-span-4 col-span-12">
                        <h5 className="tracking-wide text-gray-100 font-semibold">
                            Newsletter
                        </h5>
                        <p className="mt-6">Sign up and receive the latest news from our site via email</p>
                        <form action="">
                            <div className="my-3">
                                <label htmlFor="email-input"
                                >Enter your email <span className="text-red-600">*</span>
                                </label>
                                <input
                                    type="email"
                                    id="email-input"
                                    className="mt-3 w-full py-2 px-3 h-10 bg-transparent rounded outline-none border border-gray-500 focus:border-teal-500 focus:ring-0"
                                    placeholder="name@example.com"
                                />
                            </div>
                            <input
                                type="submit"
                                className="py-2 px-5 tracking-wide border duration-500 text-base text-center
                                bg-gray-300 hover:bg- border-gray-300 text-black rounded-md w-full"
                            />
                    </form>
                </div>
            </div>
        </div>
            <div className="border-t border-slate-700">
                <div className="md:text-left text-center container mx-auto py-7 px-6">
                    <p className="mb-0">
                        &copy;
                        2025
                        Brigham and Women's Hospital
                    </p>
                </div>
            </div>
        </footer>
</>
)
    ;
}