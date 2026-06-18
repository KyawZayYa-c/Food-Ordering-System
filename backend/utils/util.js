
export const Msg = (res, msg = "", result = {}, statusCode = 200) => {
    res.status(statusCode).json({
        success: true, 
        message: msg,
        data: result   
    });
};

