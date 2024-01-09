import FileUpload from "../../components/FileUpload";
import {postFiles} from "../../services/File.service";
export default function Test() {

    function handleAcceptedFiles(files) {
        console.log(files);
    }
    function handleFilesUpdated(files) {
        const tmpList:File[] = files;
        postFiles(tmpList).then((res) => {
            console.log(res);
        }).catch((err) => {
            console.error(err);
        });
    }

    return (
        <FileUpload handleFilesUpdated={handleFilesUpdated} handleAcceptedFiles={handleAcceptedFiles} title={"test"}></FileUpload>
    )
}