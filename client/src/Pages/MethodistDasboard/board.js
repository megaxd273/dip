import React, { useEffect, useState } from 'react';
import AddendumTab from './tabs/Addendum';

import Contracts from './tabs/Contracts';
import StatTab from './tabs/stat';

const MethodistDashboard = ({ selectedTab }) => {
  return (
    <div >
      {selectedTab === "def" && (
        <Contracts />
      )}
      {selectedTab === "loads" && (
        <AddendumTab />
      )}
      {selectedTab === "stat" && (
        <StatTab />
      )}
    </div>
  );
};

export default MethodistDashboard;
