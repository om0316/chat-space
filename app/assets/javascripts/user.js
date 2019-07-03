$(document).on('turbolinks:load', function() {

  var search_list = $("#user-search-result");
  var member_list = $("#member_search_result");

  function appendUser(user) {
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${user.name}</p>
                  <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id=${user.id} data-user-name=${user.name}>追加</div>
                </div>`
    search_list.append(html);
    return html;
  }

  function appendMember(name, id) {
    var html = `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-8'>
                  <input name='group[user_ids][]' type='hidden' class="js-user" value=${id}>
                  <p class='chat-group-user__name'>${name}</p>
                <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
                </div>`
　　 member_list.append(html);
  }

  function appendErrMsgToHTML(user) {
    var html = 
      `<div class="chat-group-user clearfix">
        <p class="chat-group-user__name">${user}</p>
      </div>`
    search_list.append(html);
  }

  $("#user-search-field").on("keyup", function() {
    
     var input = $("#user-search-field").val();

    //チャットメンバーにすでに登録されているユーザを取得
     var x = $('.js-user');
     var arr = [];
     x.each(function(i, ele) {
       arr.push(ele.value);
     })

    $.ajax({
      type: "GET",
      url: "/users",
      data: { keyword: input,
              user_id: arr},
            
      dataType: 'json'
    })

    .done(function(data) {
      
      $("#user-search-result").empty();

      if (data.length !== 0) {
        data.forEach(function(data){
          appendUser(data);
        });
      }
      else {
        appendErrMsgToHTML("一致するユーザーはいません");
      }
    })
    
    .fail(function() {
      alert("ユーザー検索に失敗しました");
    })
  })
  
  $(function() {
    $(document).on("click", ".user-search-add", function() {
      var name = $(this).attr("data-user-name");
      var id = $(this).attr("data-user-id");
      appendMember(name, id);
      $(this).parent().remove();
    })
  })

  $(function() {
    $(document).on("click", '.user-search-remove', function() {
      $(this).parent().remove();
    })
  })
})