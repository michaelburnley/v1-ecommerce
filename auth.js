const bcrypt = require('bcryptjs');

function login(pw, dbpw, a) {
	return new Promise((resolve, reject) => {
		bcrypt.compare(pw, dbpw, (err, res) => {
			if(err) {
				throw(err);
			} else {
				res ? resolve(a) : resolve(null)
			}
		});	
	})
}

function signup(pw) {
	return new Promise((resolve, reject) => {
		bcrypt.hash(pw, 10, (err, hash) => {
			if(err) {
				console.log(err);
			} else {
				resolve(hash);
			}
		});		
	})
}

module.exports.login = login;
module.exports.signup = signup;