import React from 'react';
import { useSpring, animated, to as interpolate, createInterpolator } from '@react-spring/web';
import { useControls } from 'leva';
import { cubicCoordinates, stepsCoordinates } from 'easing-coordinates';

const easeMap = {
  'ease-in-out': { x1: 0.42, y1: 0, x2: 0.58, y2: 1 },
  'ease-out': { x1: 0, y1: 0, x2: 0.58, y2: 1 },
  'ease-in': { x1: 0.42, y1: 0, x2: 1, y2: 1 },
  ease: { x1: 0.25, y1: 0.1, x2: 0.25, y2: 1 },
  linear: { x1: 0.25, y1: 0.25, x2: 0.75, y2: 0.75 },
};

// Arka plan bileşeni
export function AnimatedBackground() {
  const { from, mid, to, angle, stops, easing, easeCustom } = useControls({
    from: '#24a9c7',
    mid: '#614a61',
    to: '#72102c',
    angle: { value: 32, min: 0, max: 360 },
    stops: { value: 5, max: 100, min: 2 },
    easing: {
      value: 'ease-in-out',
      options: ['linear', 'ease', 'ease-in', 'ease-out', 'ease-in-out', 'steps'],
    },
    easeCustom: '',
  });

  const { colorFrom, colorMid, colorTo } = useSpring({
    colorFrom: from,
    colorMid: mid,
    colorTo: to,
  });

  const coordinates = React.useMemo(() => {
    let coords;
    const customBezier = easeCustom.split(',').map(Number);
    if (customBezier.length <= 1) {
      if (easing === 'steps') {
        coords = stepsCoordinates(stops, 'skip-none');
      } else {
        const { x1, y1, x2, y2 } = easeMap[easing];
        coords = cubicCoordinates(x1, y1, x2, y2, stops);
      }
    } else {
      coords = cubicCoordinates(customBezier[0], customBezier[1], customBezier[2], customBezier[3], stops);
    }
    return coords;
  }, [easing, easeCustom, stops]);

  const allStops = interpolate([colorFrom, colorMid, colorTo], (from, mid, to) => {
    const blend = createInterpolator({ range: [0, 0.5, 1], output: [from, mid, to] });
    return coordinates.map(({ x, y }) => `${blend(y)} ${x * 100}%`).join(', ');
  });

  const backgroundStyle = {
    position: 'fixed', // 'absolute' yerine 'fixed' kullanarak scroll'dan etkilenmemesini sağlıyoruz.
    width: '100vw',
    height: '100vh',
    top: 0,
    left: 0,
    zIndex: -1,
  };

  return (
    <animated.div
      style={{
        ...backgroundStyle,
        backgroundImage: interpolate(
          [allStops, angle],
          (stops, ang) => `linear-gradient(${ang}deg, ${stops})`
        ),
      }}
    />
  );
}
