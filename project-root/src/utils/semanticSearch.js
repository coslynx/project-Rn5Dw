import { supabase } from '../api/supabase';

const searchProjects = async (query) => {
  try {
    const { data, error } = await supabase
      .from('projects')
      .select()
      .textSearch('description, tagline, name', query);

    if (error) {
      throw new Error('An error occurred while searching for projects');
    }

    return data;
  } catch (error) {
    console.error(error.message);
    return [];
  }
};

export { searchProjects };