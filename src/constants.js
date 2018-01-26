// global constant values

export const APP_TITLE = 'Tabatamator';

export const DEFAULT_WORKOUT = {
  intervalTime: 20,
  restTime: 10,
  targetSets: 2,
  currentInterval: 1,
  // remainingSets: 2,
  currentTime: 0,
  totalTime: 0,
  targetIntervals: 3,
  done: false,
  resting: false
};

// background CSS gradient patterns

export const heartBackground = {
  background: `
  radial-gradient(circle closest-side at 60% 43%, #b03 26%, rgba(187,0,51,0) 27%),
  radial-gradient(circle closest-side at 40% 43%, #b03 26%, rgba(187,0,51,0) 27%),
  radial-gradient(circle closest-side at 40% 22%, #d35 45%, rgba(221,51,85,0) 46%),
  radial-gradient(circle closest-side at 60% 22%, #d35 45%, rgba(221,51,85,0) 46%),
  radial-gradient(circle closest-side at 50% 35%, #d35 30%, rgba(221,51,85,0) 31%),

  radial-gradient(circle closest-side at 60% 43%, #b03 26%, rgba(187,0,51,0) 27%) 50px 50px,
  radial-gradient(circle closest-side at 40% 43%, #b03 26%, rgba(187,0,51,0) 27%) 50px 50px,
  radial-gradient(circle closest-side at 40% 22%, #d35 45%, rgba(221,51,85,0) 46%) 50px 50px,
  radial-gradient(circle closest-side at 60% 22%, #d35 45%, rgba(221,51,85,0) 46%) 50px 50px,
  radial-gradient(circle closest-side at 50% 35%, #d35 30%, rgba(221,51,85,0) 31%) 50px 50px`,
  backgroundColor: '#b03',
  backgroundSize: '100px 100px'
};

export const zagBackground = {
  background: `
    linear-gradient(135deg, #ECEDDC 25%, transparent 25%) -50px 0,
    linear-gradient(225deg, #ECEDDC 25%, transparent 25%) -50px 0,
    linear-gradient(315deg, #ECEDDC 25%, transparent 25%),
    linear-gradient(45deg, #ECEDDC 25%, transparent 25%)`,
  backgroundSize: '100px 100px',
  backgroundColor: '#EC173A'
};

export const combBackground = {
  background: `
    radial-gradient(circle farthest-side at 0% 50%,#fb1 23.5%,rgba(240,166,17,0) 0)21px 30px,
    radial-gradient(circle farthest-side at 0% 50%,#B71 24%,rgba(240,166,17,0) 0)19px 30px,
    linear-gradient(#fb1 14%,rgba(240,166,17,0) 0, rgba(240,166,17,0) 85%,#fb1 0)0 0,
    linear-gradient(150deg,#fb1 24%,#B71 0,#B71 26%,rgba(240,166,17,0) 0,rgba(240,166,17,0) 74%,#B71 0,#B71 76%,#fb1 0)0 0,
    linear-gradient(30deg,#fb1 24%,#B71 0,#B71 26%,rgba(240,166,17,0) 0,rgba(240,166,17,0) 74%,#B71 0,#B71 76%,#fb1 0)0 0,
    linear-gradient(90deg,#B71 2%,#fb1 0,#fb1 98%,#B71 0%)0 0 #fb1`,
  backgroundSize: '40px 60px'
};

export const arrowBackground = {
  background: `
    linear-gradient(45deg, #e1ebbd 45px, transparent 45px)64px 64px,
    linear-gradient(45deg, #e1ebbd 45px, transparent 45px,transparent 91px, #e1ebbd 91px, #e1ebbd 135px, transparent 135px),
    linear-gradient(-45deg, #e1ebbd 23px, transparent 23px, transparent 68px,#e1ebbd 68px,#e1ebbd 113px,transparent 113px,transparent 158px,#e1ebbd 158px)`,
  backgroundolor: '#92baac',
  backgroundSize: '128px 128px'
};
