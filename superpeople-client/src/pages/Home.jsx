import axios from "axios";
import React, { useState, useEffect } from "react";
import User from "../components/User";
import './Home.css'

export default function Home() {
  const [users, setUsers] = useState([]);
  const [connections, setConnections] = useState([]);

  const generateAndFetchUsers = async () => {
    try {
      const usersData = await axios.get("http://localhost:5000/testdata");
      console.log(usersData.data);
      setUsers(usersData.data.users);
      setConnections(usersData.data.connections);
    } catch (error) {
      console.error(error);
    }
  };


  /**
   I used those 2 functions to test the generation and the fetch of the connections.
   */

  // const generateConnections = async () => {
  //   try {
  //     await axios.get("http://localhost:5000/testconnection");
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // const getConnections = async () => {
  //   try {
  //     const connections = await axios.get(
  //       "http://localhost:5000/getconnections"
  //     );
  //     console.log(connections.data);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const fetchUsers = async () => {
    try {
      const usersData = await axios.get("http://localhost:5000/");
      console.log(usersData.data);

      setUsers(usersData.data.users);
      setConnections(usersData.data.connections);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <button onClick={generateAndFetchUsers}>Generate Users</button>
      {/* <button onClick={generateConnections}>Generate connection</button>
      <button onClick={getConnections}>get connection</button> */}
      <table>
        <thead>
          <tr>
            <th className="main-heads">Name</th>
            <th className="main-heads">Favorite Color</th>
            <th className="main-heads">Connections</th>
          </tr>
        </thead>
        <tbody>
          {!users.length ? (
            <tr>
              <td>No users yet...</td>
            </tr>
          ) : (
            users.map((user, i) => {
              //getting the user connections
              const userconnections = connections
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
                <User
                  key={i}
                  user={user}
                  connections={userconnections}
                  allConnections={connections} //used to get the connection's connections
                />
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}
