module.exports = function (req, res, next){
  if(!req.headers.authorization){
    res.status(401).send("Authorization Required");
  }

  let [username, password] =
    new Buffer.from(req.headers.authorization.split(" ").pop(), "base64")
    .toString("ascii").split(":")

  if(username !== process.env.API_USERNAME ||
    password !== process.env.API_PASSWORD
  ){
    res.status(403).send("Access Denied (incorrect credentials)");
  }
  else{
    next()
  }
}
