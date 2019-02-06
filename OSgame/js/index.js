var uid = sessionStorage.uid;
var userinfo;
var user_img;
var user_img_result;
var user_record = [];
var phead_record = [];
var cname ;
var cid = 0;
var cur_chapter = "" ;
var clock;
var ques_array = [];
var cur_ques = 1;
var player_answer  = "";
var poem_money = 0;
var player_current_answer;
var enemy_current_answer;
var enemy_correct = 0;
var player_correct = 0;
var player_fault = 0;
var player_exp = 0;
var player_win_rate = 0;
var game_bar = 0;
var dv_append = 3;
var player_choose_answer = '<div style="float:left; padding-left:2%;">❊</div>';
var qid1 = 0;
var qid2 = 0;
var qid3 = 0;
var qid4 = 0;
var qid5 = 0;
var answer1 ;
var answer2 ;
var answer3 ;
var answer4 ;
var answer5 ;
var reason ;
var gashaimg ;
var ans = [];


/*function disableF5(e) { if ((e.which || e.keyCode) == 116) e.preventDefault(); };
$(document).on("keydown", disableF5);*/

//-----------------page_home-----------------------------------------------------
$("#page_home").ready(function(){	
  if ( String( uid )  == "undefined" ) {
    alertify.alert('請從首頁登入!');
	window.location.href = "osgame.html";
  } // if
  else GetUserInfo(); 
  
});
//-----------------page_poem-----------------------------------------------------
$("#page_poem").ready(function(e){	
 GetUserInfo(); 
 e.preventDefault(); 
});


//-----------------bn_goto_userinfo-----------------------------------------------------
$("#bn_goto_userinfo").click(function(){
  
  $.ajax({
    url: "php/getuserinfo.php",
    type: "POST",
    //dataType: "text",
    data: { "uid": uid },
    success: function(msg) {
      if ( !CheckJson(msg) ) {
        alert(msg);
      } // if CheckJson
	  else {
        userinfo = JSON.parse(msg);
		$("#user_info").html("玩家帳號："+ userinfo.acct +"<br>勝率："+ userinfo.win_Rate + "%"+"<br>上次登入：" +userinfo.lastlogin ) ;
	  } // else
    }
  
  });
  
  $.ajax({
    url: "php/getuserrecord.php",
    type: "POST",
    dataType: "text",
    data: { "uid": uid },
    success: function(msg) {
      if ( !CheckJson(msg) ) {
        alert(msg);
      } // if CheckJson
	  else {	
	    AppendUserRecord(msg) ;
      } // else
    }
	  
  });


  	  $.ajax({
	    url: "php/getPlayerHead.php",
	    type: "POST",
	    dataType: "text",
	    data: { "uid": uid },
	    success: function(msg) {
	      if ( !CheckJson(msg) ) {
	        alert(msg);
	      } // if CheckJson
		  else {	
		    AppendPlayHead(msg) ;
	      } // else
	    }
		  
	  });
  
	
  $( ":mobile-pagecontainer" ).pagecontainer( "change", "#page_userinfo" );
});   

//-----------------bn_goto_stage-----------------------------------------------------
$("#bn_goto_stage").click(function(){
	document.getElementById('bn_co_os').style.opacity = '1';	
	document.getElementById('bn_co_music').style.opacity = '1';	
	document.getElementById('bn_co_science').style.opacity = '1';	
	document.getElementById('bn_co_creative').style.opacity = '1';	
	document.getElementById('bn_co_culture').style.opacity = '1';	
	document.getElementById('bn_co_system').style.opacity = '1';
  	$( ":mobile-pagecontainer" ).pagecontainer( "change", "#page_stage" );
});   

//-----------------bn_goto_rank-----------------------------------------------------
$("#bn_goto_rank").click(function(){

  $.ajax({
    url: "php/getPlayerRank.php",
    type: "POST",
    dataType: "text",
    data: { "uid": uid,
            "grou":userinfo.grou
	},
    success: function(msg) {
      if ( !CheckJson(msg) ) {
        alert(msg);
      } // if CheckJson
	  else {	
	    AppendUserRank(msg) ;
      } // else
    }
	  
  });
  
  $( ":mobile-pagecontainer" ).pagecontainer( "change", "#page_rank" );
});   //-----------------bn_goto_friend-----------------------------------------------------


//-----------------bn_goto_message-----------------------------------------------------
$("#bn_goto_message").click(function(){
    $.ajax({
    url: "php/getPlayerRecord.php",
    type: "POST",
    //dataType: "text",
    data: { "uid": uid },
    success: function(msg) {
      if ( !CheckJson(msg) ) {
        alert(msg);
      } // if CheckJson
	  else {	
	    AppendPlayRecord(msg) ;
      } // else
    }
	  
  });
  
  $( ":mobile-pagecontainer" ).pagecontainer( "change", "#page_message" );
});   

//-----------------game_experience-----------------------------------------------------
$("#skill_game_experience").click(function(){
    alertify.confirm('購買轉蛋需花5金幣，請問你要購買嗎?', function (e) {  
        if ( e && userinfo.p_money >= 5) {
			userinfo.p_money = parseInt( userinfo.p_money ) - 5;        	
			$.ajax({
	  			url: "php/getGashapon.php",
	    		type: "POST",
	    		//dataType: "text",
	    		data: { 
	    			"uid": uid
	    		},
	    		success: function(msg) {
		    		if ( !CheckJson(msg) ) {
		     		    alert(msg);
		      		} // if CheckJson
			  		else {
					    gashas_array = JSON.parse(msg); 	
				     	gashaimg = gashas_array.gashas_array.Gimg;
						var maskHeight = $(window).height();
						var maskWidth = $(window).width();
						$('#experience_Image').attr({'src':gashas_array.gashas_array.Gimg});
						$('#experience_Image').css({'width':maskWidth,'height':'auto'});
						//transition effect
						$('#experience_Image').fadeIn(500);	
						$('#experience_Image').fadeTo("slow",1);	
				    	UpdateUserSkill();
				    	alertify.success('購買成功');

					} // else
	    		}//success: function
		  
	  		});	//ajax
       	} //if ( e && userinfo.money >= 300)
	    else {  
        	if ( userinfo.p_money < 5 ) alertify.error('金幣不夠!');
        else alertify.error('購買失敗!');
       }  
    });  
});   

$('#experience_Image').click(function (e) {
//Cancel the link behavior
	GetUserInfo();
	e.preventDefault();
	$('#experience_Image').hide();
});  




//-----------------bn_goto_skill-----------------------------------------------------
$("#bn_goto_skill").click(function(){
  $( ":mobile-pagecontainer" ).pagecontainer( "change", "#page_skill" );
});   

//-----------------page_refrsh_home-----------------------------------------------------
$("#bn_goupdate_home").click(function(){
  GetUserInfo();
  $( ":mobile-pagecontainer" ).pagecontainer( "change", "#page_home" );
});   


//-----------------bn_goto_homepage-----------------------------------------------------
$("#bn_goto_homepage").click(function(e){
  GetUserInfo();
  e.preventDefault();
  $( ":mobile-pagecontainer" ).pagecontainer( "change", "#page_home" );
}); 


$("#bn_goupdate_stage").click(function(){//詩籤
		//Get the screen height and width
	$('#poemmask').show();	
	var maskHeight = $(window).height();
	var maskWidth = $(window).width();
	$('#poemmask').css({'width':maskWidth,'height':maskHeight});
	//transition effect
	$('#poemmask').fadeIn(500);	
	$('#poemmask').fadeTo("slow",0.9);	
	//if close button is clickedooip
	//-----------------page_bn_poem-----------------------------------------------------

  	$( ":mobile-pagecontainer" ).pagecontainer( "change", "#page_poem", { changeHash: "false" }  );


});   //-----------------page_refrsh_home-----------------------------------------------------

	$('#poemmask').click(function (e) {
		$('#poemmask').hide();
		//Cancel the link behavior
		$.ajax({
  			url: "php/getPoem.php",
    		type: "POST",
    		//dataType: "text",
    		data: { 
    			"uid": uid
    		},
    		success: function(msg) {
	    		if ( !CheckJson(msg) ) {
	     		    alert(msg);
	      		} // if CheckJson
		  		else {
				    poems_array = JSON.parse(msg);
					SetPoem();
					$('#poemmask').hide();
					if ( poems_array.poems_array.poem_good == 1 ) {  
						alertify.success('運氣不錯！獲得１金幣');
						poem_money = parseInt( userinfo.p_money ) + 1;
				  		UpdateUserPmoney();
						GetUserInfo();
			       } 
					else if( poems_array.poems_array.poem_good == 2 ) {  
						alertify.success('太好運啦！獲得２金幣');
						poem_money = parseInt( userinfo.p_money ) + 2;
				  		UpdateUserPmoney();
						GetUserInfo();
			       } 			       
				   else {  
				   		alertify.error('好運會來的，加油！');
						poem_money = parseInt( userinfo.p_money ) + 0;
				  		UpdateUserPmoney();
						GetUserInfo();			         
			       }
			       $("#bn_goto_homepage").show(); 					
					$( ":mobile-pagecontainer" ).pagecontainer( "change", "#page_poem_result" );				
				} // else
    		}
	  
  		});	
		e.preventDefault();

	});

$("#bn_goto_play").click(function(){
	$('#bn_goto_play').css('display','none');
	cur_chapter = "";
	SelectCourseChapter();
$.ajax({
  	url: "php/getenemyques.php",
    type: "POST",
    //dataType: "text",
    data: { "uid": uid, 
	        "chapter": cur_chapter
               			   },
    success: function(msg) {
      if ( !CheckJson(msg) ) {
        alert(msg);
      } // if CheckJson
	  else {
	    ques_array = JSON.parse(msg);
		SetPlay();		
		user_img = 'url(' + ques_array.user_img + ')' ;
		user_img_result = ques_array.user_img;
		document.getElementById("user_img").style.backgroundImage = user_img;
		$("#process_bar").animate({ width: game_bar + "%" }, 500 ).html( game_bar + "%"); 
		$("#user_name").html( ques_array.user_name );
		if ($('#pic').length > 0) {
	  		$("#pic").remove();	
		}
	  } // else
    }
	  
  });	

  		$( ":mobile-pagecontainer" ).pagecontainer( "change", "#page_play" );
});//clickfunction



//-----------------bn_題目生成&回答-----------------------------------------------------


$(".bn_answer").click(function(){
	$('.bn_answer').prop('disabled', true);
	var id = $(this).attr('id');
	ChooseAnswer(id);
	ans.push(id.substr(-1));

//-----------------bn_answer_correct-----------------------------------------------------	
	var correct = "bn_ans" + ques_array.ques_array[cur_ques-1].correct ;
  	if ( this.id == correct ) {
	    player_current_answer = this.id;
	    game_bar = game_bar + 20;  
		player_answer = player_answer.concat("1");
		// 計算剩餘時間的得分 並依照得分算出成長的趴數 改變分數條
	}
	else {
	    player_answer = player_answer.concat("0");
	}

	CorrectAnswer( correct );
	UploadUserAns(id);
  	setTimeout(function(){ 
		SetWhy();	
		ClearAnswer( correct );
	  	cur_ques++;
      	if ( cur_ques <= 5  )  { 
      		document.getElementById("bn_next").style.display="block"; //顯示bn_next none 
      		$("#bn_next").click(function(){ 
			$('.bn_answer').prop('disabled', false);
		    SetPlay();
		}); 
      }//IF
        else  {
      		document.getElementById("bn_sub").style.display="block";        	
			for ( var i = 0; i < player_answer.length ; i++ ) {
		    	if ( player_answer.charAt(i) == '0' ) 
		    	    player_fault++;
		    	else {
	               	player_correct++;		
	            }		   
		    }

			$('.bn_answer').prop('disabled', false);
		    player_win_rate = player_correct / 5 * 100;
			document.getElementById("bn_goupdate_stage").style.display="block";
			document.getElementById("bn_goupdate_home").style.display="block";
		    if ( player_correct >= 4 ) {
		       	$("#result").html( "You Win" ) ;
		    document.getElementById("bn_goupdate_home").style.display="none";   		
			} // if 	

		    else if ( player_correct < 4 ){
		    $("#result").html( "You Lose" ) ;
			document.getElementById("bn_goupdate_stage").style.display="none";
			}
			$("#p_result").html( "<br><br>玩　家<br>你答對了：" +  player_correct.toString() + "題<br>你答錯了："  + player_fault.toString() +"題<br>獲得的經驗：" + game_bar +  "<br>" ) ;	

		    player_exp = parseInt(player_exp) + parseInt( game_bar);

			poem_money = parseInt( userinfo.p_money ) + 0;
		    //上傳user_record---------------------------------------------------------------
		    UploadUserRecord();
		    player_win_rate = 0;
			document.getElementById("result_img_result").src = user_img_result;      	
	        
    	}

	},1000);

});

$("#bn_sub").click(function(){ 
		    ques_array = [];
	        cur_ques = 1;		    
		    ans = [];
		    player_answer  = "";
	        player_correct = 0;
	        player_fault = 0;		    
		    game_bar = 0;
	$( ":mobile-pagecontainer" ).pagecontainer( "change", "#page_result" );
});     
//-----------------bn_goto_home-----------------------------------------------------
$("#bn_goto_home").click(function(){
    $( ":mobile-pagecontainer" ).pagecontainer( "change", "#page_home" );

});   
		



 //-----------------bn_course-----------------------------------------------------
var course_chapter = [ 0, 0, 0, 0, 0, 0, 0, 0];
$(".bn_course").click(function(){
    $(".dv_chapter").css('background-color','black');
    $('#sure_btn').remove();
	cid = 2;
	if ( this.id == 'bn_co_os' ) {
		cname =  "作業系統導論";
		//一到四

		$('#bn_goto_play').css('display','block');
        course_chapter[0] = 1;
		course_chapter[1] = 1;
		course_chapter[2] = 1;
		course_chapter[3] = 1;
		course_chapter[4] = 0;
		course_chapter[5] = 0;
		course_chapter[6] = 0;
		course_chapter[7] = 1;

	} // if
	else if ( this.id == 'bn_co_science' ) {
		cname =  "作業系統導論";
		//一到四
		$('#bn_goto_play').css('display','block');//6~7
        course_chapter[0] = 0;
		course_chapter[1] = 0;
		course_chapter[2] = 0;
		course_chapter[3] = 0;
		course_chapter[4] = 0;
		course_chapter[5] = 1;
		course_chapter[6] = 1;
		course_chapter[7] = 1;
	} // else if
    else if ( this.id == 'bn_co_music' ) {
		cname =  "作業系統導論";
		//一到四
		$('#bn_goto_play').css('display','block');//5-6
        course_chapter[0] = 0;
		course_chapter[1] = 0;
		course_chapter[2] = 0;
		course_chapter[3] = 0;
		course_chapter[4] = 1;
		course_chapter[5] = 0;
		course_chapter[6] = 0;
		course_chapter[7] = 0;
	} // else if
	else if ( this.id == 'bn_co_creative' ) {
		cname =  "作業系統導論";
		//一到四
		$('#bn_goto_play').css('display','block');
        course_chapter[0] = 0;
		course_chapter[1] = 0;
		course_chapter[2] = 0;
		course_chapter[3] = 0;
		course_chapter[4] = 1;
		course_chapter[5] = 0;
		course_chapter[6] = 0;
		course_chapter[7] = 0;
	} // else if
	else if ( this.id == 'bn_co_culture' ) {
		cname =  "作業系統導論";
		//一到四
		$('#bn_goto_play').css('display','block');
        course_chapter[0] = 1;
		course_chapter[1] = 1;
		course_chapter[2] = 1;
		course_chapter[3] = 1;
		course_chapter[4] = 1;
		course_chapter[5] = 1;
		course_chapter[6] = 1;
		course_chapter[7] = 1;
	} // else if
	else if ( this.id == 'bn_co_system' ) {
		cname =  "作業系統導論";
		//一到四
		$('#bn_goto_play').css('display','block');
        course_chapter[0] = 0;
		course_chapter[1] = 0;
		course_chapter[2] = 0;
		course_chapter[3] = 0;
		course_chapter[4] = 0;
		course_chapter[5] = 0;
		course_chapter[6] = 0;
		course_chapter[7] = 1;
	} // else if	
});  


//-----------------bn_頭像設定-----------------------------------------------------






	function person_head_change(changehead){	
		
		//Get the screen height and width
		var maskHeight = $(window).height();
		var maskWidth = $(window).width();
		$('#person_head_content').css({'width':maskWidth,'height':maskHeight});
		//transition effect
		$('#person_head_content').fadeIn(500);	
		$('#person_head_content').fadeTo("slow",1);	
		//if close button is clicked
		$('#person_head_content').click(function (e) {
			//Cancel the link behavior
			e.preventDefault();
			$('#person_head_content').hide();
		});
	};

	$(".person_head_change").on("click",function(){
		window.scrollTo(0,0);
		person_head_change($(this).text());
	});






// 檢查JSON是否合法
function CheckJson( str ) {
    try {
        var json = JSON.parse(str);
        return true ;
    }
    catch(e) {
        alertify.alert('請從首頁登入!');
        return false;
    }
}
//----------------------------------設置關卡題目和答案---------------------------------------------------------
function SetPlay() {
	if(userinfo.grou == 1){
			$("#p_ques").html("Q" + cur_ques + "：圖中問號處答案為？<br>(請點選概念圖)") ;	
		document.getElementById("showimg").style.display="block";	
		document.getElementById("showansimg").style.display="none";

	}
	else{
		$("#p_ques").html("Q" + cur_ques + "：") ;	
		document.getElementById("showimg").style.display="none";	
		document.getElementById("showansimg").style.display="none";	
	}
	document.getElementById("bn_next").style.display="none"; 
	document.getElementById("bn_sub").style.display="none";
	document.getElementById("bn_ans1").style.display="block"; 	
	document.getElementById("bn_ans2").style.display="block"; 
	document.getElementById("bn_ans3").style.display="block"; 
	document.getElementById("bn_ans4").style.display="block"; 	
	$("#bn_ans1").html( ques_array.ques_array[cur_ques-1].ans1) ;
    $("#bn_ans2").html( ques_array.ques_array[cur_ques-1].ans2) ;	
	$("#bn_ans3").html( ques_array.ques_array[cur_ques-1].ans3) ;
	$("#bn_ans4").html( ques_array.ques_array[cur_ques-1].ans4) ;	
}
//---------------------------------設置回饋-------------------------------------------------------------------
function SetWhy() {
	document.getElementById("bn_ans1").style.display="none"; 	
	document.getElementById("bn_ans2").style.display="none"; 
	document.getElementById("bn_ans3").style.display="none"; 
	document.getElementById("bn_ans4").style.display="none"; 
	if(userinfo.grou == 1){
		$("#p_ques").html('<span style="font-size:100%;color:white;font-family:Times New Roman,微軟正黑體;font-weight:bold;">1. '
			+ques_array.ques_array[cur_ques-1].ans1 + '<br>2. ' +ques_array.ques_array[cur_ques-1].ans2 
			+'<br>3. ' +ques_array.ques_array[cur_ques-1].ans3 + '<br>4. ' +ques_array.ques_array[cur_ques-1].ans4 + '</span><br>' 
		 	+'<span style="font-size:110%;color:#25ff00;font-family:微軟正黑體, serif;font-weight:bold;">'+'你選的是：'
		 	+ans[cur_ques-1]+ '<br>' +'參考答案：'+ques_array.ques_array[cur_ques-1].correct+ '</span><br>' 
			+ '<span style="font-size:100%;color:white;font-family:Times New Roman,微軟正黑體;">原因：<br>'+ques_array.ques_array[cur_ques-1].whyans
			+'<br>'+'</span>') ;	
		document.getElementById("showimg").style.display="none";
		document.getElementById("showansimg").style.display="block";

	}
	else
		$("#p_ques").html('<span style="font-size:100%;color:white;font-family:Times New Roman,微軟正黑體;font-weight:bold;">1. '
			+ques_array.ques_array[cur_ques-1].ans1 + '<br>2. ' +ques_array.ques_array[cur_ques-1].ans2 
			+'<br>3. ' +ques_array.ques_array[cur_ques-1].ans3 + '<br>4. ' +ques_array.ques_array[cur_ques-1].ans4 + '</span><br>' 
		 	+'<span style="font-size:110%;color:#25ff00;font-family:微軟正黑體, serif;font-weight:bold;">'+'你選的是：'
		 	+ans[cur_ques-1]+ '<br>' +'參考答案：'+ques_array.ques_array[cur_ques-1].correct+ '</span><br>' 
			+ '<span style="font-size:100%;color:white;font-family:Times New Roman,微軟正黑體;">原因：<br>'+ques_array.ques_array[cur_ques-1].whyans
			+'<br>'+'</span>'+'<input type="text" id="userans" class="userans" style="z-index:99999;color: black;"  placeholder="我覺得我有更好的答案"/>'
		   	+'<input type="button" id="bn_userans" class="bn_userans"   value="送出" style="z-index:99999;color: black;" onclick="userreason($(\x27#userans\x27));">' ) ;
}





//----------------------------------bn_顯示題目概念圖-------------------------------------------------------

	function showImage(fullPath){	
		//Get the screen height and width
		var maskHeight = $(window).height();
		var maskWidth = $(window).width();
		$('#qusmask').attr({'src':ques_array.ques_array[cur_ques-1].title_img});//改成題目有問號的CMAP***********************************************************************
		$('#qusmask').css({'width':maskWidth,'height':'100%'});//maskHeight
		//transition effect
		$('#qusmask').fadeIn(500);	
		$('#qusmask').fadeTo("slow",1);	
		$('#conceptmap_ques').show();
		$("#conceptmap_ques").html("1." + ques_array.ques_array[cur_ques-1].ans1 + "<br>2." + ques_array.ques_array[cur_ques-1].ans2
			+"<br>3." + ques_array.ques_array[cur_ques-1].ans3+ "<br>4." + ques_array.ques_array[cur_ques-1].ans4) ;
		//if close button is clicked
		$('#qusmask').click(function (e) {
			//Cancel the link behavior
			e.preventDefault();
			$('#qusmask').hide();
			$('#conceptmap_ques').hide();		
		});
	};

	$(".showImage").on("click",function(){
		window.scrollTo(0,0);
		showImage($(this).text());
	});


	function showansImage(full){	
		document.getElementById("conceptmap_ques").style.opacity = '0.1';
		//Get the screen height and width
		var maskHeight = $(window).height();
		var maskWidth = $(window).width();
		$('#ansmask').attr({'src':ques_array.ques_array[cur_ques-2].ans1_img});//放有答案的CMAP
		$('#ansmask').css({'width':maskWidth,'height':maskHeight});
		//transition effect
		$('#ansmask').fadeIn(500);	
		$('#ansmask').fadeTo("slow",1);	
		//if close button is clicked
		$('#ansmask').click(function (e) {
			//Cancel the link behavior
			e.preventDefault();
			$('#ansmask').hide();
		});
	};

	$(".showansImage").on("click",function(){
		window.scrollTo(0,0);
		showansImage($(this).text());
	});



function showques() {	
	document.getElementById("conceptmap_ques").style.opacity=(document.getElementById("conceptmap_ques").style.opacity == 1.0) ? 0.2 : 1.0; ;
}



//----------------------------------設置詩籤---------------------------------------------------------
function SetPoem() {	
	$("#poem_title").html( poems_array.poems_array.poem_title) ;
    $("#poem_content").html( poems_array.poems_array.poem_content) ;	
	$("#poem_detail").html( poems_array.poems_array.poem_detail) ;
}


//--------------------------從資料庫裡拿使用者資料，更新等級、經驗條、錢-------------------------------
function Level( exp ) {
  var level = 1;
  player_exp = exp;
  while ( exp >= level * 50 ) {
     exp = exp - level * 50;
	 level++;
  } // while 

  var progress_bar = exp / ( level * 50 ) * 100;
  $(".class_level").html("LV：" + level ) ;
  $(".class_progress_bar").css("width",  progress_bar +  "%" );
  
}

function GetUserInfo() {
  $.ajax({
    url: "php/getuserinfo.php",
    type: "POST",
    //dataType: "text",
    data: { "uid": uid },
    success: function(msg) {
      if ( !CheckJson(msg) ) {
        alert('請從首頁登入!');
      } // if CheckJson
	  else {
        userinfo = JSON.parse(msg);
        Level( userinfo.exp );
		$(".class_money").html("☺：" + userinfo.p_money ) ;
		document.getElementById("person").src=userinfo.img;
	  } // else
    }

  });

}

//--------------------------------------------------------------------------------------------------------------
//---------------------------------------上傳使用者遊戲記錄--------------------------------------------
function UploadUserRecord(){
  $.ajax({
    url: "php/UploadUserRecord.php",
    type: "POST",
    data: { "uid": uid,
               "cid":cid,
			   "win_rate":player_win_rate,
			   "qid1":qid1,
			   "qid2":qid2,
			   "qid3":qid3,
			   "qid4":qid4,
			   "qid5":qid5,
			   "answer1":answer1,
			   "answer2":answer2,
			   "answer3":answer3,
			   "answer4":answer4,
			   "answer5":answer5,
               "exp":player_exp,
               "p_money":poem_money
    },
  });

}




//--------------------------------------------------------------------------------------------------------------
//---------------------------------------上傳當前做答--------------------------------------------
function UploadUserAns(id){
	if ( cur_ques ==1 ) {
		qid1 = ques_array.ques_array[cur_ques-1].qid;
		answer1 = id;
		}
	else if ( cur_ques ==2 ) {
		qid2 = ques_array.ques_array[cur_ques-1].qid;
		answer2 = id;
		}
	else if ( cur_ques ==3 ) {
		qid3 = ques_array.ques_array[cur_ques-1].qid;
		answer3 = id;
		}
	else if ( cur_ques ==4 ) {
		qid4 = ques_array.ques_array[cur_ques-1].qid;
		answer4 = id;
		}
	else if ( cur_ques ==5 ) {
		qid5 = ques_array.ques_array[cur_ques-1].qid;
		answer5 = id;
		}								
}



//------------------------------------------------------------------------------------------------------------
//----------------------------------------------判斷是遊戲記錄的cid是哪門課--------------------------
function  WhatCourse( cid ){
  if ( cid == 2 ) return "作業系統導論";
  else if ( cid == 3 ) return "科學與倫理";
  else if ( cid == 4 ) return "音樂基礎訓練";
  else if ( cid == 5 ) return "創意思解";
  else if ( cid == 6 ) return "多元文化概論";
  else if ( cid == 7 ) return "系統思維與問題解決";
}
//---------------------------------------------------------------------------------------------------------------
//-----------------------------------------------增加使用者遊戲勝率--------------------------------------------
function AppendUserRecord( msg ) {
  $(".content_moocs3_1_course").remove();
  user_record = JSON.parse(msg);
  var divhead = '<div class="content_moocs3_1_course" style="background-image:url(img/Moocs_切片-底-96.png);"><div class="course_data1">' ;
  var divmiddle = '</div><div class="course_data2">答對率';
  var divtail = '%</div></div>' ;
		
  var index = 1 ;
  while ( index <= user_record[0] * 2 ) {

    $("#user_record").append( divhead + WhatCourse( user_record[index] ) + divmiddle + user_record[index+1] + divtail );
    index = index+2 ;
 
    
  } // while

}


//-----------------------------------------------設置使用者頭像--------------------------------------------
function AppendPlayHead(msg) {
	$(".pheadmask").remove();

    phead_record = JSON.parse(msg);
    //var divhead = '<div class="person_head_delete">' ;
 	//var divtail = '</div>' ;
	var index = 1 ;
	while ( index <= phead_record[0] * 2 ) {
    $("#person_head_content").append( /*divhead +*/ '<img id="pheadmask'+index+'" class="pheadmask" src="'+phead_record[index+1]+'" onclick="phead(this)" style="width: 33%;" />' /*d+ ivtail*/ );
	    index = index+2 ;
	 
	    
	} // while
}


//------------------------------------------------------------------------------------
function phead(pimg){
	var imgg = pimg.src;
	var img = imgg.slice(-17);	
	UploadUserImage( img );
	document.getElementById("person").src=img;

}

function stage_change(yo){
document.getElementById('bn_co_os').style.opacity = '1';	
document.getElementById('bn_co_music').style.opacity = '1';	
document.getElementById('bn_co_science').style.opacity = '1';	
document.getElementById('bn_co_creative').style.opacity = '1';	
document.getElementById('bn_co_culture').style.opacity = '1';	
document.getElementById('bn_co_system').style.opacity = '1';
document.getElementById(yo).style.opacity = '0.2';

}


function UploadUserImage( img ){
  $.ajax({
    url: "php/UploadUserImage.php",
    type: "POST",
    data: { "uid": uid,
               "img":img
		      },
  });

}

//---------------------------------------------------------------------------------------------------------------
//-----------------------------------------------增加使用者遊玩記錄--------------------------------------------
function AppendPlayRecord( msg ) {
	$(".content_moocs3_2_course").remove();
	$("br").remove();

    play_record = JSON.parse(msg);
    var divhead = '<div class="content_moocs3_2_course" style="background-image:url(img/Moocs_切片-底-96.png);">' ;
 	var divtail = '</div>' ;
	var index = 0 ;
	while ( index <= play_record["num"] * 2 ) {
		if(userinfo.grou == 0){
		 	$("#play_record").append(  divhead+'<span style="font-size:130%;color:black;font-family:Times New Roman,微軟正黑體;font-weight:bold;">1. '+play_record.record_array[index].ans1
		  	+'<br>2. '+play_record.record_array[index].ans2+'<br>3. '+play_record.record_array[index].ans3+'<br>4. '
		   	+play_record.record_array[index].ans4 +'</span><br>'+'<span style="font-size:130%;color:blue;font-family:微軟正黑體, serif;font-weight:bold;">'+'你選的是：'
		   	+play_record.record_array[index].answer + '<br>'+ '參考答案：'+play_record.record_array[index].correct +'</span>'+ '<br>'
		   	+'<span style="font-size:120%;color:black;font-family:Times New Roman,微軟正黑體;">'+'原因：' + '<br>'
		   	+play_record.record_array[index].whyans/*+'<br>'+'<input type="text" id="userans'+index+'" class="userans"  placeholder="我覺得我有更好的答案"/>'
		   	+'<input type="button" id="bn_userans'+index+'" class="bn_userans"   value="送出" onclick="userreason($(\x27#userans'+index+'\x27));">'*/+'</span>'+ divtail+ '<br>');
		}
		else{

			$("#play_record").append(  divhead+'<span style="font-size:130%;color:black;font-family:Times New Roman,微軟正黑體;font-weight:bold;">1. '+play_record.record_array[index].ans1
		  	+'<br>2. '+play_record.record_array[index].ans2+'<br>3. '+play_record.record_array[index].ans3+'<br>4. '
		   	+play_record.record_array[index].ans4 +'</span><br>'+'<span style="font-size:130%;color:blue;font-family:微軟正黑體, serif;font-weight:bold;">'+'你選的是：'
		   	+play_record.record_array[index].answer + '<br>'+ '參考答案：'+play_record.record_array[index].correct +'</span>'+ '<br>'
		   	+'<span style="font-size:120%;color:black;font-family:Times New Roman,微軟正黑體;">'+'原因：' + '<br>'
		   	+play_record.record_array[index].whyans+'<br>'+'<img id="whymask'+index+'" class="whymask" src="'+play_record.record_array[index].ans1_Img+'" onclick="sh(this)" /></a>'
		   	+ '<br>'+'</span>'+ divtail+ '<br>');

		}
	    index = index+1 ;
	 
	    
	} // while

//---放記錄放記錄放記錄放記錄放記錄放記錄放記錄放記錄放記錄放記錄放記錄放記錄放記錄放記錄放記錄放記錄放記錄放記錄/4.3
}

//------------------------------------------------------------------------------------
function sh(showimg){
	var newsrc = showimg.src;
	var maskHeight = $(window).height();
	var maskWidth = $(window).width();
	document.getElementById("whymasktopid").style.display="block";
	$('#whymasktop').attr({'src':newsrc});
	$('#whymasktop').css({'width':maskWidth,'height':maskHeight});
	$('#whymasktop').fadeIn(500);	
	$('#whymasktop').fadeTo("slow",0.9);	
	//if close button is clicked
	$('#whymasktop').click(function (e) {
			//Cancel the link behavior
		e.preventDefault();
		$('#whymasktop').hide();
	});

}

//--------------------------------------------------------------------------------------------------------------
//---------------------------------------上傳聯想式組問題理由--------------------------------------------


function userreason(id){
	var reason = id.val();
	var qid = ques_array.ques_array[cur_ques-2].qid;
	if(reason == ""){
		alertify.error("請輸入您的想法");		
	}
	else if(reason == "回覆成功"){
		alertify.error("回答已經成功轉達");		
	}

	else{
		 alertify.success('回覆成功!');
			id.val("回覆成功");	
		$.ajax({
		    url: "php/UpdateUserReason.php",
		    type: "POST",
		    //dataType: "text",
		    data: { "uid": uid,
		    		"qid": qid,
		               "reason":reason	

			           }

		  });
		}	

}



//----------------------------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------增加排行榜-------------------------------------------------------------------------------------
function AppendUserRank( msg ) {
  $(".one_friend").remove();
  user_rank = JSON.parse(msg);
  var index = 1 ;
  var divmiddle = '<br>戰力：';
  var divtail = '</div></div>' ; 
   
  while ( index <= user_rank[0] * 5 ) {  
      divhead = '<div class="one_friend"><img src="' + user_rank[index] +'" class="friend_photo" /><div class="friend_info">玩家姓名：' ;
      divmiddle = '<br>戰力：';
      divmiddle1 = '<br>等級：';
      divmiddle2 = '<br>勝率：';            
      divtail = '</div></div>' ;
      $("#user_rank").append( divhead + user_rank[index+1]+ divmiddle1+ user_rank[index+3]  + divmiddle + user_rank[index+2] + divmiddle2+ user_rank[index+4] +divtail  );
      index = index+5 ;  
  } // while


}
/*
function AppendUserRank( msg ) {
  $(".one_friend").remove();
  user_rank = JSON.parse(msg);
  var index = 1 ;
  var divmiddle = '<br>戰力：';
  var divtail = '</div></div>' ; 
   
  while ( index <= user_rank[0] * 5 ) {  
  	if(userinfo.grou == 0){
      divhead = '<div class="one_friend"><img src="' + user_rank[index] +'" class="friend_photo" /><div class="friend_info">玩家姓名：' ;
      divmiddle = '<br>戰力：';
      divmiddle1 = '<br>等級：';
      divmiddle2 = '<br>勝率：';            
      divtail = '</div></div>' ;
      $("#user_rank").append( divhead + user_rank[index+1]+ divmiddle1+ user_rank[index+3]  + divmiddle + user_rank[index+2] + divmiddle2+ user_rank[index+4] +divtail  );
  	}
	else{
      divhead = '<div class="one_friend"><img src="' + user_rank[index] +'" class="friend_photo" /><div class="friend_info">玩家姓名：' ;
      divmiddle = '<br>戰力：';
      divmiddle1 = '<br>等級：';
      divmiddle2 = '<br>勝率：';            
      divtail = '</div></div>' ;
      $("#user_rank").append( divhead + user_rank[index+1]+ divmiddle1+ user_rank[index+3]  + divmiddle + user_rank[index+2] + divmiddle2+ user_rank[index+4] +divtail  );
  	}
      index = index+5 ;  
  } // while


}
*/

//-----------------------------------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------選擇答案----------------------------------------------------------------------------------------
function ChooseAnswer( id ) {
  if ( id == 'bn_ans1' ) {
		$("#bn_ans1").append( player_choose_answer );
	} // if
	else if ( id == 'bn_ans2' ) {
		$("#bn_ans2").append( player_choose_answer );
	} // else if
    else if ( id == 'bn_ans3' ) {
		$("#bn_ans3").append( player_choose_answer );
	} // else if	
	else if ( id == 'bn_ans4' ) {
		$("#bn_ans4").append( player_choose_answer );
	} // else if

}

function CorrectAnswer( id ) {
  if ( id == 'bn_ans1' ) {
    document.getElementById("bn_ans1").style.background='#33CC66';
	if ( player_current_answer == id ) 
	  $("#process_bar").animate({ width: game_bar + "%" }, 500 ).html( game_bar + "%");

  } // if
  else if ( id == 'bn_ans2' ) {
    document.getElementById("bn_ans2").style.background='#33CC66';
	if ( player_current_answer == id ) 
	  $("#process_bar").animate({ width: game_bar + "%" }, 500 ).html( game_bar + "%");

  } // else if
  else if ( id == 'bn_ans3' ) {
    document.getElementById("bn_ans3").style.background='#33CC66';
	if ( player_current_answer == id ) 
	  $("#process_bar").animate({ width: game_bar + "%" }, 500 ).html( game_bar + "%");

  } // else if	
  else if ( id == 'bn_ans4' ) {
    document.getElementById("bn_ans4").style.background='#33CC66';
	if ( player_current_answer == id ) 
	  $("#process_bar").animate({ width: game_bar + "%" }, 500 ).html( game_bar + "%");

  } // else if

}

function ClearAnswer( id ) {
  if ( id == 'bn_ans1' ) {
    document.getElementById("bn_ans1").style.background='#ffffff';
  } // if
  else if ( id == 'bn_ans2' ) {
    document.getElementById("bn_ans2").style.background='#ffffff';
  } // else if
  else if ( id == 'bn_ans3' ) {
    document.getElementById("bn_ans3").style.background='#ffffff';
  } // else if	
  else if ( id == 'bn_ans4' ) {
    document.getElementById("bn_ans4").style.background='#ffffff';
  } // else if

}
//-----------------------------------------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------------------------------------



//--------------------------------------------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------選擇章節資料庫---------------------------------------------------------------
function SelectCourseChapter(){
  var i = 0;
  var j ;

    while ( i < 8 ) {
	  if ( course_chapter[i] == 1 )  {
	    j = i + 1;
	    cur_chapter = cur_chapter + j;
	    cur_chapter = cur_chapter + ",";
	  } // if
	  
	  i++;
	} // while
		
	cur_chapter = cur_chapter.substring( 0, cur_chapter.length-1 );

  
}
//---------------------------------------------------------------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------更新購買的技能--------------------------------------------------------------------
function UpdateUserSkill(){
	$.ajax({
	    url: "php/UpdateUserSkill.php",
	    type: "POST",
	    //dataType: "text",
	    data: { 	
	    	"uid": uid,
			"gashaimg":gashaimg,	    	
	    	"p_money":userinfo.p_money

		}

	});
  
}

//---------------------------------------------------------------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------更新購買的籤詩--------------------------------------------------------------------
function UpdateUserPmoney(){
  $.ajax({
    url: "php/UpdateUserPmoney.php",
    type: "POST",
    //dataType: "text",
    data: { "uid": uid,
         "p_money":poem_money
             }

  });
  
}

//---------------------------------------------------------------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------更新購買的技能--------------------------------------------------------------------
function UpdateUserReason(){
  $.ajax({
    url: "php/UpdateUserReason.php",
    type: "POST",
    //dataType: "text",
    data: { "uid": uid,
	           "qid":qid,
               "reason":reason	
	           }

  });
  
}


//---------------------------------------------------------------------------------------------------------------------------------------------------------------------
function ResetAllVar() {
  player_answer  = "";
  player_correct = 0;
  player_fault = 0;
  game_bar = 0;
  player_win_rate = 0;	 
  player_win = 0;
  ques_array = [];
  cur_ques = 1;
  qid = [];
  userRecord_play_answer_time = [];
  userRecord_play_answer = [];
} 
//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------
