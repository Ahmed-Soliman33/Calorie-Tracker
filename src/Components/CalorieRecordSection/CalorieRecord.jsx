import styles from "./CalorieRecord.module.css";
import CalorieRecordDate from "./CalorieRecordDate";
import StyledRecordCell from "../Common/StyledRecordCell";
import { useContext, useEffect } from "react";
import {AppContext} from "../../AppContext";

function CalorieRecord(props) {
  const { setTotalCalories: addCalories } = useContext(AppContext);

  useEffect(() => {
    addCalories((prevTotal) => prevTotal + props.calories);
    return () => {
      addCalories((prevTotal) => prevTotal - props.calories);
    };
  }, []);

  return (
    <ul className={styles.record}>
      <li>
        <CalorieRecordDate date={props.date} />
      </li>

      <li>{props.meal}</li>

      <li>{props.content}</li>
      <li className={styles["record-calories"]}>
        <StyledRecordCell>{props.calories}</StyledRecordCell>
      </li>
    </ul>
  );
}

export default CalorieRecord;
