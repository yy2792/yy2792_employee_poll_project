import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";

function Leaderboard(props) {
  const { users, sortedUsers, userAuth } = props;
  const navigate = useNavigate();

  useEffect(() => {
    !userAuth && navigate("/login");
  }, [userAuth, navigate]);
  return (
    users && (
      <div className="leaderboard">
        {
          <table id="leaderbordResults">
            <thead>
              <tr>
                <td id="Users">Users</td>
                <td id="Answered">Answered</td>
                <td id="Created">Created</td>
              </tr>
            </thead>
            <tbody>
              {sortedUsers.map((uid) => (
                <tr key={uid}>
                  <td>{users[uid].name}</td>
                  <td>{Object.keys(users[uid].answers).length}</td>
                  <td>{Object.keys(users[uid].questions).length}</td>
                </tr>
              ))}
            </tbody>
          </table>
        }
      </div>
    )
  );
}

const mapStateToProps = ({ users, userAuth }) => ({
  sortedUsers: Object.keys(users).sort((a, b) => {
    const _b =
      Object.keys(users[b].answers).length +
      Object.keys(users[b].questions).length;
    const _a =
      Object.keys(users[a].answers).length +
      Object.keys(users[a].questions).length;
    return _b - _a;
  }),
  users: users,
  userAuth,
});

export default connect(mapStateToProps)(Leaderboard);
