const ups = {};
ups.mockFetchRates = function(boxesArr) {
    return new Promise((resolve,reject)=>{
        if(!boxesArr) reject("missing boxes array");
        setTimeout(()=>{
            const mockUpsResponse = [
                {
                    "service":"UPS Ground", 
                    "rate":"52.32", 
                    "prate":"100.23" 
                },
                {
                    "service":"UPS 3 Day Select", 
                    "rate":"32.32", 
                    "prate":"70.23" 
                },
                {
                    "service":"UPS 2nd Day Air", 
                    "rate":"152.32", 
                    "prate":"202.23" 
                },
                {
                    "service":"UPS Next Day Air", 
                    "rate":"252.32", 
                    "prate":"300.23" 
                },
            ]
            resolve(JSON.stringify(mockUpsResponse));
        }, 3000)
    })
};
export default ups;