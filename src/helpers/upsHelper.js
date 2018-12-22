const ups = {};
ups.mockFetchRates = function(boxesArr) {
    return new Promise((resolve,reject)=>{
        if(!boxesArr) reject("missing boxes array");
        setTimeout(()=>{
            resolve('[{"service":"UPS Ground", "rate":"52.32", "prate":"100.23"},{"service":"UPS 2nd Day", "rate":"152.32", "prate":"200.23"}]')
        }, 3000)
    })
};
export default ups;