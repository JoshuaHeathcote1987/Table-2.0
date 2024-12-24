import React, { useState, useEffect } from 'react';
import Util from './utils';
import DisplaySort from './Components/DisplaySort';
import DisplayFilter from './Components/DisplayFilter';
import DisplaySearch from './Components/DisplaySearch';
import DisplayPagination from './Components/DisplayPagination';
import Logo from './Components/Logo';
import Table from './Components/Table';
import BackToTopButton from './Components/BackToTop';

import Todo from './Components/Todo';

export default function Index({ data, fields }) {
    const url = window.location.pathname;

    const [results, setResults] = useState(data);
    const [headers, setHeaders] = useState(data?.[0] ? Object.keys(data[0]) : []);
    const [sortByState, setSortByState] = useState('id');

    const [sortState, setSortState] = useState('asc');
    const [filterState, setFilterState] = useState([]);
    const [searchBy, setSearchBy] = useState('');
    const [paginationState, setPaginationState] = useState(20); // Items per page
    const [currentPage, setCurrentPage] = useState(1); // Current page
    const [inputs, setInputs] = useState(fields); // for creating modals

    useEffect(() => {
        Util.initSortState(url, setSortState, setSortByState, results, setResults);
        Util.initFilterState(url, setFilterState);
    }, []);

    // Calculate the paginated results
    const startIndex = (currentPage - 1) * paginationState;
    const endIndex = startIndex + paginationState;
    const paginatedResults = results.slice(startIndex, endIndex);

    // Total number of pages
    const totalPages = Math.ceil(results.length / paginationState);

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

            {console.log('Sort by state ' + headers)}

            <hr className="mt-12 mb-8" />

            <Table
                headers={headers}
                filterState={filterState}
                results={paginatedResults} // Use paginated results
            />

            <hr className="mt-12 mb-8" />

            <DisplayPagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
            />

            <BackToTopButton />
        </div>
    );
}
