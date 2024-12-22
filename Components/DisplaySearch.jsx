import React, { useState } from 'react'
import Util from '../utils';

export default function DisplaySearch({
    url,
    headers,
    results,
    setResults,
    setSortState,
    setSortByState,
    setFilterState,
    data
}) {

    const [header, setHeader] = useState(headers[0]);
    const [criteria, setCriteria] = useState('');

    return (
        <div className="flex flex-row items-center gap-8">
            <div className="w-64">
                <label htmlFor="sortOrder" className="block text-sm font-medium text-gray-700 mb-2">Search By</label>
                <select
                    onChange={(e) => setHeader(e.target.value)}
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
                <label htmlFor="sortOrder" className="block text-sm font-medium text-gray-700 mb-2">Search?</label>
                <input
                    onChange={e => setCriteria(e.target.value)}
                    value={criteria}
                    id="sortOrder"
                    name="sortOrder"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
            </div>
            <button onClick={() => {
                Util.runSearch(results, header, criteria, setResults);
            }} className="border p-4 rounded-md active:border-gray-400 hover:bg-gray-100"
            >
                👍
            </button>
            <button onClick={() => {
                setResults(data);
                Util.initSortState(url, setSortState, setSortByState, data, setResults);
                Util.initFilterState(url, setFilterState);
                setCriteria('');
            }} className="border p-4 rounded-md active:border-gray-400 hover:bg-gray-100"
            >
                ❌
            </button>
        </div>
    )
}
