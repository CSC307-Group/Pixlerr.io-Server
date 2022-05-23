const userServices = require("./user-services");

//user-services tests
test("add user with valid password", () => {
    user = {username: "Reed", password: "Testingg"};
    userServices.addUser(user);
    fetchedUser = userServices.getUsers(user["username"], user["password"]);
    expect(fetchedUser).toBe(user);
    userServices.removeUser(user);
});

// test("remove user", () => {
//     user = {username: "Reed", password: "Testingg"};
//     userServices.removeUser()
// })