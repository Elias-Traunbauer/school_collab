import { useState } from "react";
import FileUpload from "../../components/FileUpload";
import {postFiles} from "../../services/File.service";
import styles from "../../styles/Test.module.scss";
export default function Test() {

    const [loading, setLoading] = useState(false);

    function handleAcceptedFiles(files) {
        console.log(files);
    }
    function handleFilesUpdated(files) {
        const tmpList:File[] = files;
        setLoading(true);
        postFiles(tmpList).then((res) => {
                setLoading(false);
            console.log(res);
        }).catch((err) => {
            console.error(err);
            setLoading(false);
        });
    }

    return (
        <FileUpload loading={loading} handleFilesUpdated={handleFilesUpdated} handleAcceptedFiles={handleAcceptedFiles} title={"test"}></FileUpload>
     )
}