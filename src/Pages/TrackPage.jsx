import { useEffect, useState } from "react";
import Modal from "react-modal";
import styles from "./TrackPage.module.css";
import ListingSection from "../Components/CalorieRecordSection/ListingSection";
import CaloriesRecordEdit from "../Components/Edit/CaloriesRecordEdit";

const LOCAL_STORAGE_KEY = "calorieRecords";

export function TrackPage() {
  const [records, setRecords] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const save = () => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(records));
  };
  const loadRecords = () => {
    const storageRecords = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storageRecords != null && storageRecords !== "undefined") {
      setRecords(
        JSON.parse(storageRecords).map((record) => ({
          ...record,
          date: new Date(record.date),
          calories: Number(record.calories),
        }))
      );
    } else {
      setRecords([]);
    }
  };

  useEffect(() => {
    if (!records) {
      loadRecords();
    } else {
      save();
    }
  }, [records]);

  const modalStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      border: "none",
      padding: "0px",
      borderRadius: "var(--theme-border-radius-smooth)",
    },
    overlay: {
      background: "rgba(0,0,0,.5)",
    },
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const formSubmitHandler = (record) => {
    const formattedRecord = {
      ...record,
      date: record.date,
      id: crypto.randomUUID(),
    };
    setRecords((prevRecords) => [formattedRecord, ...prevRecords]);

    handleCloseModal();
  };

  return (
    <div >
      <h1 className={styles.title}>Calorie Tracker</h1>
        <Modal
          isOpen={isModalOpen}
          onRequestClose={handleCloseModal}
          contentLabel="Modal"
          style={modalStyles}
        >
          <CaloriesRecordEdit
            onFormSubmit={formSubmitHandler}
            onCancel={handleCloseModal}
          />
        </Modal>

        {records && <ListingSection allRecords={records} />}
      <button className={styles["open-modal-button"]} onClick={handleOpenModal}>
        Track food
      </button>
    </div>
  );
}

