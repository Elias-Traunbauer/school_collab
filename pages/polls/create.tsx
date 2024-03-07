import React from "react";
import styles from "../../styles/PollCreate.module.scss";
import Wizard from "../../components/Wizard";
import WizardField from "../../models/WizardField";
import { Router, useRouter } from "next/router";
import { createPoll } from "../../services/Poll.service";
import Poll from "../../models/Poll";
import PollPostDTO from "../../models/PollPostDTO";
import WizardResult from "../../models/WizardResult";
import PollOption from "../../models/PollOption";
import PollOptionPostDTO from "../../models/PollOptionPostDTO";
export default function PollCreate() {
  function nothing() {
    console.log("nothing");
  }
  const router = useRouter();
  const mockData = [
    [
      new WizardField("Title", "text", "", true),
      new WizardField("Description", "text", "", false),
      new WizardField("End", "date", new Date(), false),
    ],
    [
      new WizardField("Options", "list", {min:2,max:8,value:["Yes","No"]}, true),
    ],
  ];

  async function handleCallback(
    result: WizardResult[],
    callbackLoadingText: Function,
    finishLoading: Function
  ) {
    console.log("RES:",result);
    callbackLoadingText("loading...");
    const tmpPollOptions: PollOptionPostDTO[] = [];

    for (const iterator of result[3].value as string[]) {
      const tmpPollOption: PollOptionPostDTO = {
        name: iterator,
      }
      tmpPollOptions.push(tmpPollOption);
    }

    const tmpPoll:PollPostDTO ={
      description: result[1].value as string,
      due: result[2].value as Date,
      isAnonymous: false,
      title: result[0].value as string,
      pollOptions: tmpPollOptions,
      creatorUserId: 0
    }

    await createPoll(tmpPoll)

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
        title={"Create poll"}
        contentData={mockData}
      ></Wizard>
      <div className={styles.bottom}></div>
    </>
  );
}
