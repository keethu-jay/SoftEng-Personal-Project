"use client"

import React, { useState } from 'react'


const SearchBar = () => {
    const [query, setQuery] = useState("")

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
    };

    const handleSearch = () => {
        console.log("Searching...", query);
    }
    return (
        <>
            <div className="flex items-center space-x-2">
                <input
                    type="text"
                    placeholder="Search..."
                    value={query}
                    onChange={handleInputChange}
                    className="border-4 border-blue-900 rounded-full px-3 py-1 w-full"
                />
                <button onClick={handleSearch}>
                </button>
            </div>
        </>
    );
};

export default SearchBar