import { Link, useParams } from "react-router-dom";
import styles from "./DetailPage.module.css";
import { useRef } from "react";

export function DetailPage() {
  const params = useParams();
  const detail = useRef();

  const array = JSON.parse(localStorage.getItem("calorieRecords"));
  detail.current = array.find((record) => {
    return record.id === params.recordId;
  });

  return (
    <>
      <div className={styles.container}>
        <div className={styles.item}>
          <p>Date:</p>
          <p>{detail.current?.date?.toLocaleString().split("T")[0]}</p>
        </div>
        <div className={styles.item}>
          <p>Meal:</p>
          <p>{detail.current?.meal}</p>
        </div>
        <div className={styles.item}>
          <p>Content:</p>
          <p>{detail.current?.content}</p>
        </div>
        <div className={styles.item}>
          <p>Calories:</p>
          <p>{detail.current?.calories}</p>
        </div>
      </div>
      <Link to=".." relative="path">
        Back to List page
      </Link>
    </>
  );
}
