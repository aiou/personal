var InterValObj; //timer变量，控制时间  
var count = 60; //间隔函数，1秒执行  
var curCount;//当前剩余秒数  
var code = ""; //验证码  
var codeLength = 6;//验证码长度  
var sendflag = false;
function sendMessage(){  
    curCount = count;  
    var tel=$("#userPhone").val();//手机号码  
    if(tel != ""){  
    	if(!tel.match(/^(1+\d{10})$/)){
    		$(".divs3").show();
    		input4.addClass("changeborder");
    		$(".divs4").html( '手机号码格式不正确'); 
    		return false;
    	}
    	var data={
    		mobile:tel
    	}
		$.ajax({
			type:"POST",
			url:"https://api.cloudp.cc/cloudpServer/v1/trial/sms",
			data:data,
			dataType:"text",
			success:function(msg){
			        $("#btnSendCode").attr("disabled", "true");  
			        InterValObj = window.setInterval(SetRemainTime, 1000); 
			        $(".divs4").show();
			   	    $(".divs4").html('手机验证码已发送');  	
				},
			error:function(){
					TipArea.html('服务器错误…请重试');
			}
				})	
  //   //          error:function(XMLHttpRequest,textStatus,errorThrown){ 
  //   //   				alert('内部错误')



   			 }else{
   			 	$(".divs4").html( '手机号码不能为空'); 
   			 }

   			} 

function SetRemainTime(){  
    if(curCount == 0){                  
        window.clearInterval(InterValObj);//停止计时器  
        $("#btnSendCode").removeAttr("disabled");//启用按钮  
        $("#btnSendCode").val("重新发送验证码"); 
        $('#msg').html("请输入手机验证码");
        code = ""; //清除验证码。如果不清除，过时间后，输入收到的验证码依然有效  
    }  
    else{  
        curCount--;  
        $("#btnSendCode").val( "("+curCount + "s)重新获取");  
    }  
} 
	$(document).ready(function(){
		var input1=$('#userDepartment')
			input2=$('#userConnectName')
			input3=$('#userEmail')
			input4=$('#userPhone')
			input5=$('#codeStr')
			input6=$("#SubmitBt");
			TipArea=$('#TipArea');
		// var Refresh=function(){
		// 	CodePic.attr('src','/public/code/code_str.php?k=site_code&s='+Math.random());
		// }
		// CodePic.click(Refresh);
	input1.blur(function (){ 
		if($.trim(input1.val())==''){
				input1.addClass("changeborder");
				$(".divs1").show()}
		else{
				input1.removeClass("changeborder")
				$(".divs1").hide();
			}
		})
	input5.blur(function (){ 
		if($.trim(input1.val())==''){
				input5.addClass("changeborder");
				$(".divs5").show()}
		else{
				input1.removeClass("changeborder")
				$(".divs5").hide();
			}
		})
	input2.blur(function (){ 
		if($.trim(input2.val())==''){
				input2.addClass("changeborder");
				$(".divs2").show()}
		else{
			input2.removeClass("changeborder")
			$(".divs2").hide();
		}
		})
	input3.blur(function (){ 
		if(!($.trim(input3.val()))==''){
			if(!($.trim(input3.val())).match(/^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/)){
				input3.addClass("changeborder")
				$(".divs3").show();
				$(".divs3").html('邮箱格式不对')}
				else{
					input3.removeClass("changeborder")
					$(".divs3").hide();
				}
		}else{
			$(".divs3").show();
			input3.addClass("changeborder")
			$(".divs3").html('邮箱不能为空')}
		
		})
	input4.blur(function (){ 
		if(!($.trim(input4.val()))==''){
			if(!($.trim(input4.val())).match(/^(1+\d{10})$/)){
				input4.addClass("changeborder")
				$(".divs4").show();
				$(".divs4").html('手机号码格式不对')}
				else{
				$(".divs4").hide();
					input4.removeClass("changeborder")
				}
		}else{
			$(".divs4").show();
			input4.addClass("changeborder")
			$(".divs4").html('手机号不能为空')}
		
		})

		input6.click(submit_js);
		function submit_js(){
			var data={
				orgname:$.trim(input1.val()),
				name:$.trim(input2.val()),
				email:$.trim(input3.val()),
				mobile:$.trim(input4.val()),
				code:$.trim(input5.val()),
			}
			me=$(this);
			if(data.orgname==''){
				input1.addClass("changeborder")
				$(".divs1").show()
			}else if(data.name==''){
				input2.addClass("changeborder")
				$(".divs2").show()
			}else if(!data.email.match(/^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/)){
				$(".divs3").show()
				$(".divs3").html('邮箱格式不对')
				input3.addClass("changeborder")
			}else if(data.mobile==''){
				input4.addClass("changeborder")
				$(".divs4").show()
				$(".divs4").html('请填写手机号码');
			}else if(!data.mobile.match(/^(1+\d{10})$/)){
				input4.addClass("changeborder")
				$(".divs4").show()
				$(".divs4").html('手机格式不正确');
			}else if(data.code==''){
				$(".divs5").show()
				input5.addClass("changeborder")
			}else{
				$(".trials input").removeClass("changeborder");

				me.attr('disabled',true);
				// TipArea.html('正在验证信息，请稍后……');
				$.ajax({
					type:"POST",
					url:"https://api.cloudp.cc/cloudpServer/v1/trial/request",
					data:data,
					success:function(data){
						// data = $.trim(data);
						console.log(data.code)
					// var json = data.responseText.evalJSON();
						me.attr('disabled',false);
						if(data.code==7){
							TipArea.html(' 手机号已被注册');
						}else if(data.code==8){
							TipArea.html(' 验证码输入错误');
						}else if(data.code==9){
							TipArea.html(' 验证码已过期');
						}else if(data.code==10){
							TipArea.html('没有可用的会议室');
						}else if(data.code==999){
							TipArea.html('服务器内部错误')
						}		
						else{
						 console.log(data)
							// console.log(data.data.name)
							// console.log(data.data.pin)
							// console.log(data.data.Capacity)
							// console.log(data.data.expireTime)
							// console.log(typeof(data))
							// console.log(typeof((data.data))
							 $(".index-phone").html(data.data.name)
							$(".compere-password").html(data.data.pin)
							$(".participants-password").html(data.data.guest_pin)
							$(".totals").html(data.data.Capacity)
							$(".index-time").html(data.data.expireTime)
							$(".bcg").show();
							$(".bcg-content").show();
						}
						// if(msg=='success'){
			 		// 			TipArea.html('正在登录系统，请稍后……');
						// 	// window.location.href='admin.php';
						// }else{
						// 	me.attr('disabled',false);
						// 	switch(msg){
						// 		case '0':
						// 			TipArea.html('<span style="color:red;">验证码错误！！</span>');
						// 			userName.val('').focus();
						// 			break;
						// 		case '999':
						// 			TipArea.html('<span style="color:red;">服务器内部错误！</span>');
						// 			password.val('').focus();
						// 			break;
						// 		case 'notUse':
						// 			TipArea.html('<span style="color:red;">该用户名被禁用！</span>');
						// 			userName.val('').focus();
						// 			password.val('').focus();
						// 			break;
						// 		case 'code':
						// 			TipArea.html('<span style="color:red;">验证码填写错误，请重新填写！</span>');
						// 			code.val('').focus();
						// 			break;
						// 	}
						// }	
					},
					error:function(){
						TipArea.html('内部错误');
					}
				});	
			}
		}
		// $("html").keyup(function(e){
		// 	if(e.keyCode==13){
		// 		SubmitBt.click();	
		// 	}				 
		// });
	// });
$(".cha").click(function(){
	$(".bcg-content").hide();
	$(".bcg").hide();
})
})
