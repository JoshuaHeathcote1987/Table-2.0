import React, { useState } from 'react'
import Util from '../utils';

import LikeIcon from '../Icons/twotone/like.svg';
import DeleteIcon from '../Icons/twotone/delete.svg';

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
                <img src={LikeIcon} alt="Sort" className="w-6 h-6" />
            </button>
            <div className="flex flex-row gap-4">
                <button onClick={() => {
                    setResults(data);
                    Util.initSortState(url, setSortState, setSortByState, data, setResults);
                    Util.initFilterState(url, setFilterState);
                    setCriteria('');
                }} className="border p-4 rounded-md active:border-gray-400 hover:bg-gray-100"
                >
                    <img src={DeleteIcon} alt="Delete" className="w-6 h-6" />
                </button>
                <div className="flex flex-row">
                    <div className="w-1 bg-yellow-200">

                    </div>
                    <div className="bg-yellow-100 p-4">
                        Always use the <span className="text-red-700 font-bold">delete</span> button to reset the table.
                    </div>
                </div>
            </div>
        </div>
    )
}
