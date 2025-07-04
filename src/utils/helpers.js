// src/utils/helpers.js

/**
 * Formats a total number of seconds into a MM:SS string.
 * @param {number} totalSeconds The total number of seconds to format.
 * @returns {string} The formatted time string (e.g., "05:30").
 */
export const formatTime = (totalSeconds) => {
  // Ensure totalSeconds is a non-negative number
  const seconds = Math.max(0, totalSeconds);

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  // Pad with leading zeros if necessary
  const formattedMinutes = minutes.toString().padStart(2, '0');
  const formattedSeconds = remainingSeconds.toString().padStart(2, '0');

  return `${formattedMinutes}:${formattedSeconds}`;
};

// You can add other general utility functions here as your app grows,
// e.g., a function to generate a unique ID if Date.now() isn't sufficient,
// or input validation helpers, etc.