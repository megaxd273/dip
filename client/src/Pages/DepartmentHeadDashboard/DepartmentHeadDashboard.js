import MethodistTab from "./tabs/MethodistsTab";
import ProfileTab from "./tabs/ProfileTab";
import TeacherTab from "./tabs/TeachersTab";

const DepHeadDashboard = ({ selectedTab }) => {
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
  };
  
  export default DepHeadDashboard;