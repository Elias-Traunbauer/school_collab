export default function Loading({center}: {center?:boolean}){
    return (
        <div className={center&&"loadingContainerCenter"}>
            <div className="loading"></div>
        </div>
    )
}