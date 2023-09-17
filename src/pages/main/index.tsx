import styles from './style.module.scss';
import Content from '../content';
import LeftSlider from '../leftSlider';
import FloatBtn from '../../component/floatButton';
import FormProvider from '../../context/form';

export default function Main() {
  return (
    <div className={styles.container}>
      <LeftSlider />
      <Content />
      <FloatBtn />
    </div>
  );
}
