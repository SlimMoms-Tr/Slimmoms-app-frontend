import { format } from 'date-fns';
import { useSelector } from 'react-redux';
import { getSummary, getDate, getNotRecFood, getDaily } from 'redux/dairy/dairySelector';

import styles from './SummaryForDay.module.css';

export default function SummaryForDay() {
  const date = new Date();
  const reduxDate = useSelector(getDate);
  const dailyRate = useSelector(getDaily);
  const summary = useSelector(getSummary);
  const notRecFoodArr = useSelector(getNotRecFood);

  return (
    <div className={styles.wrapper}>
      <div className={styles.summaryWrap}>
        <h2 className={styles.title}>
          Загалом за{' '}
          {reduxDate === ''
            ? format(date, 'dd/MM/yyyy')
            : format(new Date(reduxDate), 'dd/MM/yyyy')}
        </h2>
        <ul className={styles.list}>
          <li className={styles.item}>
            <p className={styles.text}>Залишилось</p>
            <p className={styles.text}>
              {summary.left ? Math.round(summary.left) : '000'} ккал
            </p>
          </li>
          <li className={styles.item}>
            <p className={styles.text}>Спожито</p>
            <p className={styles.text}>
              {summary.consumed ? Math.round(summary.consumed) : '000'} ккал
            </p>
          </li>
          <li className={styles.item}>
            <p className={styles.text}>Добова норма</p>
            <p className={styles.text}>
              {dailyRate ? Math.round(dailyRate) : '000'} ккал
            </p>
          </li>
          <li className={styles.item}>
            <p className={styles.text}>n% від норми</p>
            <p className={styles.text}>
              {summary.nOfNorm ? Math.round(summary.nOfNorm) : '000'} %
            </p>
          </li>
        </ul>
      </div>

      <div className={styles.foodRecWrap}>
        <h2 className={styles.title}>Не рекомендована їжа</h2>
        <p className={styles.text}>
          {notRecFoodArr.length === 0
            ? 'Ваша діета буде відображатись тут'
            : notRecFoodArr
                .map(product => product.title.ua)
                .join(', ')
                .toLowerCase()}
        </p>
      </div>
    </div>
  );
}
