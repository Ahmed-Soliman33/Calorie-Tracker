import { useCallback, useContext, useEffect, useMemo, useReducer, useRef } from "react";
import styles from "./CaloriesRecordEdit.module.css";
import { AppContext } from "../../AppContext";
import FormInput from "../Common/FormInput";
import Button from "../Common/Button";


const DEFAULT_REACORD = {
  meal: false,
  content: false,
  calories: true,
};

const formReducer = (state, action) => {
  const { key, value, auxValue } = action;
  let valid;
  switch (key) {
    case "content":
      valid =
        (value === "sport" && auxValue < 0) ||
        (value !== "sport" && auxValue >= 0);
      return {
        ...state,
        content: !!value,
        calories: valid,
      };
    case "calories":
      valid =
        (auxValue === "sport" && value < 0) ||
        (auxValue !== "sport" && value >= 0);
      return {
        ...state,
        calories: valid,
      };
    default:
      return {
        ...state,
        meal: !!value,
      };
  }
};

export default function CaloriesRecordEdit(props) {

  const {
    currentDate,
    isValidDate,
    currentDateStr,
    setCurrentDate,
    totalCalories,
  } = useContext(AppContext);
  const [formState, dispatchFn] = useReducer(formReducer, DEFAULT_REACORD);
  const contentRef = useRef();
  const caloriesRef = useRef();
  const mealRef = useRef();

  const {
    content:  isContentValid ,
    calories: isCaloriesValid ,
  } = formState;

  const isFormValid = useMemo(() => {
    return isValidDate && isContentValid && isCaloriesValid;
  }, [isValidDate, isContentValid, isCaloriesValid]);
  
  useEffect(() => {
    if (!isContentValid) {
      contentRef.current.focus();
    }
  }, [ isContentValid ]);
 
  const onDateChangeHandler = (e) => {
    setCurrentDate(e.target.value);
  };
  const onMealBlurHandler = (e) => {
    dispatchFn({
      key: "meal",
      value: e.target.value,
    });
  };
  const onContentBlurHandler = (e) => {
    dispatchFn({
      key: "content",
      value: e.target.value,
      auxValue: Number(caloriesRef.current.value),
    });
  };
  const onCaloriesBlurHandler = (e) => {
    dispatchFn({
      key: "calories",
      value: e.target.value,
      auxValue: contentRef.current.value,
    });
  };
  const onSubmitHandler = (event) => {
    event.preventDefault();
    props.onFormSubmit({
      date: currentDate,
      meal: mealRef.current.value,
      content: contentRef.current.value,
      calories: Number(caloriesRef.current.value),
    });
  };

  const onCancelHandler = useCallback(() => {
    if (isFormValid) {
      props.onCancel();
    }
  }, [isFormValid]);
  return (
    <form className={styles.form} onSubmit={onSubmitHandler}>
      <p className={styles.warning}>You spent {totalCalories} calories</p>
      <FormInput
        type="date"
        label="Date"
        id="date"
        onChange={onDateChangeHandler}
        isValid={isValidDate}
        value={currentDateStr}
      />
      <FormInput
        type="select"
        label="Meal"
        id="meal"
        onBlur={onMealBlurHandler}
        ref={mealRef}
        isValid
      >
        <option value="Breakfast">Breakfast</option>
        <option value="Lunch">Lunch</option>
        <option value="Dinner">Dinner</option>
        <option value="Snack">Snack</option>
      </FormInput>
      <FormInput
        type="text"
        label="Content"
        id="content"
        onBlur={onContentBlurHandler}
        isValid={isContentValid}
        ref={contentRef}
      />
      <FormInput
        type="number"
        label="Calories"
        id="calories"
        onBlur={onCaloriesBlurHandler}
        isValid={isCaloriesValid}
        ref={caloriesRef}
      />
      <div className={styles.footer}>
        <Button variant="primary" disabled={!isFormValid}>
          Add Record
        </Button>
        <Button
          variant="secondary"
          type="button"
          onClick={onCancelHandler}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
