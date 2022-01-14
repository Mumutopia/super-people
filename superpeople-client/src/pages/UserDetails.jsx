import "./UserDetails.css";
import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";

export default function UserDetails() {
  const [user, setUser] = useState();
  const params = useParams();
  const location = useLocation();
  const { connections } = location.state;

  console.log(connections);
  const favColorStyle = {
    backgroundColor: user?.favColor,
    color: "white",
  };

  const fetchUser = async () => {
    try {
      const user = await axios.get("http://localhost:5000/" + params.id);
      setUser(user.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSelect = async (evt) => {
    //change favColor
    try {
      await axios.post("http://localhost:5000/" + params.id, {
        favColor: evt.target.value,
      });
      fetchUser();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="user-wrapper">
      <h1 className="user-title">
        {user?.name} {user?.lastName}{" "}
        <select
          className="select-color"
          onChange={handleSelect}
           style={favColorStyle}
          name="favColor"
        >
          <option selected disabled hidden>
            {user?.favColor}
          </option>

          <option className="option-fav-color-red" value="Red">Red</option>
          <option className="option-fav-color-green" value="Green">Green</option>
          <option className="option-fav-color-blue" value="Blue">Blue</option>
        </select>{" "}
      </h1>
      <table>
        <thead>
          <tr>
            <th className="user-table-head">Name</th>
            <th className="user-table-head">Favorite Color</th>
          </tr>
        </thead>
        <tbody>
          {connections.map((user, i) => {
            return (
              <tr  key={i}>
                <td className="userdetails-table">
                  {user.name} {user.lastName}
                </td>
                <td className="userdetails-table" style={{ color: user.favColor }}>{user.favColor}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
