$(function(){


  $(".box-left div").hover(
  function (){
  	$(".box-left div span").hide();
  	$(".show").show();
    $(this).children("span").show();

  },
  function () {
     $(".box-left div span").hide();
     $(".show").show();
  }
)
  $(".right2").hover(
  	function(){
  		$(".gray").hide();
  		$(".red").show()
  	},
  	function(){
  		$(".gray").show();
  		$(".red").hide()
  	}
  	)
  $(".right2").click(function(){
  	window.location.href="login.html"
  })
//获取location参数

})
