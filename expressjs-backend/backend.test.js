const userServices = require("./models/user-services");
const pixelServices = require("./models/pixel-services");
jest.setTimeout(45000);

const user = {username: "Reed", password: "Testingg", pixelTime: "testTime", user_email: "rmarohn@calpoly.edu"};
//user-services tests
test("test getUsers all users", async () => {
    result = await userServices.getUsers();
    expect(result.length >= 0).toBeTruthy();
});

test("add user with valid password", async () => {
    result = await userServices.addUser(user);
    expect((result.username === user.username) && (result.password === user.password) && (result.user_email === user.user_email) && (result.pixelTime === user.pixelTime)).toBeTruthy();
});

test("add user with invalid password" , async () => {
    result = await userServices.addUser({username:"test", password:"small", pixelTime: "testingtest", user_email: "tiny@snailmail.com"});
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

test("test getUsers find user by Username, Password, and Email", async () => {
    result = await userServices.getUsers(user.username, user.password, user.user_email);
    expect((result[0].username === user.username) && (result[0].password === user.password) && (result[0].user_email === user.user_email)).toBeTruthy();
});

test("test updatePixelTime with valid id", async () => {
    getUser = await userServices.getUsers(user.username, user.password);
    userID = getUser[0]._id;
    result = await userServices.updatePixelTime(userID);
    expect(result).toBeTruthy();
});

test("test updatePixelTime with invalid id", async () => {
    result = await userServices.updatePixelTime(null);
    expect(result).toBeFalsy();
});

test("remove null user", async () => {
    result = await userServices.removeUser("asdfasdfasdfasdf");
    expect(result).toBeFalsy();
});

test("remove user", async () => {
    getUser = await userServices.getUsers(user.username, user.password, user.user_email);
    result = await userServices.removeUser(getUser[0]._id);
    expect(result._id).toEqual(getUser[0]._id);
});

//pixel-services tests

test("test clearCanvas", async () => {
    result = await pixelServices.clearCanvas();
    expect(result).toBeTruthy();
});

test("test newCanvas with size 0", async () => {
    result = await pixelServices.newCanvas(0,0);
    expect(result).toBeFalsy();
});

test("test newCanvas with valid size", async () => {
    result = await pixelServices.newCanvas(4, 2);
    expect(result).toBeTruthy();
});

test("test getPixels", async () => {
    result = await pixelServices.getPixels();
    expect(result.length >= 1).toBeTruthy();
});

test("test updatePixel with invalid id", async () => {
    result = await pixelServices.updatePixel("testingstuff", "red");
    expect(result).toBeFalsy();
});

test("test updatePixel with valid id", async () => {
   pixelList = await pixelServices.getPixels();
   const id = pixelList[0]._id;
   result = await pixelServices.updatePixel(id, "#123456", "notrealid");
   expect(result).toBeTruthy(); 
});

test("test getPixelsById", async () => {
    result = await pixelServices.getPixelsById("notrealid");
    expect(result[0].userId).toBe("notrealid");
});
