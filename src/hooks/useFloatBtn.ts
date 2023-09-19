import { useState, useRef, useCallback, useMemo, useEffect } from 'react';
const clientWidth = window.innerWidth;
const clientHeight = window.innerHeight
interface Props {
  dragElement: React.RefObject<HTMLDivElement>
}

export function useFloatBtn({ dragElement }: Props) {
  const [isOpen, setIsopen] = useState<boolean>(false);
  const [position, setpostion] = useState<{ x: number; y: number }>({
    x: clientWidth - 100,
    y: clientHeight - 100,
  });
  // 是否
  const [isSusPend, setIsSusPend] = useState<boolean>(true);
  const dragState = useRef<'down' | 'moving' | 'default' | 'disabled'>('default'); // 定以小梦拖拽的状态
  const mousePostion = useRef<{ x: number, y: number }>({ x: 0, y: 0 })

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

  }, [dragElement]);

  //取消悬挂
  const cancleSuspend = useCallback(() => {
    if (dragElement.current) {
      const rect = dragElement.current.getBoundingClientRect();
      setpostion({ x: clientWidth - rect?.width / 2, y: position.y });
    }
    setIsSusPend(false);
    setIsopen(false)
    dragState.current = 'disabled'
  }, [dragElement, position.y]);

  // 固定悬挂
  const fix = useCallback(() => {
    if (dragElement.current) {
      setIsSusPend(true);
      setIsopen(false);
      dragState.current = 'default'
      setpostion({ x: clientWidth - 100, y: position.y });
    }
  }, [dragElement, position.y]);


  // 监听鼠标按下事件
  const handleMouseDown = (e: MouseEvent) => {
    e.preventDefault();
    if (dragState.current !== 'disabled') {
      dragState.current = 'down';
      mousePostion.current = { x: e.clientX, y: e.clientY }
    }
  };

  // 监听鼠标移动事件
  const handleMouseMove = useCallback((e: MouseEvent) => {

    if (!dragElement.current) return
    const { x, y } = mousePostion.current
    if (e.clientX !== x && e.clientY !== y && dragState.current !== 'default' && dragState.current !== 'disabled') {
      dragState.current = 'moving'
      const rect = dragElement.current.getBoundingClientRect();
      setpostion({ x: e.clientX - rect?.width / 2, y: e.clientY - rect?.height / 2 });
    }

  }, [dragElement]);

  // 鼠标抬起执行的逻辑
  const handleMouseUp = useCallback(
    (e: MouseEvent) => {
      if (!dragElement.current) return
      if (dragState.current === 'moving') {
        setIsopen(false)
        handleSetPosition(e)
        dragState.current = 'default'
      } else {
        setIsopen(true)
        if (dragState.current !== 'disabled') {
          dragState.current = 'default'
        }
      }
    },
    [dragElement, handleSetPosition]
  );

  useEffect(() => {
    if (isSusPend && dragElement.current) {
      dragElement.current?.addEventListener('mousedown', (e: MouseEvent) => {
        handleMouseDown(e)
        document.addEventListener('mousemove', handleMouseMove, true);
        document.addEventListener('mouseup', handleMouseUp);
      });
    }
    return () => {
      if (isSusPend && dragElement.current) {
        dragElement.current?.addEventListener('mousedown', (e: MouseEvent) => {
          handleMouseDown(e)
          document.addEventListener('mousemove', handleMouseMove, true);
          document.addEventListener('mouseup', handleMouseUp);
        });
      }
    }
  }
    , [dragElement, handleMouseMove, handleMouseUp, isSusPend]
  )

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
            cancleSuspend();
          } else {
            fix();
          }
          setIsSusPend(!isSusPend);
        },
        iconHref: '/images/float-xiaomeng/cancel-float.svg',
      },
    ];
  }, [cancleSuspend, fix, isSusPend]);
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
    setpostion

  };
}
