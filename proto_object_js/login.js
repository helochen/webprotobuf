function Login(){
	// org.share.tunnel.proto.login.
	Login.roleLoginRequest_cmd = 10000;
	Login.roleLoginRequest = null;

	Login.roleLoginResponse_cmd = 10001;
	Login.roleLoginResponse = null;

	Login.roleLoginOutRequest_cmd = 10002;
	Login.roleLoginOutRequest = null;

	Login.roleLoginOutResponse_cmd = 10003;
	Login.roleLoginOutResponse = null;


	this.login = function(loginInfo) {
		if(Login.roleLoginRequest == null ) {
			protobuf.load("../proto/login.proto" , function(err , root){
				if (err)
					throw err;

				Login.roleLoginRequest = root.lookupType("org.share.tunnel.proto.login.roleLoginRequest");

				var errMsg = Login.roleLoginRequest.verify(loginInfo);
				if (errMsg)
					throw Error(errMsg);

				// Create a new message
				var message = Login.roleLoginRequest.create(loginInfo); // or use .fromObject if conversion is necessary

				// Encode a message to an Uint8Array (browser) or Buffer (node)
				var buffer =Login.roleLoginRequest.encode(message).finish();
				// ... do something with buffer
				var designBytes = new ArrayBuffer(buffer.length + 8);
				var view = new DataView(designBytes);
				setCommandAndLength(view , buffer.length + 4 , Login.roleLoginRequest_cmd);
				
				for(var i= 0 ; i < buffer.length ; ++i){
					view.setUint8(8 + i, buffer[i]);
				}
				sendMsg(designBytes);	
			});
		}else {
			var errMsg = Login.roleLoginRequest.verify(loginInfo);
				if (errMsg)
					throw Error(errMsg);

				// Create a new message
				var message = Login.roleLoginRequest.create(loginInfo); // or use .fromObject if conversion is necessary

				// Encode a message to an Uint8Array (browser) or Buffer (node)
				var buffer =Login.roleLoginRequest.encode(message).finish();
				// ... do something with buffer
				var designBytes = new ArrayBuffer(buffer.length + 8);
				var view = new DataView(designBytes);
				setCommandAndLength(view , buffer.length + 4 , Login.roleLoginRequest_cmd);
				
				for(var i= 0 ; i < buffer.length ; ++i){
					view.setUint8(8 + i, buffer[i]);
				}
				sendMsg(designBytes);
		}
	}
}