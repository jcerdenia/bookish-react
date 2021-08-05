// An action creator:
// Will create an action and bind with events from user interaction.
export const setSearchTerm = (term) => {
  // Actions have a 'type' prop that signal the type of action performed;
  // other than that, the structure of an action object is up to us to define.
  return { type: 'SET_SEARCH_TERM', term }
}