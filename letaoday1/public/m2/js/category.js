$(function () {
  mui('.mui-scroll-wrapper').scroll({
    deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
  });
  $.ajax({
    type: "get",
    url: "/category/queryTopCategory",
    success: function (response) {
      console.log(response);
      var html = template('category-first', { result: response.rows });
      $('#left').html(html);
      // 如果一级分类有数据的话
      if (response.rows.length) {
        // 给第一个一级分类添加选中状态
        $('#left').find('a').eq(0).addClass('active')
        // 获取第一个一级分类的ID
        var id = response.rows[0].id;
        // 根据一级分类ID获取二级分类
        getSecondCategory(id);
      }
    }
  });
  $('#left').on('click', 'a', function () {
    // 2.获取当前点击的一级分类的ID
    var id = $(this).attr('data-id');
    console.log(id);
    
    // 给当前点击的一级分类添加选中状态
    $(this).addClass('active').siblings().removeClass('active');
    // 3.调用接口 获取数据
    getSecondCategory(id);
  });
});

function getSecondCategory(id) {
  $.ajax({
    url: '/category/querySecondCategory',
    type: 'get',
    data: {
      id: id
    },
    success: function (response) {
      console.log(response);
      var html = template('category-second', response);
      $('.right').html(html);
    }
  });
}