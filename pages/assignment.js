import { useState } from 'react'
import styles from '../styles/assignment.module.css'
import { useEffect } from 'react';

export default function Assignment(assignment){
    return(
        <div className={styles.container}>
                <div class="container">
                 <div class="description"></div>
                    <div class="title"></div>
                    <div class="upload"></div>
                    <div class="Author"></div>
                    <div class="button"></div>
                    <div class="Time"></div>
                    <div class="Subject"></div>
                    </div>
        </div>
        
    );
}