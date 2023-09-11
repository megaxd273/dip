import LoadTab from "./tabs/LoadsTab";
import ProfileTab from "./tabs/ProfileTab";
import Stattab from "./tabs/StatTab";

const TeacherDashboard = ({ selectedTab }) => {
    return (
      <div className="admin-dashboard">
        {selectedTab === "def" && (
          <ProfileTab/>
          )}
          {selectedTab ==="loads" && (
            <LoadTab/>
          )}
        {selectedTab ==="overall" && (
          <Stattab/>
        )}
      </div>
    );
  };
  
  export default TeacherDashboard;