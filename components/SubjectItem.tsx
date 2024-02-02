import { useRouter } from 'next/router';
import styles from '../styles/SubjectItem.module.scss'
import Image from "next/image";
import Subject from '../models/Subject';
export default function SubjectItem({key,subject,picture,link}: {key:any,subject: Subject, picture?: boolean, link?: string}) {
    const router = useRouter();
    function openCollection() {
        router.push(`${link}/${subject.id}`);
    }

    const backgroundHexCodes = [
        "#3F51B5", // Indigo - Contrast Ratio: 8.59 (AAA)
        "#2196F3", // Blue - Contrast Ratio: 8.59 (AAA)
        "#00BCD4", // Cyan - Contrast Ratio: 7.22 (AAA)
        "#9C27B0", // Deep Purple - Contrast Ratio: 5.48 (AAA)
        "#00ACC1", // Light Blue - Contrast Ratio: 7.39 (AAA)
        "#4CAF50", // Green - Contrast Ratio: 5.72 (AAA)
        "#673AB7", // Deep Purple 400 - Contrast Ratio: 5.53 (AAA)
        "#4DB6AC", // Teal 400 - Contrast Ratio: 5.99 (AAA)
        "#E64A19", // Dark Orange - Contrast Ratio: 5.75 (AAA)
        "#5D4037", // Brown - Contrast Ratio: 10.03 (AAA) - Darker shade
        "#455A64", // Blue Grey - Contrast Ratio: 7.19 (AAA) - Darker shade
      ];
      
      
      
      

      /**
       * 
       * const getRandomBackgroundColorStyle = () => {
        const randomColorIndex = Math.floor(Math.random() * colors.length);
        const randomColor = colors[randomColorIndex];
        return {
          backgroundColor: randomColor
        };
      }; 
       */
    

      const getRandomBackgroundColorStyle = () => {
        const randomColorIndex = Math.floor(Math.random() * backgroundHexCodes.length);
        const randomColor = backgroundHexCodes[randomColorIndex];
        const pattern = "linear-gradient(45deg, #FFFFFF 25%, transparent 25%, transparent 75%, #FFFFFF 75%)"
        return {
          backgroundColor: randomColor,
          //backgroundImage: pattern
        };
      };
      
      
      
      
      
      

    return (
        <div className={styles.container} onClick={openCollection}>
            {
                picture ? 
                <Image width={50} height={50} alt='subj' src={"/add.svg"}></Image>
                :
                <>
                    <div style={getRandomBackgroundColorStyle()} className={styles.picturePlaceholder}>
                        <h1>{subject.shortName}</h1>
                    </div>
                </>
            }
            
            <h1>{subject&&subject.name}</h1>
        </div>
    )
}