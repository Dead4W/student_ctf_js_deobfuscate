# ([Night mode task](https://student.ctf.su/nightmode)

## Solution:
* get ip from ([DNS Google resolve](https://dns.google.com/resolve?name=doyouwannaseestudentmagic.space)
* get aes key from http://{IP}:5000/get_aes_key
* get cookie from http://{IP}:5000/get_cookie
* Reverse obfuscator

```javascript
	function obfuscate(){
		var hex, tmp, result = "";
		for (i=0; i<cookie.length; i++) {
			hex = cookie.charCodeAt(i).toString(16);
			tmp = "000"+hex;
			first_part=(tmp).slice(-4,-2);
			second_part=(tmp).slice(-2);
			if (first_part > "7F"){
			  result += ("0x"+first_part-1).toString(16)
			}
			else{ 
				result +=("0"+(parseInt(first_part,16)+1).toString(16)).slice(-2)}
			if (tmp.slice(-2) > "7F"){
				result+=("0x"+second_part-1).toString(16)
			}
			else{ 
				result += ("0"+(parseInt(second_part,16)+1).toString(16)).slice(-2)}
		}


		for (j=0; j<(key.match(/F/g) || []).length; j++){
		tmp = "";
			if (result.length%(10+j)!=0){
				result="0".repeat(10-result.length%10) + result
			}
			for (var i = 0; i < result.length; i+=10+j) {
			   if (parseInt(result.substring(i,i+10),16)%2==0){
				tmp+=("0000000000"+(parseInt(result.substring(i,i+10),16)/2).toString(16)).slice(-10)+result.substring(i+10,i+10+j)+"x"
			}
			   else{
				tmp+=("0000000000"+(parseInt(result.substring(i,i+10),16)-"1").toString(16)).slice(-10)+result.substring(i+10,i+10+j)+"y"
			}
			}
		result = tmp;
		}
		encrypt(result)
	}	
```

* base64decode -> aes block decrypt -> deobfuscate
