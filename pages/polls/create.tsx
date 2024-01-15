import React from "react";
import styles from "../../styles/PollCreate.module.scss";
import Wizard from "../../components/Wizard";
import WizardField from "../../models/WizardField";
import { Router, useRouter } from "next/router";
import { createPoll } from "../../services/Poll.service";
import Poll from "../../models/Poll";
import PollPostDTO from "../../models/PollPostDTO";
import WizardResult from "../../models/WizardResult";
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
    result: WizardResult[],
    callbackLoadingText: Function,
    finishLoading: Function
  ) {
    console.log(result);
    callbackLoadingText("loading...");

    const tmpPoll:PollPostDTO ={
      dateCreated: new Date(),
      description: result[1].value as string,
      due: result[0].value as Date,
      isAnonymous: false,
      title: result[0].value as string,
      pollOptions: result[2].value as string[],
    }

    createPoll(tmpPoll)

    setTimeout(() => {
      callbackLoadingText("done");
      finishLoading();
      setTimeout(() => {
        //Route to PollList
        router.push("/polls");
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
      returnPath="/polls"
        callback={handleCallback}
        title={"Umfrage Erstellen"}
        contentData={mockData}
      ></Wizard>
      <div className={styles.bottom}></div>
    </>
  );
}
