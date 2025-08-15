import {
  useRef,
  useEffect,
  useCallback,
  forwardRef,
  useState,
  useImperativeHandle,
} from 'react'
import { useSpring, animated } from '@react-spring/three'
import { Canvas, useThree } from '@react-three/fiber'
import { MeshDistortMaterial } from '@react-three/drei'
import { Vector2 } from 'three'

const AnimatedMeshDistortMaterial = animated(MeshDistortMaterial)

const MyScene = forwardRef(({}, ref) => {
  const isOver = useRef(false)
  const [vector2] = useState(() => new Vector2())
  const { width, height } = useThree(state => state.size)
  const [springs, api] = useSpring(() => ({
    scale: 1,
    position: [0, 0],
    color: '#ff5e01ff',
    onChange: ({ value }) => {
      vector2.set(value.position[0], value.position[1])
    },
    config: key => {
      switch (key) {
        case 'scale':
          return { mass: 4, friction: 10 }
        case 'position':
          return { mass: 4, friction: 220 }
        default:
          return {}
      }
    },
  }), [])

  useImperativeHandle(ref, () => ({
    getCurrentPosition: () => vector2,
  }))

  const handleClick = useCallback(() => {
    let clicked = false
    return () => {
      clicked = !clicked
      api.start({
        color: clicked ? '#569AFF' : '#ff6d6d',
      })
    }
  }, [api])

  const handlePointerEnter = () => api.start({ scale: 1.5 })
  const handlePointerLeave = () => api.start({ scale: 1 })

  const handleWindowPointerOver = useCallback(() => {
    isOver.current = true
  }, [])

  const handleWindowPointerOut = useCallback(() => {
    isOver.current = false
    api.start({ position: [0, 0] })
  }, [api])

  const handlePointerMove = useCallback(e => {
    if (isOver.current) {
      const x = (e.offsetX / width) * 2 - 1
      const y = (e.offsetY / height) * -2 + 1
      api.start({ position: [x * 5, y * 2] })
    }
  }, [api, width, height])

  useEffect(() => {
    window.addEventListener('pointerover', handleWindowPointerOver)
    window.addEventListener('pointerout', handleWindowPointerOut)
    window.addEventListener('pointermove', handlePointerMove)
    return () => {
      window.removeEventListener('pointerover', handleWindowPointerOver)
      window.removeEventListener('pointerout', handleWindowPointerOut)
      window.removeEventListener('pointermove', handlePointerMove)
    }
  }, [handleWindowPointerOver, handleWindowPointerOut, handlePointerMove])

  return (
    <animated.mesh
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onClick={handleClick()}
      scale={springs.scale}
      position={springs.position.to((x, y) => [x, y, 0])}
    >
      <sphereGeometry args={[1.5, 64, 32]} />
      <AnimatedMeshDistortMaterial speed={5} distort={0.5} color={springs.color} />
    </animated.mesh>
  )
})

// Varsayılan olarak dışa aktarılan bileşenin adını daha anlamlı yaptım.
export default function BlobBackground() {
  return (
    // DEĞİŞİKLİK 1: <Canvas> elementine stil ekleyerek onu tam ekran
    // bir arka plan haline getiriyoruz.
    <Canvas
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -1, // Diğer tüm içeriklerin arkasında kalmasını sağlar.
      }}
    >
      <ambientLight intensity={0.8} />
      <pointLight intensity={1} position={[0, 6, 0]} />
      <MyScene />
    </Canvas>
  )
}