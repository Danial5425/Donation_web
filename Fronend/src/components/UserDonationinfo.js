import React from "react";
import { useEffect, useState } from "react";

const UserDonationinfo = () => {
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    });
  }, []);
  return (
    <div>
      <h1>UserDonationinfo 143</h1>
      <h1>
        {latitude} location {longitude}
      </h1>
    </div>
  );
};

export default UserDonationinfo;
