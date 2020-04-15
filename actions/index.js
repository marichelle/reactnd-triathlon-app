export const ADD_ENTRY = 'ADD_ENTRY';
export const RECEIVE_ENTRIES = 'RECEIVE_ENTRIES';

export function addEntry(entry) {
  return {
    type: ADD_ENTRY,
    entry,
  };
}

export function receiveEntries(entries) {
  return {
    type: RECEIVE_ENTRIES,
    entries,
  };
}
