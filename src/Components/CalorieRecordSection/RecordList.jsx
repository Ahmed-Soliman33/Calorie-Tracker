import { useContext } from "react";
import CalorieRecord from "./CalorieRecord";
import styles from "./RecordList.module.css";
import {AppContext} from "../../AppContext";
import { Link } from "react-router-dom";

export default function RecordList(props) {
  const { totalCalories } = useContext(AppContext);

  const resultsElement = props.records?.length ? (
    <ul className={styles["record-list"]}>
      {props.records.map((record) => (
        <li className={styles["list-item"]} key={record.id}>
          <Link to={`${record.id}`}>
            <CalorieRecord {...record} />
          </Link>
        </li>
      ))}
    </ul>
  ) : (
    <div className={styles.placeholder}>No records found for this date</div>
  );

  return (
    <>
      {resultsElement}
      <label>Total Calories: {totalCalories}</label>
    </>
  );
}
