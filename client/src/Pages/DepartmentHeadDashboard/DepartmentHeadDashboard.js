import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { context } from "../..";
import MethodistTab from "./tabs/MethodistsTab";
import ProfileTab from "./tabs/ProfileTab";
import TeacherTab from "./tabs/TeachersTab";

const DepHeadDashboard = observer(({ selectedTab }) => {
  const {store} = useContext(context);
  store.getFaculty();
    return (
      <div className="admin-dashboard">
        {selectedTab === "def" && (
          <ProfileTab/>
          )}
          {selectedTab ==="methodists" && (
            <MethodistTab/>
          )}
        {selectedTab ==="teachers" && (
          <TeacherTab/>
        )}
      </div>
    );
  });
  
  export default DepHeadDashboard;