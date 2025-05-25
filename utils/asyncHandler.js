const asyncHandler = (requestHandler)=>{
      return (req,res,next)=>{
          Promise.resolve(requestHandler(req,res,next)).
          catch((err)=>next(err))  // nodejs ke error wale objec ko error handle krne ko bhj diya...yeh wahi hai jisko apiError me extend kiya hai
       }
}




export {asyncHandler}


/*   try catch wala utility function
const asyncHandler = (fn)=> async (req,res,next)=>{
 try{
    await fn(req,res,next)
 } catch(error){
        res.status(error.code||500).json( it give 
            {
                success:false,
                message: error.message
            }
        )
 }
}
 */