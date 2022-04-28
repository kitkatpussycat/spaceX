import React from 'react';

const LaunchDetail = ({ launch }) => {
  return (
    <div className='border-2 border-black'>
      <div>
        <span>Mission Name:</span> {launch.mission_name}
      </div>
      <div>
        <span>Upcoming:</span> {launch.upcoming ? 'true' : 'false'}
      </div>
      <div>
        <span>Launch Year:</span> {launch.launch_year}
      </div>
    </div>
  );
};

export default LaunchDetail;
