$(function(){


//获得一个随机四位数
	var one=Math.floor(Math.random()*9+1).toString();
	var two=Math.floor(Math.random()*10).toString();
	var three=Math.floor(Math.random()*10).toString();
	var four=Math.floor(Math.random()*10).toString();
	var random=one+two+three+four;
	var randoms=Number(random)
$(".code-span").html(randoms);
function changes(){
	var one=Math.floor(Math.random()*9+1).toString();
	var two=Math.floor(Math.random()*10).toString();
	var three=Math.floor(Math.random()*10).toString();
	var four=Math.floor(Math.random()*10).toString();
	var random=one+two+three+four;
	var randoms=Number(random)
$(".code-span").html(randoms);
}
$(".code-span").click(function(){
	changes();
})
// var user_name = '';
// var passWord = '';
// var codeStr="";
var input1=$('#userName')
	input2=$('#userPassWord')
	input3=$('#codeStr')
input1.blur(function (){ 
		if($.trim(input1.val())==''){
				input1.addClass("changeborder");
				$(".users div").html("请输入用户名")
				$(".users div").show()}
		else{
				input1.removeClass("changeborder")
				$(".users div").hide();
			}
		});
input2.blur(function (){ 
		if($.trim(input2.val())==''){
				input2.addClass("changeborder");
				$(".passwords div").html("请输入密码")
				$(".passwords div").show()}
		else{
				input2.removeClass("changeborder")
				
				$(".passwords div").hide();
			}
		})
input3.blur(function (){ 
		if($.trim(input3.val())==''){
				input3.addClass("changeborder");
				$(".codes div").html("请输入验证码")
				$(".codes div").show()}
		else if($.trim(input3.val())!= $(".code-span").html()){
			input3.addClass("changeborder");
			$(".codes div").html("请输入正确的验证码")
				$(".codes div").show()
		}
		else{
				input3.removeClass("changeborder")
				$(".codes div").hide();
			}
		})
$(".submit").click(check);
function check(){

		var username = $.trim($('#userName').val());
		var passWord = $.trim($('#userPassWord').val());
		var codeStr = $.trim($('#codeStr').val());
		me=$(this);
		if(username == '' || username == '请输入用户名' ){
			// user_name.focus()
			$(".users div").show()
			$(".users div").html("请输入用户名")
			return false;			
		}
		if(passWord == ''){
			// password.focus()
			$(".passwords div").show()
			$(".passwords div").html("请输入密码")
			return false;			
		}
		if(codeStr == ''){
			// codeStr.focus()
			$(".codes div").show()
			$(".codes div").html('请输入验证码');
			return false;
			
		}
		if(codeStr!= $(".code-span").html()){
			$(".codes div").show()
			$(".codes div").html('请输入正确的验证码');
			return false;
		}
		// var data = {
		// 	action:"login",
		// 	userName:user_name,
		// 	passWord:passWord,	
		// };
		else{

		
		me.attr('disabled',true);
		$('.submit-error').show();
		$(".submit-error").addClass('changecolor');
		$('.submit-error').html("正在登陆中，请稍后.....")
		// $('form').submit();
		// var a=eval(username)
		// var b=eval(passWord)
		$.ajax({ 	
			// data:data,
			type:'get',
			url:'https://api-test.cloudp.cc/cloudpServer/v1/orgs/admin-login?username='+username+'&password='+passWord, 
			        
			dataType:'json',
			success:function(data){
				// if(msg == 'yzmError'){
				// 	alert('验证码错误');
				// 	$('#passWord').val('');
				// 	$('#codeStr').val('');
				// 	return false;
				// }
				me.attr('disabled',false);						
				if(data.code==6){
					$('.submit-error').show();
					$(".submit-error").removeClass('changecolor');
					$('.submit-error').html('用户或密码错误！');
					$('#userName').val('')
					$('#userPassWord').val('')
		            $('#codeStr').val('');
					return false;
				}
				else if(data.code==999){
					$('.submit-error').show();
					$(".submit-error").removeClass('changecolor');
					$('.submit-error').html('服务器内部错误!');
				}
				else if(data.code==0){
					var tokens=data.token;
					var org_id=data.data.org_id
					location.href='status.html?name='+tokens+'&id='+org_id					
				}
			
			
			},
		error:function(data){
			
		}
		});
	}
	}
	})