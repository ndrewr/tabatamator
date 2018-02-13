// global constant values
import { calculateTotalWorkoutTime } from './utils/helpers';

export const APP_TITLE = 'Tabatamator';

export const DEFAULT_WORKOUT = {
  intervalTime: 20,
  restTime: 10,
  targetSets: 2,
  targetIntervals: 3
};

export const DEFAULT_APP_STATE = {
  ...DEFAULT_WORKOUT,
  done: false,
  resting: false,
  open: false,
  running: false,
  currentInterval: 1,
  loading: true,
  loadedPreset: null,
  currentTime: DEFAULT_WORKOUT.intervalTime,
  totalTime: 0,
  remainingSets: DEFAULT_WORKOUT.targetSets,
  targetTime: calculateTotalWorkoutTime(DEFAULT_WORKOUT)
};

// Theme colors
export const RED = '#fe4a49';
export const YELLOW = '#fed766';
export const BLUE = '#009fb7';
export const GREY1 = '#e6e6ea';
export const GREY2 = '#f4f4f8';

export const APP_THEME = {
  // build error caused by incl palette key; github issue hints that updating packages mite help
  // palette: {
  //   primary: {
  //     light: '#07D0EF',
  //     main: '#009fb7',
  //     dark: '#087687',
  //     contrastText: '#fff',
  //   },
  //   secondary: {
  //     light: '#F98E8E',
  //     main: '#fe4a49',
  //     dark: '#E20909',
  //     contrastText: '#fff',
  //   },
  // },
  typography: {
    fontFamily: 'quantico, sans-serif'
    // '-apple-system,system-ui,BlinkMacSystemFont,' +
    // '"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif',
    // fontWeightMedium,
    // body1: {
    //   fontWeight: fontWeightMedium,
    // },
    // button: {
    //   fontStyle: 'italic',
    // },
  }
};
