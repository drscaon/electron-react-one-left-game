const ROUND_CROSS_CLIP_PATH = 'polygon(0% 31%, 6% 25%, 19% 25%, 25% 19%, 25% 6%, 31% 0%, 69% 0%, 75% 6%, 75% 19%, 81% 25%, 94% 25%, 100% 31%, 100% 69%, 94% 75%, 81% 75%, 75% 81%, 75% 94%, 69% 100%, 31% 100%, 25% 94%, 25% 81%, 19% 75%, 6% 75%, 0% 69%)';
const ROUND_FRENCH_CLIP_PATH = 'polygon(0 39%, 3% 32%, 32% 3%, 39% 0, 61% 0, 68% 3%, 97% 32%, 100% 39%, 100% 61%, 97% 68%, 68% 97%, 61% 100%, 39% 100%, 32% 97%, 3% 68%, 0 61%)';
const ROUND_TRIANGLE_CLIP_PATH = 'polygon(0% 7%, 7% 0%, 105% 0%, 112% 7%, 7% 112%, 0% 105%)';

const BOARDS = {
  Standard: {
    Pins: [
      'e','e','p','p','p','e','e',
      'e','e','p','p','p','e','e',
      'p','p','p','p','p','p','p',
      'p','p','p','h','p','p','p',
      'p','p','p','p','p','p','p',
      'e','e','p','p','p','e','e',
      'e','e','p','p','p','e','e',
    ],
    Rotation: 'rotate(0deg)',
    ClipPath: ROUND_CROSS_CLIP_PATH
  },
  Cross: {
    Pins: [
      'e','e','h','h','h','e','e',
      'e','e','h','p','h','e','e',
      'h','h','p','p','p','h','h',
      'h','h','h','p','h','h','h',
      'h','h','h','p','h','h','h',
      'e','e','h','h','h','e','e',
      'e','e','h','h','h','e','e',
    ],
    Rotation: 'rotate(0deg)',
    ClipPath: ROUND_CROSS_CLIP_PATH
  },
  Plus: {
    Pins: [
      'e','e','h','h','h','e','e',
      'e','e','h','p','h','e','e',
      'h','h','h','p','h','h','h',
      'h','p','p','p','p','p','h',
      'h','h','h','p','h','h','h',
      'e','e','h','p','h','e','e',
      'e','e','h','h','h','e','e',
    ],
    Rotation: 'rotate(0deg)',
    ClipPath: ROUND_CROSS_CLIP_PATH
  },
  Bench: {
    Pins: [
      'e','e','p','p','p','e','e',
      'e','e','p','p','p','e','e',
      'h','h','p','p','p','h','h',
      'h','h','p','h','p','h','h',
      'h','h','h','h','h','h','h',
      'e','e','h','h','h','e','e',
      'e','e','h','h','h','e','e',
    ],
    Rotation: 'rotate(0deg)',
    ClipPath: ROUND_CROSS_CLIP_PATH
  },
  Arrow: {
    Pins: [
      'e','e','h','p','h','e','e',
      'e','e','p','p','p','e','e',
      'h','p','p','p','p','p','h',
      'h','h','h','p','h','h','h',
      'h','h','h','p','h','h','h',
      'e','e','p','p','p','e','e',
      'e','e','p','p','p','e','e',
    ],
    Rotation: 'rotate(0deg)',
    ClipPath: ROUND_CROSS_CLIP_PATH
  },
  Pyramid: {
    Pins: [
      'e','e','h','h','h','e','e',
      'e','e','h','p','h','e','e',
      'h','h','p','p','p','h','h',
      'h','p','p','p','p','p','h',
      'p','p','p','p','p','p','p',
      'e','e','h','h','h','e','e',
      'e','e','h','h','h','e','e',
    ],
    Rotation: 'rotate(0deg)',
    ClipPath: ROUND_CROSS_CLIP_PATH
  },
  Diamond: {
    Pins: [
      'e','e','h','p','h','e','e',
      'e','e','p','p','p','e','e',
      'h','p','p','p','p','p','h',
      'p','p','p','h','p','p','p',
      'h','p','p','p','p','p','h',
      'e','e','p','p','p','e','e',
      'e','e','h','p','h','e','e',
    ],
    Rotation: 'rotate(0deg)',
    ClipPath: ROUND_CROSS_CLIP_PATH
  },
  'Big Square': {
    Pins: [
      'p','p','p','p','p','p','p',
      'p','p','p','p','p','p','p',
      'p','p','p','h','p','p','p',
      'p','p','p','p','p','p','p',
      'p','p','p','p','p','p','p',
      'p','p','p','p','p','p','p',
      'p','p','p','p','p','p','p',
    ],
    Rotation: 'rotate(0deg)',
    ClipPath: null
  },
  French: {
    Pins: [
      'e','e','p','p','p','e','e',
      'e','p','p','p','p','p','e',
      'p','p','p','h','p','p','p',
      'p','p','p','p','p','p','p',
      'p','p','p','p','p','p','p',
      'e','p','p','p','p','p','e',
      'e','e','p','p','p','e','e',
    ],
    Rotation: 'rotate(0deg)',
    ClipPath: ROUND_FRENCH_CLIP_PATH
  },
  'English Triangle': {
    Pins: [
      'p','p','p','p','p',
      'p','p','p','p','e',
      'p','p','h','e','e',
      'p','p','e','e','e',
      'p','e','e','e','e'
    ],
    Rotation: 'rotate(45deg)',
    ClipPath: ROUND_TRIANGLE_CLIP_PATH
  }
};

export default BOARDS;
