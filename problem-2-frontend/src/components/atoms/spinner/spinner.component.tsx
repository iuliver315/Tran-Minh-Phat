import { BiLoaderAlt } from "react-icons/bi";
import styles from "./spinner.module.css";
const Spinner = () => {
  return (
    <div className="w-ful h-full">
      <BiLoaderAlt className={styles.loader} />
    </div>
  );
};
export default Spinner;
