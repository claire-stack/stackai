import { useEffect, useState } from 'react';
import Lottie from 'lottie-react';

export default function TypingDotsLottie({ size = 40, src }: { size?: number; src: string }) {
  const [animationData, setAnimationData] = useState<any>(null);

  useEffect(() => {
    fetch(src)
      .then((res) => res.json())
      .then((data) => setAnimationData(data))
      .catch((err) => console.error('Failed to load Lottie JSON:', err));
  }, [src]);

  if (!animationData) return null;

  return (
    <div className="flex justify-start items-center">
      <Lottie animationData={animationData} loop style={{ width: size, height: size }} />
    </div>
  );
}
