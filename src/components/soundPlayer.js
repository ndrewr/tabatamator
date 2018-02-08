import { Howl } from 'howler';

const sound = new Howl({
  // src: 'https://fitlb.com/sounds/fight-bell-all.ogg',
  src: '/workout_sounds.ogg',
  sprite: {
    one: [5500, 1000],
    two: [3500, 1000],
    three: [1500, 1000],
    bell: [7500, 2000],
    horn: [11500, 2000],
    horn2: [15500, 1500],
    finish: [19500, 8000]
  }
});

export default sound;
