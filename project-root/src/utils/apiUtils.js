import { supabase } from '../api/supabase';

export const fetchProjects = async () => {
  try {
    const { data, error } = await supabase.from('projects').select('*');
    if (error) {
      throw new Error(error.message);
    }
    return data;
  } catch (error) {
    throw new Error('Failed to fetch projects');
  }
};

export const saveProject = async (project) => {
  try {
    const { data, error } = await supabase.from('projects').insert([project]);
    if (error) {
      throw new Error(error.message);
    }
    return data;
  } catch (error) {
    throw new Error('Failed to save project');
  }
};

export const deleteProject = async (projectId) => {
  try {
    const { error } = await supabase.from('projects').delete().match({ id: projectId });
    if (error) {
      throw new Error(error.message);
    }
  } catch (error) {
    throw new Error('Failed to delete project');
  }
};