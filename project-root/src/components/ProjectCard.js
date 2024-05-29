import React from 'react';
import { useState, useEffect } from 'react';
import { supabase } from '../api/supabase';
import { errorHandling } from '../utils/errorHandling';

const ProjectCard = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      let { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('name', { ascending: true });

      if (error) {
        throw error;
      }

      setProjects(data);
    } catch (error) {
      errorHandling(error);
    }
  };

  return (
    <div>
      {projects.map((project) => (
        <div key={project.id}>
          <h2>{project.name}</h2>
          <p>{project.tagline}</p>
          <p>{project.description}</p>
        </div>
      ))}
    </div>
  );
};

export default ProjectCard;