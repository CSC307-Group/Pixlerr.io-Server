/* 
    Initializes pixelList to all #fff values.
    If pixelList has already been initialized, 
    all saved colors will be reset to #fff.

    To run this script, run the MongoDB Shell in /expressjs-backend
    and use the following command:
    load("scripts/initializePixelDB.js")
*/

const HEIGHT = 20;
const WIDTH = 40;
db = connect( "mongodb://localhost:27017/users" );
db.pixelList.deleteMany({}); // Clear out current contents
for (let x = 0; x < WIDTH; x++) {
    for (let y = 0; y < HEIGHT; y++) {
        let pixel = {
            color: "#fff",
            x: x,
            y: y
        };
        db.pixelList.insert(pixel);
    }
}
		