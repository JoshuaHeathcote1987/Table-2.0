import React from 'react';
import Util from '../utils';

export default function DisplaySort({
    url,
    headers,
    results,
    sortState,
    sortByState,
    setResults,
    setSortState,
    setSortByState
}) {
    return (
        <div className="flex flex-row items-center gap-8">
            <div className="w-64">
                <label htmlFor="sortOrder" className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
                <select
                    value={sortByState || ""} // Ensure the value reflects sortByState
                    onChange={(e) => Util.handleSelectChange(e, setSortByState)}
                    id="sortOrder"
                    name="sortOrder"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                >
                    {headers.length > 0 ? (
                        headers.map((header) => (
                            <option key={header} value={header}>
                                {header}
                            </option>
                        ))
                    ) : (
                        <option value="" disabled>
                            Headers is empty?
                        </option>
                    )}
                </select>
            </div>
            <div className="w-64">
                <label htmlFor="sortOrder" className="block text-sm font-medium text-gray-700 mb-2">Sort Order</label>
                <select
                    value={sortState || "asc"} // Default to "asc" if sortState is null or undefined
                    onChange={(e) => Util.handleSelectChange(e, setSortState)}
                    id="sortOrder"
                    name="sortOrder"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                >
                    <option value="asc">Ascending</option>
                    <option value="desc">Descending</option>
                </select>
            </div>
            <button
                onClick={() => {
                    // Debugging the current state values
                    console.log("Current sortState:", sortState);
                    console.log("Current sortByState:", sortByState);

                    // Combine sortState and sortByState into the `values` array
                    const values = [sortState, sortByState].filter((item) => item != null); // Avoid filtering out valid values

                    console.log("Combined values:", values);

                    // Call the utility methods with the generated `values`
                    Util.runSort(sortState, sortByState, results, setResults);
                    Util.writeLocalStorage(url, 'sort', values);
                }}
                className="border p-4 rounded-md active:border-gray-400 hover:bg-gray-100"
            >
                👍
            </button>
        </div>
    )
}
