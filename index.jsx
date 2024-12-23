import React, { useState, useEffect } from 'react';
import Util from './utils';
import DisplaySort from './Components/DisplaySort';
import DisplayFilter from './Components/DisplayFilter';
import DisplaySearch from './Components/DisplaySearch';
import DisplayPagination from './Components/DisplayPagination';
import Logo from './Components/Logo';
import Table from './Components/Table';

export default function Index({ data, fields }) {
    const url = window.location.pathname;

    const [results, setResults] = useState(data);
    const [inputs, setInputs] = useState(fields); // for creating modals
    const [headers, setHeaders] = useState(results?.[0] ? Object.keys(results[0]) : []);
    const [searchBy, setSearchBy] = useState('');
    const [sortByState, setSortByState] = useState(headers[0]);
    const [sortState, setSortState] = useState('asc');
    const [filterState, setFilterState] = useState([]);
    const [paginationState, setPaginationState] = useState(20);

    useEffect(() => {
        Util.initSortState(url, setSortState, setSortByState, results, setResults);
        Util.initFilterState(url, setFilterState);
    }, []);

    const handleSortChange = (newSortByState, newSortState) => {
        setSortByState(newSortByState);
        setSortState(newSortState);
    };

    return (
        <div className="p-8">
            <Logo />

            <hr className="my-4" />

            <DisplaySort
                url={url}
                headers={headers}
                results={results}
                sortState={sortState}
                sortByState={sortByState}
                setResults={setResults}
                setSortState={setSortState}
                setSortByState={setSortByState}
            />

            <hr className="my-4" />

            <DisplayFilter
                url={url}
                headers={headers}
                filterState={filterState}
                setFilterState={setFilterState}
            />

            <hr className="mt-12 mb-8" />

            <DisplaySearch
                url={url}
                headers={headers}
                results={results}
                setResults={setResults}
                setSortState={setSortState}
                setSortByState={setSortByState}
                setFilterState={setFilterState}
                data={data}
            />

            <hr className="mt-12 mb-8" />

            <DisplayPagination />

            <hr className="mt-12 mb-8" />

            <Table
                headers={headers}
                filterState={filterState}
                results={results}
            />
        </div>
    );
}
