$(function() {
  $(".chat-group-form__input").on("keyup", function() {
    var input = $(".chat-group-form__input").val();
    
    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json'
    })

    .done(function(data) {
      if (data.length !== 0) {
          data.forEach(function(data){
          //appendProduct(data);
        });
      }
      else {
        //appendErrMsgToHTML("一致するユーザーはいません");
      }
    })
    
    .fail(function() {
      alert('ユーザー検索に失敗しました');
    })
  })
});