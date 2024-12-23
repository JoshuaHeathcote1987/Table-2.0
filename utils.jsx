// util.jsx
class Utils {

    static initSortState(url, setSortState, setSortByState, results, setResults) {
        try {
            // Read data from localStorage
            const storedData = this.readLocalStorage(url, 'sort');

            console.log("Stored Data:", storedData);

            // Parse the stored data if it exists and is valid JSON
            const parsedData = storedData ? JSON.parse(storedData) : [];
            console.log("Parsed Data:", parsedData);

            // Update the states with the separated values
            if (Array.isArray(parsedData)) {
                const initialSortState = parsedData[0] || null;
                const initialSortByState = parsedData[1] || null;

                setSortState(initialSortState); // Update state for future interactions
                setSortByState(initialSortByState);

                // Run sorting directly with the parsed data
                this.runSort(initialSortState, initialSortByState, results, setResults);
            }
        } catch (error) {
            console.error("Failed to initialize app:", error);
        }
    };

    static initFilterState(url, setFilterState) {
        try {
            const storedData = this.readLocalStorage(url, 'filter');
            
            // Ensure the data is JSON-parsed or provide a fallback
            const parsedData = storedData ? JSON.parse(storedData) : [];
    
            // Confirm the parsed data is an array (if required)
            if (!Array.isArray(parsedData)) {
                throw new Error("Parsed data is not an array");
            }
    
            setFilterState(parsedData);
            console.log("Stored Data:", parsedData);
        } catch (error) {
            console.error("Failed to initialize app:", error);
    
            // Fallback: Set default state to an empty array
            setFilterState([]);
        }
    }    

    static readLocalStorage(url, type) {
        try {
            const key = `${url}/${type}`;
            return localStorage.getItem(key);
        } catch (error) {
            console.error(`Failed to read from localStorage for ${url}-${type}:`, error);
            return null;
        }
    }

    static writeLocalStorage(url, type, values) {
        try {
            // Convert values to JSON if it's not a string
            const stringValue = typeof values === 'string' ? values : JSON.stringify(values);

            // Write to localStorage
            localStorage.setItem(`${url}/${type}`, stringValue);
            return true; // Indicate success
        } catch (error) {
            console.error(`Failed to write to localStorage for ${url}-${type}:`, error); // Log descriptive error
            return false; // Indicate failure
        }
    }

    static runSort(sortState, sortByState, results, setResults) {
        // Clone the results array to avoid mutating the original state
        const sortedResults = [...results].sort((a, b) => {
            if (sortState === "asc") {
                return a[sortByState] > b[sortByState] ? 1 : -1;
            } else if (sortState === "desc") {
                return a[sortByState] < b[sortByState] ? 1 : -1;
            }
            return 0; // Default case
        });

        // Update the state with the sorted results
        setResults(sortedResults);
    }

    static runFilter() {
        // No run filter has to be achieved since the variable is filled and then 
        // the filter is done in the Table document.
    }

    static runPagination() {
        return 'run pagination func';
    }

    static runSearch(results, header, criteria, setResults) {
        const searchResults = results.filter((result) =>
            result[header]
                ?.toString()
                .toLowerCase()
                .includes(criteria.toLowerCase())
        );

        setResults(searchResults);
    };
    
    static handleSelectChange(e, set) {
        const selectedValue = e.target.value; // Get the selected value
        set(selectedValue); // Update the sort state with the selected value
    };
}

export default Utils; // Export the class as the default export