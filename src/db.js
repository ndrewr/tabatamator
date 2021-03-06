// basic interface for in-browser storage
import localforage from "localforage";

export default {
  getItem: localforage.getItem.bind(localforage),
  setItem: localforage.setItem.bind(localforage),
  checkStatus: () => {
    localforage
      .length()
      .then(result => console.log("DB entries size: ", result));
  }
};
