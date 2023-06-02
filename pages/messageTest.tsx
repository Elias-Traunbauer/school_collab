import { text } from "stream/consumers";
import Message from "../components/MessageComponent";
import styles from "../styles/Message.module.scss";
export default function MessageTest() {
  return (
    <div className={styles.testContainer}>
      <Message
        answer={{
          author: {
            id: 1,
            name: "thomas",
            color: "blue",
          },
          text: "dsadsa",
        }}
        files={[{ name: "testFile", url: "" },{ name: "testFile", url: "" },{ name: "testFile", url: "" }]}
        author={{ id: 1, name: "s", color: "red" }}
        text="Me Admin"
        displayName={true}
      ></Message>

<Message
        answer={{
          author: {
            id: 2,
            name: "adsa",
            color: "blue",
          },
          text: "dsadsa",
        }}
        files={[{ name: "testFile", url: "" },{ name: "testFile", url: "" },{ name: "testFile", url: "" }]}
        author={{ id: 2, name: "silber", color: "red" }}
        text="Me Admin"
        displayName={true}
      ></Message>
    </div>
  );
}
