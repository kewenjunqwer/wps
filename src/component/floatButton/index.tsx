
import styles from './style.module.scss';
import { Popover } from 'antd';
import { useFloatBtn } from '../../hooks/useFloatBtn';
import { useCallback, useEffect, useRef } from 'react';
// import { useFloatBtn } from '../../hooks/useFloatBtn';
import { ReactComponent as CloseIcon } from '../../assets/xiaomeng/close.svg'

// 后期考虑要不要把逻辑抽离

export default function FloatBtn() {

  const dragElement = useRef<HTMLDivElement>(null);
  const {
    isOpen,
    links,
    setIsopen,
    position,
    dragState,
    setpostion,
    isSusPend
  } = useFloatBtn({ dragElement });

  const lastInnerWidth = useRef(window.innerWidth)

  const onResize = useCallback(() => {
    const maxBottomY = window.innerHeight - (dragElement.current?.getBoundingClientRect().height || 0)
    const overflowY = position.y > maxBottomY
    const leftSide = position.x < (lastInnerWidth.current - (dragElement.current?.getBoundingClientRect().width || 0)) / 2
    lastInnerWidth.current = window.innerHeight
    const x = leftSide ? window.innerWidth - 42 : window.innerWidth - 100
    setpostion({
      y: overflowY ? maxBottomY - 100 : position.y,
      x: isSusPend ? window.innerWidth - (dragElement.current?.getBoundingClientRect().width || 0) / 2 : x,
    })
  }, [dragElement, isSusPend, position.x, position.y, setpostion])

  useEffect(() => {
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('resize', onResize)
    }
  }, [onResize])

  const content = () => {
    return (
      <div className={styles['float-content']}>
        <div className={styles['header']}>
          <div className={styles['title-container']}>
            <img className={styles.img} src="/images/logo.svg" alt="" />
            <div className={styles.title}>金山表单</div>
          </div>
          <CloseIcon onClick={() => { setIsopen(false) }}></CloseIcon>
        </div>
        <div className={styles['link-list']}>
          {links.map(item => (
            <div key={item.title} onClick={item.onclick} className={styles['link-item']}>
              <img className={styles['img']} src={item.iconHref} alt="" />
              <span className={styles.title}>{item.title}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };
  return (
    <div
      ref={dragElement}
      style={{
        left: position.x,
        top: position.y,
        transition: dragState.current === 'moving' ? 'none' : 'all 0.5s',
      }}
      className={styles['float-btn-wrap']}
    >
      <Popover
        trigger={'click'}
        open={isOpen}
        destroyTooltipOnHide={true}
        arrow={false}
        content={content()}
        placement="top"
      >
        <img className={styles['img']} src="/images/xiaomeng.png" alt="" />
      </Popover>
    </div>
  );
}
