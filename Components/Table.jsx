import React, { useState, useEffect } from 'react'

export default function Table({ headers, filterState, results }) {
    const [filteredHeaders, setFilteredHeaders] = useState([]);

    useEffect(() => {
        // Filter out the headers that are in filterState
        setFilteredHeaders(headers.filter((header) => !filterState.includes(header)));
    }, [filterState, headers]); // Re-run when filterState or headers change

    return (
        <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
                <tr>
                    {filteredHeaders.map((header) => (
                        <th
                            key={header}
                            className="px-4 py-2 font-semibold text-sm uppercase tracking-wider text-gray-700 text-left"
                        >
                            {header}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
                {results.length > 0 ? (
                    results.map((result, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                            {filteredHeaders.map((header) => (
                                <td key={header} className="px-4 py-2">
                                    {result[header]} {/* Display the value htmlFor the header */}
                                </td>
                            ))}
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td
                            colSpan={filteredHeaders.length}
                            className="px-4 py-2 text-center text-gray-500"
                        >
                            There are currently no results.
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    );
}