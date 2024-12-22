import React, { useState, useEffect } from 'react';
import Util from '../utils';

export default function DisplayFilter({
    url,
    headers,
    filterState = [],
    setFilterState
}) {

    const [shown, setShown] = useState(headers);
    const [hidden, setHidden] = useState(filterState);
    const [selected, setSelected] = useState(headers ? headers[0] : []);

    useEffect(() => {
        if (Array.isArray(filterState)) {
            setHidden(filterState);
        } else {
            try {
                // If filterState is a JSON string, parse it
                setHidden(JSON.parse(filterState || "[]"));
            } catch (e) {
                console.error("Invalid filterState:", e);
                setHidden([]); // Fallback
            }
        }
    }, [filterState]); 

    return (
        <div>

            {/* <Console /> */}

            <div className="flex flex-row items-center gap-8">
                <div className="h-44 w-64">
                    <div className="flex flex-row justify-between items-center">
                        <label htmlFor="shownHeaders" className="block text-sm font-medium text-gray-700 mb-2">
                            Shown
                        </label>
                        <button onClick={() => {
                            setShown(headers);
                            setHidden([]);
                        }}>🔃</button>
                    </div>
                    <select
                        id="shownHeaders"
                        size="8"
                        name="shownHeaders"
                        className="block w-full h-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    >
                        {
                            shown
                                .filter((header) => !hidden.includes(header)) // Exclude items in the hidden list
                                .map((header) => (
                                    <option
                                        onClick={(e) => Util.handleSelectChange(e, setSelected)}
                                        key={header}
                                        value={header}
                                    >
                                        {header}
                                    </option>
                                ))
                        }
                    </select>
                </div>
                <div className="h-44 w-64">
                    <label htmlFor="hiddenHeaders" className="block text-sm font-medium text-gray-700 mb-2">Hidden</label>
                    <select
                        id="hiddenHeaders"
                        size="8"
                        name="hiddenHeaders"
                        className="block w-full h-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    >
                        {
                            hidden.length > 0
                                ?
                                hidden.map((header) => (
                                    <option onClick={(e) => Util.handleSelectChange(e, setSelected)} key={header} value={header}>{header}</option>
                                ))
                                :
                                <option>Hidden is empty?</option>
                        }
                    </select>
                </div>
                <div className="flex flex-col justify-center items-center gap-4 pt-4">
                    <button onClick={() => {
                        if (selected) {
                            // Add to hidden and remove from shown
                            setHidden((prevList) => [...prevList, selected]);
                            setSelected(""); // Reset selection
                        }
                    }} className="border p-4 rounded-md active:border-gray-400 hover:bg-gray-100">➡️</button>
                    <button onClick={() => {
                        if (selected) {
                            // Add to shown and remove from hidden
                            setHidden((prevList) => prevList.filter((item) => item !== selected));
                            setSelected(""); // Reset selection
                        }
                    }} className="border p-4 rounded-md active:border-gray-400 hover:bg-gray-100">⬅️</button>
                    <button onClick={() => {
                        const values = hidden;
                        setFilterState(hidden);
                        Util.writeLocalStorage(url, 'filter', values);
                    }} className="border p-4 rounded-md active:border-gray-400 hover:bg-gray-100">👍</button>
                </div>
            </div>
        </div>
    )
}
