import { Howl } from 'howler';

//demo https://jsfiddle.net/vgzbc4ey/1/
const sound = new Howl({
  src: '/workout_sounds.ogg',
  sprite: {
    1: [5500, 1000],
    2: [3500, 1000],
    3: [1500, 1000],
    bell: [7500, 2000],
    horn: [11500, 2000],
    horn2: [15500, 1500],
    finish: [19500, 8000]
  }
});

export default sound;
