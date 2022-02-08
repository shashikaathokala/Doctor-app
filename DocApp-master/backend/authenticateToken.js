const jwt = require("jsonwebtoken");
const JWT_SECRET = "c7b6279efb87ef30afcc4e403e2ab580eb02f2f15e51ee0259b5114c9b6c35d0f93222085d0f32df0c6c498867b02c137ecd4921f2434b87a9d3c7f36077e0d1"

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    if (typeof authHeader !== "undefined") {
        const token = authHeader.split(" ")[1];

        const t = token;
        console.log("tokennnnn:" + t)
        req.token = token;
        try {
            console.log(req.token, JWT_SECRET)
            if(jwt.verify(req.token, JWT_SECRET)){
                console.log({ status: "success", data: "Verified" })
                // res.json({ status: "success", data: "Verified" });
        
                next();
            }
        } catch (error) {
            res.json({ status: "error", error: "Incorrect Token" })
            console.log('Sorry you are not allowed to Enter this particular Web Page')
            // return res.redirect('http://localhost:3000/');
        }
       


    } else {
        return res.sendStatus(403);

    }

}


module.exports = authenticateToken;