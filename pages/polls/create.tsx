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
      new WizardField("Options", "list", {min:2,max:8,value:["Ja","Nein"]}, true),
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
        router.push("/poll/list");
      }, 1000);
    }, 2000);
  }

  function backToList(){
    router.push('/poll/list');
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
      <div className={styles.bottom}>

      </div>
    </>
  );
}
