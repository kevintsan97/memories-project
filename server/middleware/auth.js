const jwt = require('jsonwebtoken')

const auth = async (req,res,next) =>{
    try{

        const token = req.headers.authorization.split(" ")[1]
        const isCustomAuth = token.length < 500

        let decodedData 
        
        if(token && isCustomAuth){
            decodedData = jwt.verify(token,"somesecret")

            req.userId = decodedData?.id
            
        }

        else{
            decodedData = jwt.decode(token)

            req.userId = decodedData?.sub
            
        }
        next()
    }
    catch(err){
        console.log("here is err: "+err)
    }
}
module.exports = auth