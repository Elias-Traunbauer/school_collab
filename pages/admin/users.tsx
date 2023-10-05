import { useState } from "react";
import AdminNavbar from "../../components/AdminNavbar";
import User, { UserPermission } from "../../models/User";
import styles from "../../styles/Admin.module.scss";
import userStyles from "../../styles/AdminUsers.module.scss";
import Image from "next/image";
export default function Users() {
    const u1:User = {
        username: "User1",
        firstName: "",
        lastName: "",
        email: "",
        id: 0,
        version: "",
        permissions: UserPermission.Admin,
    };
    const u2:User = {
        username: "User2",
        firstName: "",
        lastName: "",
        email: "",
        id: 0,
        version: "",
        permissions: UserPermission.Default,
    };
    const u3:User = {
        username: "User3",
        firstName: "",
        lastName: "",
        email: "",
        id: 0,
        version: "",
        permissions: UserPermission.Default,
    };

    const mockUsers:User[] = [u1,u2,u3];
    const [users, setUsers] = useState<User[]>(mockUsers);

    function PrintPerms(perm:UserPermission){
        // binary and
        //None = 0,
        //View = 1,
        //Create = 2,
        //Edit = 4,
        //Delete = 8,
        //Admin = 16,
        //Disabled = 32,
        //Moderator = View | Create | Edit | Delete,
        //Default = View | Create
        let str = "";
        if(perm&UserPermission.Admin){
            str+="Admin";
            return str;
        }
        if(perm&UserPermission.Default){
            str+="Default";
            return str;
        }
        if(perm&UserPermission.Disabled){
            str+="Disabled";
        }
        if(perm&UserPermission.Edit){
            str+="Edit";
        }
        if(perm&UserPermission.Create){
            str+="Create";
        }
        if(perm&UserPermission.Delete){
            str+="Delete";
        }
        if(perm&UserPermission.View){
            str+="View";
        }
        if(perm&UserPermission.Moderator){
            str+="Moderator";
        }
        return str;
    }

  return (
    <div className={styles.adminContainer}>
      <AdminNavbar></AdminNavbar>
      <div>
        <h2>Users</h2>
        <div className={userStyles.list}>
          <table>
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Rechte</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
                {
                    users.map((user,index)=>{
                        return(
                            <tr key={index}>
                            <td>
                              <Image
                                width={10}
                                height={10}
                                src={"/person.svg"}
                                alt={"pfb"}
                              ></Image>
                            </td>
                            <td>{user.username}</td>
                            <td>{PrintPerms(user.permissions)}</td>
                            <td>
                              <button>
                                <Image
                                  width={10}
                                  height={10}
                                  src={"/arrow_thick_right.svg"}
                                  alt={"info"}
                                ></Image>
                              </button>
                            </td>
                          </tr>
                        )
                    })
                }
              <tr>
                <td>
                  <Image
                    width={10}
                    height={10}
                    src={"/person.svg"}
                    alt={"pfb"}
                  ></Image>
                </td>
                <td>John Doe</td>
                <td>r,w,x</td>
                <td>
                  <button>
                    <Image
                      width={10}
                      height={10}
                      src={"/arrow_thick_right.svg"}
                      alt={"info"}
                    ></Image>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
