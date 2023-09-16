import { useState, useRef, useCallback, useMemo, useEffect } from 'react';
const clientWidth = window.innerWidth;

export function useFloatBtn() {
  const [isOpen, setIsopen] = useState<boolean>(false);
  const [position, setpostion] = useState<{ x: number; y: number }>({
    x: clientWidth - 100,
    y: 600,
  });
  const [isSusPend, setIsSusPend] = useState<boolean>(true);

  const dragState = useRef<'up' | 'move' | 'down'>('up'); // 定以小梦拖拽的状态
  const dragElement = useRef<HTMLDivElement>(null);

  // 设置位置
  const handleSetPosition = useCallback((e: MouseEvent) => {
    if (dragElement.current) {
      const rect = dragElement.current.getBoundingClientRect();
      if (e.clientX < clientWidth / 2) {
        setpostion({ x: 26, y: e.clientY - rect?.height / 2 });
      } else {
        setpostion({ x: clientWidth - 100, y: e.clientY - rect?.height / 2 });
      }
    }

  }, []);

  //取消悬挂
  const cancleSuspend = useCallback(() => {
    if (dragElement.current) {
      const rect = dragElement.current.getBoundingClientRect();
      if (position.x < clientWidth / 2) {
        setpostion({ x: -rect?.width / 2, y: position.y });
      } else {
        setpostion({ x: clientWidth - rect?.width / 2, y: position.y });
      }
    }
    setIsSusPend(false);
    setIsopen(false);
  }, [position]);

  // 固定悬挂
  const fix = useCallback(() => {
    if (dragElement.current) {
      if (position.x < clientWidth / 2) {
        setpostion({ x: 26, y: position.y });
      } else {
        setpostion({ x: clientWidth - 100, y: position.y });
      }
    }
    setIsSusPend(true);
    setIsopen(false);
  }, [position.x, position.y]);

  //弹起的列表选项
  const links = useMemo(() => {
    return [
      {
        title: '使用帮助',
        onclick: () => {
          window.open('https://f.wps.cn/form-question-feedback');
        },
        iconHref: '/images/float-xiaomeng/help.svg',
      },
      {
        title: '意见反馈',
        onclick: () => {
          window.open('https://f.wps.cn/w/JdsQMbYQ?feedback=1&channel=PC%E5%B8%B8%E9%A9%BB');
        },
        iconHref: '/images/float-xiaomeng/feedback.svg',
      },
      {
        title: isSusPend ? '取消悬浮' : '固定悬浮',
        onclick: () => {
          if (isSusPend) {
            console.log(111)
            cancleSuspend();
          } else {
            console.log(22222222)
            fix();
          }
          setIsSusPend(!isSusPend);
        },
        iconHref: '/images/float-xiaomeng/cancel-float.svg',
      },
    ];
  }, [cancleSuspend, fix, isSusPend]);
  // 监听鼠标按下事件
  const handleMouseDown = (e: MouseEvent) => {
    e.preventDefault();
    dragState.current = 'down';
  };

  // 监听鼠标移动事件
  const handleMouseMove = useCallback((e: MouseEvent) => {
    console.log(isSusPend)
    if (isSusPend) {
      if (dragElement.current) {
        if (dragState.current !== 'up') {
          dragState.current = 'move';
          const rect = dragElement.current.getBoundingClientRect();
          setpostion({ x: e.clientX - rect?.width / 2, y: e.clientY - rect?.height / 2 });
        }
      }
    }

  }, [isSusPend]);

  // 鼠标抬起执行的逻辑
  const handleMouseUp = useCallback(
    (e: MouseEvent) => {
      if (dragElement.current) {
        if (dragState.current === 'move') {
          dragState.current = 'up';
          handleSetPosition(e);
          setIsopen(false)
        } else {
          setIsopen(true);
          dragState.current = 'up';
        }
      }
    },
    [handleSetPosition]
  );
  return {
    isOpen,
    links,
    handleMouseDown,
    handleMouseUp,
    handleMouseMove,
    dragElement,
    setIsopen,
    position,
    dragState,
    isSusPend,
    setIsSusPend,
  };
}
