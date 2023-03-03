import Link from 'next/link'
import Wizard from '../components/wizard'
import Wizzard from '../components/wizard'

export default function WzTest() {
    function callback(data){
        console.log(data);
    };
    const testData = [{name:true,lastname:true},{email:false}];

    return(
        <Wizard contentData={testData} title='Test' callBack={(data)=>callback(data)}></Wizard>
    );
    
}