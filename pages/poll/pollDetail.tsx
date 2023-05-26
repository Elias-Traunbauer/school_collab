import React from 'react';
import styles from '../../styles/PollDetail.module.scss';
import Countdown from '../../components/Countdown';
import MarkdownEditor from '../../components/MarkdownEditor';

export default function PollDetail(){
    const mockPoll = {
        votingId: 1,
        title: 'Poll Title',
        description: 'Poll Description',
        end: new Date('2023-07-20T00:00:00'),
        votingOptions: ["Yes","No"],
        user:'Yannie'
    }

    const mockUser = {
        name: 'Yannie',
    }

    return(
        <div className={styles.container}>
            <div>
                <Countdown date={mockPoll.end}></Countdown>
            </div>
            <div>
                <h1>{mockPoll.title}</h1>
            </div>
            <div>
                <div>
                    <MarkdownEditor containerWidth={100} isEditable={mockUser.name == mockPoll.user}></MarkdownEditor>
                </div>
            </div>
            <div>
                <p>Chart</p>
            </div>
            <div>
                {
                    mockPoll.votingOptions.map((option, index) => {
                        return(
                            <div key={index}>
                                <p>{option}</p>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}