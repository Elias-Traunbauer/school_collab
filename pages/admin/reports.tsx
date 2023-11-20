import AdminNavbar from '../../components/AdminNavbar'
import styles from '../../styles/Admin.module.scss'
import reportsyles from '../../styles/AdminReports.module.scss'
import Report from '../../models/Report'
import ReportComponent from '../../components/ReportComponent'
import { useState } from 'react'
export default function Reports() {
    const r1: Report = {
        createdAt: new Date(),
        createdById: 1,
        reason: '',
        type: '',
        wasChecked: false,
        id: 1,
        version: ''
    }
    const r2: Report = {
        createdAt: new Date(),
        createdById: 2,
        reason: '',
        type: '',
        wasChecked: false,
        id: 2,
        version: ''
    }
    const r3: Report = {
        createdAt: new Date(),
        createdById: 3,
        reason: '',
        type: '',
        wasChecked: false,
        id: 3,
        version: ''
    }
    const mockReports: Report[] = [r1,r2,r3]
    const allReports: Report[] = mockReports
    const [reports,setReports] = useState<Report[]>(allReports)

    function deleteReport(id:number){
        const newReports = reports.filter((report)=>{
            return report.id != id
        })
        setReports(newReports)
    }

    return(
        <div className={styles.adminContainer}>
            <AdminNavbar></AdminNavbar>
            <div>
                <h2>Reports</h2>
                <div className={reportsyles.list}>
                    {
                        reports.map((report,index)=>{
                            return(
                                <ReportComponent key={report.id} report={report}callback={deleteReport}></ReportComponent>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}