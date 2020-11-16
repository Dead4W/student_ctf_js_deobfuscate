key = "2F423F4528482B4D6251655468566D59";
encrypted_cookie=atob("JQb6BcUCAScl8x1FxQQ2WJwQNsIDAjYnJQyA+YYHFfCGT4C9JYUV3pye+pCcBO4OJQb6BcUCHSclSzbtxQQiWJxPNsacAjYnJQwd+YYHFc4lQQG9xfwV3pwP+pCcBO4OJQb6BeQCHYSGDCLtwQQ2WNYGNhPpAiInJQwdFiWaFeIlEB29JQIV3pw7+pCcBB0O");

function deobfuscate(input){
	var hex, tmp, result = input;
	
	var j_len = (key.match(/F/g) || []).length;
	
	for (j=j_len; j>0; j--){
		tmp = "";
		for (var i = 0; i < result.length; i+=10+j) {
			let c = result.substring(i+10+j-1,i+10+j);
			let segment = "";
			
			if (c == 'x'){
				segment=((parseInt(result.substring(i,i+10),16)*2).toString(16))
			}
		   else{
				segment=((parseInt(result.substring(i,i+10),16)+1).toString(16))
			}
			
			if (segment.length < 10){
				segment="0".repeat(10-segment.length) + segment
			}
			
			segment = segment.slice(-10)+result.substring(i+10,i+10+j-1);
			
			tmp += segment;
		}
		result = tmp;
	}
	
	result = result.replace(/^0+/, '0');
	
	tmp = "";
	
	for (i=0; i<result.length/4; i++) {
		parts = result.substr(4*i, 4);
		
		first_part=(parts).slice(-4,-2);
		second_part=(parts).slice(-2);
		
		if (first_part > "7F"){
			first_part= (parseInt(first_part,16)+1).toString(16)
		}
		else{ 
			first_part= ((parseInt(first_part,16)-1).toString(16));
		}
		
		if (second_part > "7F"){
			second_part= (parseInt(second_part,16)+1).toString(16);
		}
		else{ 
			second_part= ((parseInt(second_part,16)-1).toString(16));
		}
		hex = "0x" + first_part + second_part;
		tmp += String.fromCharCode(hex);
	}
	
	result = tmp;
	
	return result;
}

decrypt_cookie = "";

AES_Init();
AES_ExpandKey(key);

for (var i = 0; i < encrypted_cookie.length; i+=16) {
	var block = new Array(16);
	block = encrypted_cookie.substring(i,i+16).split('').map(x=>x.charCodeAt(0)); 
	AES_Decrypt(block, key) 
	decrypt_cookie+= String.fromCharCode.apply(null, block);
}


console.log(deobfuscate(decrypt_cookie));