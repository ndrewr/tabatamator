// basic interface for in-browser storage
// TODO: replace w LocalForage?
import localforage from 'localforage';

export default {
  getItem: localforage.getItem.bind(localforage),
  setItem: localforage.setItem.bind(localforage)
};
