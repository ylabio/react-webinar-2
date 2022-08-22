import React from "react";

function Prof({ user }) {
  console.log(user);

  return (
    <div>
      {user.profile.name}
      {user.profile.phone}
      {user.email}
    </div>
  );
}

export default React.memo(Prof);
