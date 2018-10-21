var littleEndian = (function() {
  var buffer = new ArrayBuffer(2);
  new DataView(buffer).setInt16(0, 256, true /* 设置值时使用小端字节序 */);
  // Int16Array 使用系统字节序，由此可以判断系统是否是小端字节序
  return new Int16Array(buffer)[0] === 256;
})();
console.log(littleEndian); // true or false

function setCommandAndLength(destBuf , length, cmd ){
	
	var tmpbuffer = new ArrayBuffer(8);
	var int32Buffer= new Uint32Array(tmpbuffer);
	int32Buffer[0] = length;
	int32Buffer[1] = cmd;
	
	if(littleEndian){
		setCorrectHeadBuf(destBuf , tmpbuffer);
	}else{
		var int8Buffer = new Uint8Array(srcBuf);
		for(var i= 0 ; i < 8 ; ++i){
			destBuf.setUint8(i , int8Buffer[i]);
		}
	}
}

function setCorrectHeadBuf(destBuf , srcBuf){
	var int8Buffer = new Uint8Array(srcBuf);
	for(var i = 0 ; i < 4 ; ++i){
		destBuf.setUint8(i , int8Buffer[3-i]);
		destBuf.setUint8(4+i , int8Buffer[7-i]);
	}
}