import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const REDIRECT_COUNT = 10;
const COUNT_DOWN = 1000;
const HOME_LINK = "/";

export function ErrorPage() {
  const [counter, setCounter] = useState(REDIRECT_COUNT);
  const navigateToHome = useNavigate();
  const intervalRef = useRef();

  useEffect(() => {
    if (counter === 0) {
      clearInterval(intervalRef);
      navigateToHome(HOME_LINK);
    }
  }, [counter]);

  useEffect(() => {
    const intervalRef = setInterval(() => {
      setCounter((prevCount) => prevCount - 1);
    }, COUNT_DOWN);
    return () => {
      clearInterval(intervalRef);
    };
  }, []);
  return (
    <>
      <h1>Something went wrong..</h1>
      <p>Redirecting to Home Page in {counter}</p>
      <p>
        Or Click <Link to={HOME_LINK}>Home Page</Link> to go back
      </p>
    </>
  );
}
