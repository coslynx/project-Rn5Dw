import React, { useState, useEffect } from 'react';
import { supabase } from '../api/supabase';
import SearchForm from '../components/SearchForm';
import ProjectCard from '../components/ProjectCard';
import ErrorBoundary from '../components/ErrorBoundary';
import { semanticSearch } from '../utils/semanticSearch';
import { errorHandling } from '../utils/errorHandling';

const Index = () => {
  const [projects, setProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data, error } = await supabase
          .from('projects')
          .select()
          .order('name', { ascending: true });

        if (error) {
          throw new Error('Error fetching projects');
        }

        setProjects(data);
      } catch (error) {
        errorHandling(error.message);
      }
    };

    fetchProjects();
  }, []);

  const handleSearch = (query) => {
    setSearchTerm(query);
  };

  const filteredProjects = semanticSearch(projects, searchTerm);

  return (
    <div>
      <SearchForm onSearch={handleSearch} />
      <div>
        {filteredProjects.map((project) => (
          <ErrorBoundary key={project.id}>
            <ProjectCard project={project} />
          </ErrorBoundary>
        ))}
      </div>
    </div>
  );
};

export default Index;