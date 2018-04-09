//Using BCRYPT to HASH Passwords before storing in database
const bcrypt = require('bcryptjs');

//Compares inputted password to hash stored in database and returns a promise to be resolved in server.js
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

//Hashes user inputted password on sign-up screen and returns a promise to be resolved in server.js
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