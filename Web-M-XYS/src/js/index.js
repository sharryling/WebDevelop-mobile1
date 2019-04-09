$(function () {
    $.ajax({
        type:'get',
        url:'http://127.0.0.1:3001/',
        dataType:'json',
        success:function(data){
            console.log("data:",data);
        },
        error:function(err){
            console.error(err)
        }
    })
});