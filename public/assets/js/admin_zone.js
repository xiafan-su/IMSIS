var effect_field_change = true;
var key_field_change = true;
var key_variable_change = true;

var effect_field1;
var key_field2;
$(document).ready(function(){
	$('#manage-effect-field').click(function(){
		hide();
		$.ajax({
			type:'POST',
			url:'handle/admin_zone.php',
			data:{
				operation:'FETCHEFFECTFIELDLIST'
			},
			success:function(data){
				$('#effect-field-list').html(data);
			}
		});
		$('#change-effect-field').show();
	});
	$('#manage-key-field').click(function(){
		hide();
		$.ajax({
			type:'POST',
			url:'handle/admin_zone.php',
			data:{
				operation:'FETCHEFFECTFIELDSELECTLIST'
			},
			success:function(data){
				$('#fetch-effect-field-list').html('<option value=0>请选择作用域</option>'+data);
				$('#key-field-list').html('');
			}
		});
		$('#change-key-field').show();
	});
	$('#fetch-effect-field-list').change(function(){
		effect_field1 = $('#fetch-effect-field-list').val()
		if(effect_field1 != 0)
			fetch_key_field_list(effect_field1);
		else
			$('#key-field-list').html('');
	});
	$('#manage-key-variable').click(function(){
		hide();
		$.ajax({
			type:'POST',
			url:'handle/admin_zone.php',
			data:{
				operation:'FETCHEFFECTFIELDSELECTLIST'
			},
			success:function(data){
				$('#fetch-effect-field-list2').html('<option value=0>请选择作用域</option>'+data);
				$('#key-variable-list').html('');
			}
		});
		$('#change-key-variable').show();
	});
	$('#fetch-effect-field-list2').change(function(){
		$.ajax({
			type:'POST',
			url:'handle/admin_zone.php',
			data:{
				operation:'FETCHKEYFIELDSELECTLIST',
				effect_field_id:$('#fetch-effect-field-list2').val()
			},
			success:function(data){
				//alert(data);
				$('#fetch-key-field-list2').html('<option value=0>请选择关键域</option>'+data);
			}
		});
	});
	$('#fetch-key-field-list2').change(function(){
		key_field2 = $('#fetch-key-field-list2').val()
		if(key_field2 != 0)
			fetch_key_variable_list(key_field2);
		else
			$('#key-variable-list').html('');
	});
	//作用域
	$('#confirm-effect-field').click(function(){
		if(effect_field_change){
			$.ajax({
				type:'POST',
				url:'handle/admin_zone.php',
				data:{
					operation:'MODIFYEFFECTFIELD',
					add:0,
					effect_field_id:$('#effect-field-id').val(),
					name:$('#effect-field-input').val()
				},
				success:function(data){
					if(data == 1){
						$('#manage-effect-field').click();
						$('#effect-field-cover').hide();
					}
				}
			});
		}
		else{
			$.ajax({
				type:'POST',
				url:'handle/admin_zone.php',
				data:{
					operation:'MODIFYEFFECTFIELD',
					add:1,
					effect_field_id:'',
					name:$('#effect-field-input').val()
				},
				success:function(data){
					if(data == 1){
						$('#manage-effect-field').click();
						$('#effect-field-cover').hide();
					}
				}
			});
		}
	});
	$('#cancel-effect-field').click(function(){
		$('#effect-field-input').val('');
		$('#effect-field-cover').hide();
	});
	//关键域
	$('#confirm-key-field').click(function(){
		if(key_field_change){
			$.ajax({
				type:'POST',
				url:'handle/admin_zone.php',
				data:{
					operation:'MODIFYKEYFIELD',
					add:0,
					effect_field_id:$('#fetch-effect-field-list').val(),
					key_field_id:$('#key-field-id').val(),
					name:$('#key-field-input').val()
				},
				success:function(data){
					if(data == 1){
						fetch_key_field_list(effect_field1);
						$('#key-field-cover').hide();
					}
				}
			});
		}
		else{
			$.ajax({
				type:'POST',
				url:'handle/admin_zone.php',
				data:{
					operation:'MODIFYKEYFIELD',
					add:1,
					effect_field_id:$('#fetch-effect-field-list').val(),
					key_field_id:'',
					name:$('#key-field-input').val()
				},
				success:function(data){
					if(data == 1){
						fetch_key_field_list(effect_field1);
						$('#key-field-cover').hide();
					}
					else
						alert(data);
				}
			});
		}
	});
	$('#cancel-key-field').click(function(){
		$('#key-field-input').val('');
		$('#key-field-cover').hide();
	});
	//关键域
	$('#confirm-key-variable').click(function(){
		if(key_variable_change){
			$.ajax({
				type:'POST',
				url:'handle/admin_zone.php',
				data:{
					operation:'MODIFYKEYVARIABLE',
					add:0,
					key_field_id:$('#fetch-key-field-list2').val(),
					key_variable_id:$('#key-variable-id').val(),
					question:$('#key_variable_question').val(),
					answer_a:$('#key_variable_a').val(),
					answer_b:$('#key_variable_b').val(),
					answer_c:$('#key_variable_c').val(),
					answer_d:$('#key_variable_d').val(),
					answer_e:$('#key_variable_e').val()
				},
				success:function(data){
					if(data == 1){
						fetch_key_variable_list(key_field2);
						$('#key-variable-cover').hide();
					}
					else 
						alert(data);
				}
			});
		}
		else{
			$.ajax({
				type:'POST',
				url:'handle/admin_zone.php',
				data:{
					operation:'MODIFYKEYVARIABLE',
					add:1,
					key_field_id:$('#fetch-key-field-list2').val(),
					key_variable_id:'0',
					question:$('#key_variable_question').val(),
					answer_a:$('#key_variable_a').val(),
					answer_b:$('#key_variable_b').val(),
					answer_c:$('#key_variable_c').val(),
					answer_d:$('#key_variable_d').val(),
					answer_e:$('#key_variable_e').val()
				},
				success:function(data){
					if(data == 1){
						fetch_key_variable_list(key_field2);
						$('#key-variable-cover').hide();
					}
					else 
						alert(data);
				}
			});
		}
	});
	$('#cancel-key-variable').click(function(){
		$('#key-variable-input').val('');
		$('#key-variable-cover').hide();
	});
	
	
	
	$('#manage-target').click(function(){
		hide();
		fetch_target_form();
		$('#target-change').show();
	});
});
function fetch_key_field_list(t){
	$.ajax({
		type:'POST',
		url:'handle/admin_zone.php',
		data:{
			operation:'FETCHKEYFIELDLIST',
			effect_field_id:t
		},
		success:function(data){
			$('#key-field-list').html(data);
		}
	});
}
function fetch_key_variable_list(t){
	//alert(t);
	$.ajax({
		type:'POST',
		url:'handle/admin_zone.php',
		data:{
			operation:'FETCHKEYVARIABLELIST',
			key_field_id:t
		},
		success:function(data){
			//alert(data);
			$('#key-variable-list').html(data);
		}
	});
}
//这里是作用域的操作
function delete_effect_field(t){
	alert('警告！此操作不可逆！');
	alert('删除后你将再也看不到与该关键域相关的东西');
	var returnType = window.confirm('确认删除吗？')
	if(returnType){
		$.ajax({
			type:'POST',
			url:'handle/admin_zone.php',
			data:{
				operation:'DELETEEFFECTFIELD',
				effect_field_id:t.parentNode.id
			},
			success:function(data){
				if(data == 1){
					alert('删除成功');
					$('#manage-effect-field').click();
				}
				else
					alert(data);
			}
		});
	} 
}
function modify_effect_field(t){
	//alert($(t.parentNode).text().substr(0,$(t.parentNode).text().length-22));
	effect_field_change = true;
	$('#effect-field-title').text('修改作用域名称');
	$('#effect-field-id').val(t.parentNode.id);
	
	$('#effect-field-input').val($(t.parentNode).text().substr(0,$(t.parentNode).text().length-25));
	$('#effect-field-cover').show();
}
function add_effect_field(){
	effect_field_change = false;
	$('#effect-field-input').val('');
	$('#effect-field-title').text('新的作用域名称');
	$('#effect-field-cover').show();
}
function show_hide_effect_field(t){
	var temp;
	if($(t).text() == '显示'){
		temp = 1;
	}
	else
		temp = 0;
	$.ajax({
		type:'POST',
		url:'handle/admin_zone.php',
		data:{
			operation:'SHOWORHIDEEFFECTFIELD',
			effect_field_id:t.parentNode.id,
			available:temp
		},
		success:function(data){
			if(data == 1){
				if(temp == 1)
					$(t).text('隐藏');
				else
					$(t).text('显示');
			}
			else{
				alert(data);
			}
		}
	});
}
//这里是关键域的操作
function delete_key_field(t){
	alert('警告！此操作不可逆！');
	alert('删除后你将再也看不到与该关键域相关的东西');
	var returnType = window.confirm('确认删除吗？')
	if(returnType){
		$.ajax({
			type:'POST',
			url:'handle/admin_zone.php',
			data:{
				operation:'DELETEKEYFIELD',
				key_field_id:t.parentNode.id
			},
			success:function(data){
				if(data == 1){
					fetch_key_field_list(effect_field1);
				}
				else
					alert(data);
			}
		});
	} 
}
function modify_key_field(t){
	//alert($(t.parentNode).text().substr(0,$(t.parentNode).text().length-22));
	key_field_change = true;
	$('#key-field-title').text('修改关键域名称');
	$('#key-field-id').val(t.parentNode.id);
	$('#key-field-input').val($(t.parentNode).text().substr(0,$(t.parentNode).text().length-25));
	$('#key-field-cover').show();
}
function add_key_field(){
	key_field_change = false;
	$('#key-field-input').val('');
	$('#key-field-title').text('新的关键域名称');
	$('#key-field-cover').show();
}
function show_hide_key_field(t){
	var temp;
	if($(t).text() == '显示'){
		temp = 1;
	}
	else
		temp = 0;
	
	$.ajax({
		type:'POST',
		url:'handle/admin_zone.php',
		data:{
			operation:'SHOWORHIDEKEYFIELD',
			key_field_id:t.parentNode.id,
			available:temp
		},
		success:function(data){
			if(data == 1){
				if(temp == 1)
					$(t).text('隐藏');
				else
					$(t).text('显示');
			}
			else{
				alert(data);
			}
		}
	});
}
//关键变量
function delete_key_variable(t){
	alert('警告！此操作不可逆！');
	alert('删除后你将再也看不到与该关键域相关的东西');
	var returnType = window.confirm('确认删除吗？')
	if(returnType){
		$.ajax({
			type:'POST',
			url:'handle/admin_zone.php',
			data:{
				operation:'DELETEKEYVARIABLE',
				key_variable_id:t.parentNode.id
			},
			success:function(data){
				if(data == 1){
					fetch_key_variable_list(key_field2);
				}
				else
					alert(data);
			}
		});
	} 
}
function modify_key_variable(t){
	//alert($(t.parentNode).text().substr(0,$(t.parentNode).text().length-22));
	key_variable_change = true;
	$('#key-variable-title').text('修改关键域名称');
	$('#key-variable-id').val(t.parentNode.id);
	$.ajax({
		type:'POST',
		url:'handle/admin_zone.php',
		data:{
			operation:'FETCHKEYVARIABLEDETAIL',
			key_variable_id:t.parentNode.id
		},
		success:function(str){
			//alert(str);
			var data = jQuery.parseJSON(str);
			$('#key_variable_question').val(data.question);
			$('#key_variable_a').val(data.answer_a);
			$('#key_variable_b').val(data.answer_b);
			$('#key_variable_c').val(data.answer_c);
			$('#key_variable_d').val(data.answer_d);
			$('#key_variable_e').val(data.answer_e);
		}
	});
	$('#key-variable-cover').show();
}
function add_key_variable(){
	key_variable_change = false;
	$('#key-variable-title').text('新的关键域名称');
	$('#key_variable_question').val('');
	$('#key_variable_a').val('');
	$('#key_variable_b').val('');
	$('#key_variable_c').val('');
	$('#key_variable_d').val('');
	$('#key_variable_e').val('');
	$('#key-variable-cover').show();
}
function show_hide_key_variable(t){
	var temp;
	if($(t).text() == '显示'){
		temp = 1;
	}
	else
		temp = 0;
	
	$.ajax({
		type:'POST',
		url:'handle/admin_zone.php',
		data:{
			operation:'SHOWORHIDEKEYVARIABLE',
			key_variable_id:t.parentNode.id,
			available:temp
		},
		success:function(data){
			if(data == 1){
				if(temp == 1)
					$(t).text('隐藏');
				else
					$(t).text('显示');
			}
			else{
				alert(data);
			}
		}
	});
}

function fetch_target_form(){
	$.ajax({
		type:'POST',
		url:'handle/admin_zone.php',
		data:{
			operation:'FETCHGOALTABLE'
		},
		success:function(str){
			alert(str);
			var data = jQuery.parseJSON(str);
			var table = '';
			table += '<tr style="text-align:center">';
			table += '<th>作用域(一级指标)</th><th>关键域(二级指标)</th><th colspan=5>组织的成熟度水平</th>';
			table += '</tr>';
			table += '<tr>';
			table += '<td></td><td></td>';
			table += '<td>成熟度1级</td><td>成熟度2级</td><td>成熟度3级</td><td>成熟度4级</td><td>成熟度5级</td>';
			table += '</tr>';
			
			var i;
			for(i=0;i<data.content.length;i++){
				var j;
				for(j=0;j<data.content[i].content.length;j++){
					table += '<tr>';
					if(j == 0)
						table += '<td>'+data.content[i].title+'</td>';
					else
						table += '<td></td>';
					table += '<td>'+data.content[i].content[j].title+'</td>';
					table += '<td><input type="text" id="id-'+data.content[i].id+'-1" value="'+data.content[i].content[j].content[0]+'" /></td>';
					table += '<td style="background:rgb(253,253,217)"><input type="text" id="id-'+data.content[i].id+'-2" value="'+data.content[i].content[j].content[1]+'" /></td>';
					table += '<td style="background:rgb(235,241,222)"><input type="text" id="id-'+data.content[i].id+'-3" value="'+data.content[i].content[j].content[2]+'" /></td>';
					table += '<td style="background:rgb(242,220,219)"><input type="text" id="id-'+data.content[i].id+'-4" value="'+data.content[i].content[j].content[3]+'" /></td>';
					table += '<td style="background:rgb(220,230,241)"><input type="text" id="id-'+data.content[i].id+'-5" value="'+data.content[i].content[j].content[4]+'" /></td>';
					table += '</tr>';
				}
			}
			$('#target-table').html(table)
			
			$(':text').each(function(){
				var id = this.id.split('-');
				if(id[0] == 'id'){
					$(this).blur(function(){
						$.ajax({
							type:'POST',
							url:'handle/admin_zone.php',
							data:{
								operation:'',
								
							},
							success:function(data){
								alert(data);
							}
						});
					});
				}
			});
		}
	});
}
function hide(){
	$('#target-change').hide();
	$('#change-effect-field').hide();
	$('#change-key-field').hide();
	$('#change-key-variable').hide();
}