const userServices = require("./models/user-services");

const user = {username: "Reed", password: "Testingg"};
//user-services tests
test("test getUsers all users", async () => {
    result = await userServices.getUsers();
    expect(result).toEqual([]);
});

test("add user with valid password", async () => {
    result = await userServices.addUser(user);
    expect((result.username === user.username) && (result.password === user.password)).toBeTruthy();
});

test("add user with invalid password" , async () => {
    result = await userServices.addUser({username:"test", password:"small"});
    expect(result).toBeFalsy();
});

test("add user with null user", async () => {
    result = await userServices.addUser(null);
    expect(result).toBeFalsy();
});

test("test getUsers find user by Username", async () => {
    result = await userServices.getUsers(user.username);
    expect(result[0].username).toBe(user.username);
});

test("test getUsers find user by Username and Password", async () => {
    result = await userServices.getUsers(user.username, user.password);
    expect((result[0].username === user.username) && (result[0].password === user.password)).toBeTruthy();
});

test("remove null user", async () => {
    result = await userServices.removeUser("asdfasdfasdfasdf");
    expect(result).toBeFalsy();
})

test("remove user", async () => {
    getUser = await userServices.getUsers(user.username, user.password);
    result = await userServices.removeUser(getUser[0]._id);
    expect(result._id).toEqual(getUser[0]._id);
});

