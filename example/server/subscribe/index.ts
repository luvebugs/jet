export default ({subscribe, cancel}: any) => {
    const job = subscribe('*/2 * * * * *', function(fireDate: any){
        // console.log('This job was supposed to run at ' + fireDate + ', but actually ran at ' + new Date());
    });
    return job;                                             
}