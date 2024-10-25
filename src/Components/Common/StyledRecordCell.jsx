import styles from "./StyledRecordCell.module.css"

export default function StyledRecordCell(props) {
  return <div className={styles["styled-record-cell"]}>{props.children}</div>;
}
