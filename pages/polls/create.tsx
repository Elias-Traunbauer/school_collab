import React from "react";
import styles from "../../styles/PollCreate.module.scss";
import Wizard from "../../components/Wizard";
import WizardField from "../../models/WizardField";
import { Router, useRouter } from "next/router";
export default function PollCreate() {
  function nothing() {
    console.log("nothing");
  }
  const router = useRouter();
  const mockData = [
    [
      new WizardField("Titel", "text", "", true),
      new WizardField("Beschreibung", "text", "", false),
      new WizardField("Ende", "date", new Date(), false),
    ],
    [
      new WizardField("Option 1", "text", "", true),
      new WizardField("Option 2", "text", "", true),
      new WizardField("Option 3", "text", "", false),
      new WizardField("Option 4", "text", "", false),
    ],
  ];
  function handleCallback(
    result: WizardField[][],
    callbackLoadingText: Function,
    finishLoading: Function
  ) {
    console.log(result);
    callbackLoadingText("loading...");
    setTimeout(() => {
      callbackLoadingText("loading done");
      finishLoading();
      setTimeout(() => {
        //Route to PollList
        router.push("/polls/");
      }, 1000);
    }, 2000);
  }

  function backToList(){
    router.push('/polls/');
  }

  return (
    <>
      <div className={styles.head}>
        <div>
            <button onClick={backToList}></button>
        </div>
      </div>
      <Wizard
        callback={handleCallback}
        title={"Umfrage Erstellen"}
        contentData={mockData}
      ></Wizard>
    </>
  );
}
