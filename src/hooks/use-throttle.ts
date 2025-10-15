import { useEffect, useRef } from 'react';
import { throttle } from 'lodash';

export function useThrottle<T extends (...args: any[]) => void>(
  fn: T,
  delay: number = 1000
): T {
  const fnRef = useRef(fn);
  const throttledFnRef = useRef<T>();

  // 每次 fn 改變時更新 fnRef
  useEffect(() => {
    fnRef.current = fn;
  }, [fn]);

  // 初始化 throttle 包裝函式，只執行一次
  useEffect(() => {
    throttledFnRef.current = throttle((...args: Parameters<T>) => {
      fnRef.current(...args);
    }, delay);
  }, [delay]);

  return throttledFnRef.current!;
}
