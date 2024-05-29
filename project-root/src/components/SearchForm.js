import React, { useState, useEffect } from 'react';
import { useSupabase } from '../api/supabase';
import { semanticSearch } from '../utils/semanticSearch';
import { errorHandling } from '../utils/errorHandling';

const SearchForm = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const supabase = useSupabase();

  useEffect(() => {
    if (searchQuery.trim() !== '') {
      const fetchSearchResults = async () => {
        try {
          const { data, error } = await supabase.from('projects').select().textSearch(searchQuery);
          if (error) {
            throw new Error(error.message);
          }
          setSearchResults(data || []);
        } catch (error) {
          errorHandling(error.message);
        }
      };
      fetchSearchResults();
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div>
      <input type="text" placeholder="Search projects" value={searchQuery} onChange={handleSearchChange} />
      <ul>
        {searchResults.map((result) => (
          <li key={result.id}>{result.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default SearchForm;