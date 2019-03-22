/*
* @Author: TomChen
* @Date:   2019-03-20 19:30:06
* @Last Modified by:   TomChen
* @Last Modified time: 2019-03-20 19:45:26
*/
//Buffer是用来存放二进制数据的容器
const buf = Buffer.from('hello');

//一个二进制的0 或者 1 代表了 1bit(位)
//8bit(位) = 1B(字节) =  2个16进制数
//00000000 - 11111111
//0 - 255
//00 - ff
//1个英文字符 = 1B
console.log(buf);//<Buffer 68 65 6c 6c 6f>

//1个汉字 = 3B
const buf2 = Buffer.from('你好好');
console.log(buf2);//<Buffer e4 bd a0 e5 a5 bd e5 a5 bd>

const buf3 = Buffer.alloc(10);
console.log(buf3);//<Buffer 00 00 00 00 00 00 00 00 00 00>
buf3[0] = 10;
console.log(buf3);//<Buffer 0a 00 00 00 00 00 00 00 00 00>
buf3[1] = 0x10;
console.log(buf3);//<Buffer 0a 10 00 00 00 00 00 00 00 00>
buf3[9] = 9;
console.log(buf3.toString());

const buf4 = Buffer.alloc(9);
buf4[0] = 0xe4;
buf4[1] = 0xbd;
buf4[2] = 0xa0;
console.log(buf4.toString());









