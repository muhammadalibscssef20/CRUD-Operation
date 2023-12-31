import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function UsersList() {
  const [users, setUsers] = useState([]);

  const getUsers = () => {
    axios
      .get("http://localhost:4000/users")
      .then((res) => {
        console.log(res.data);
        setUsers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getUsers();
  }, []);

  // this function is to delete user
  const deleteUser = (id) => {
    axios
      .delete("http://localhost:4000/users/" + id)
      .then((res) => {
        console.log("deleted: ", res.data);
        getUsers();
      })
      .catch((err) => {
        console.log("err: ", err);
      });
  };

  return (
    <>
      <h2>UsersList</h2>
      {users.map((user) => {
        return (
          <div key={user._id}>
            <h5>{user.name}</h5>
            <p>{user.location}</p>
            <p>{user.email}</p>
            <img
              src={`http://localhost:4000/images/${user?.image?.filename}`}
              alt=""
              width={200}
              srcset=""
            />
            <Link to={`/user/edit/${user._id}`}>
              <button>Edit</button>
            </Link>
            <button onClick={() => deleteUser(user._id)}>delete</button>
          </div>
        );
      })}
    </>
  );
}

export default UsersList;
