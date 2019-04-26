import React, { Component } from 'react';

const UsersList = ({users}) => {

    const usersListItems = users.map(user =>
      <li key={user.id} className="list-group-item">
          { user.name}
          {user.typing && (<span className="badge badge-primary">typing...</span>) || null}

      </li>
    )

    return (
      <ul className="list-group">
        {usersListItems}
      </ul>
    );
  }


export default UsersList;
