import { logError } from './apiUtils';

const handleSearchError = (errorMessage) => {
  logError(errorMessage);
  // Display user-friendly error message on the frontend
};

export { handleSearchError };