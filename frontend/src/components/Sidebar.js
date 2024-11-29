import React from 'react';

function Sidebar({ setSelectedOption }) {
  return (
    <div className="sidebar">
      <button onClick={() => setSelectedOption('viewTenantTable')}>View Tenants</button>
      <button onClick={() => setSelectedOption('newTenant')}>Create Tenant</button>
      <button onClick={() => setSelectedOption('tenantInfos')}>Tenant Info</button>
    </div>
  );
}

export default Sidebar;
