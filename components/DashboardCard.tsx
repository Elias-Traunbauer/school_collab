import { useRouter } from "next/router";
import styles from "../styles/DashboardCard.module.scss";
import Image from "next/image";
export default function DashboardCard({
  name,
  path,
  picture,
}: {
  name: string;
  path: string;
  picture: string;
}) {
  const router = useRouter();

  function handleClicked() {
    router.push(path);
  }
  
  return (
    <button onClick={handleClicked} className={styles.container}>
      <Image width={10} height={10} src={picture} alt={name}></Image>
      <p>{name}</p>
    </button>
  );
}
