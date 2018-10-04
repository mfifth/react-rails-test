export const loginUser = data => {
  let user = {
    auth: {
      email: data.get("email"),
      password: data.get("password")
    }
  };
  return $.post("/user_token", user)
    .success(response => {
      response;
    })
    .error(error => {
      console.log(error);
    });
};

export const createUser = data => {
  let user = {
    user: {
      email: data.get("email"),
      password: data.get("password"),
      password_confirmation: data.get("password_confirmation")
    }
  };
  return $.post("/users", user)
    .success(response => {
      response;
    })
    .error(error => {
      console.log(error);
    });
};

export const setupAuthToken = token => {
  $.ajaxSetup({
    headers: { Authorization: "Bearer " + token }
  });
};
