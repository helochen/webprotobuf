function AwesomeObj()
{
	AwesomeObj.AwesomeMessage = null;

	AwesomeObj.register_cmd  = 10000;
	
	AwesomeObj.register = function(){
		console.log("test");
	}

	this.testReturn = function(){
		protobuf.load("../proto/awesome.proto" , function(err , root){
			if (err)
				throw err;

			var obj = root.lookupType("awesomepackage.AwesomeMessage");
			console.log("test return:"+obj);
			return obj;
		});
	}

	/*发送字节流*/
	this.sendMsg = function(payload){

		if(AwesomeObj.AwesomeMessage == null){
			console.log("Error:not register awesome object")
			protobuf.load("../proto/awesome.proto" , function(err , root){
				if (err)
					throw err;

				AwesomeObj.AwesomeMessage = root.lookupType("awesomepackage.AwesomeMessage");
				var errMsg = AwesomeObj.AwesomeMessage.verify(payload);
				if (errMsg)
					throw Error(errMsg);

				// Create a new message
				var message = AwesomeObj.AwesomeMessage.create(payload); // or use .fromObject if conversion is necessary

				// Encode a message to an Uint8Array (browser) or Buffer (node)
				var buffer = AwesomeObj.AwesomeMessage.encode(message).finish();
				// ... do something with buffer
				var designBytes = new ArrayBuffer(buffer.length + 8);
				var view = new DataView(designBytes);
				setCommandAndLength(view , buffer.length + 4 , AwesomeObj.register_cmd);
				
				for(var i= 0 ; i < buffer.length ; ++i){
					view.setUint8(8 + i, buffer[i]);
				}
				sendMsg(designBytes);	
			});
		}else{
			var errMsg = AwesomeObj.AwesomeMessage.verify(payload);
			if (errMsg)
				throw Error(errMsg);

			// Create a new message
			var message = AwesomeObj.AwesomeMessage.create(payload); // or use .fromObject if conversion is necessary

			// Encode a message to an Uint8Array (browser) or Buffer (node)
			var buffer = AwesomeObj.AwesomeMessage.encode(message).finish();
			// ... do something with buffer
			var designBytes = new ArrayBuffer(buffer.length + 8);
			var view = new DataView(designBytes);
			setCommandAndLength(view , buffer.length + 4 , AwesomeObj.register_cmd );
			
			for(var i= 0 ; i < buffer.length ; ++i){
				view.setUint8(8 + i, buffer[i]);
			}
			sendMsg(designBytes);	
		}
	}
	/**转换为对象*/
	this.decodeMsg = function(receiveMsg){
		if(AwesomeObj.AwesomeMessage == null){
			console.log("Error: AewsomeObj not init success");
		}else{
			var message = AwesomeObj.AwesomeMessage.decode(buffer);
			var object = AwesomeObj.AwesomeMessage.toObject(message, {
		        longs: String,
		        enums: String,
		        bytes: String,
		    });
		    return object;
		}
	}
};
