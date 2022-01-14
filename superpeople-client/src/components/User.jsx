import "./User.css"
import React from "react";
import { Link } from "react-router-dom";

export default function User({ user, connections, allConnections }) {
  const favColorStyle = {
    color: user.favColor,
  };

  return (
    <tr>
      <td className="main-table-style name-cell">
        <Link className="link-style"
          to={"/user/" + user._id}
          state={{ connections: connections }} //insert the connections as a prop for the component userDetails
        >
          {user.name} {user.lastName},
        </Link>
      </td>
      <td className="main-table-style" style={favColorStyle}>{user.favColor}</td>
      <td className="main-table-style users-connections">
      
        {connections.map((user, i) => {//getting the connection's connections to pass as a prop in the link
          const userconnections = allConnections 
            .filter((connection) => {
              return (
                connection.userA._id === user._id ||
                connection.userB._id === user._id
              );
            })
            .map((filteredConnection) => {
              return filteredConnection.userA._id === user._id
                ? filteredConnection.userB
                : filteredConnection.userA;
            });

          return (
            <Link className="link-style"
             key={i}
              to={"/user/" + user._id}
              state={{ connections: userconnections }} //insert the connections as a prop for the component userDetails
            >
              {user.name} {user.lastName},
            </Link>
          );
        })}
      </td>
    </tr>
  );
}
