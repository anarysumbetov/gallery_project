import jwt from "jsonwebtoken";

const secret = 'test';

const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const isCustomAuth = token.length < 500;
        
        let decodedData;

        if (token && isCustomAuth) {
            decodedData = jwt.verify(token, secret);

            req.userId = decodedData === null || decodedData === undefined ? undefined : decodedData.id;
            // it is the same like decodedData?.id
        } else {
            decodedData = jwt.decode(token);

            req.userId = decodedData === null || decodedData === undefined ? undefined : decodedData.sub;
            // it is the same like decodedData?.sub
        }

        next();
    } catch (error) {
        console.log("auth server middleware error:", error);
    }
};

export default auth;