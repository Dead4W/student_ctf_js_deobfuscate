# ([Night mode task](https://student.ctf.su/nightmode)

## Solution:
* get ip from ([DNS Google resolve](https://dns.google.com/resolve?name=doyouwannaseestudentmagic.space)
* get aes key from http://{IP}:5000/get_aes_key
* get cookie from http://{IP}:5000/get_cookie
* Reverse obfuscator
* base64decode -> aes block decrypt -> deobfuscate
