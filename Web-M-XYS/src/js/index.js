$(function () {
    $.ajax({
        type:'get',
        url:'http://localhost:8081/list_user',
        dataType:'json',
        xhrFields: {
            withCredentials: true
        },
        success:function(data){
            console.log("data:",data);
        },
        error:function(err){
            console.error(err)
        }
    })
});

/* var dom = document.getElementsByTagName('*')
console.log('dom=',dom) */