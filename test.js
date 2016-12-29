'use strict';

//Deleted some funcions.
//Changed the users ana password arrays for an Array of objects, for simplicity.
//Deleted de idx function, insted, I used the es6 findIndex method.
//added console logs
//etc, etc

// This class is used for logins
class Login {

	constructor(hash) {

		this.sessions = [];
		this.users = [];

		Object.keys(hash).map((e, k) => {

			let user = {};
			user.userName = e;
			user.password = hash[e];

			this.users.push(user);

		});

	}

	logout(user) {

		let index = this.sessions.findIndex(e => e == user);

		if(index !== -1)
			this.sessions.splice(index, 1);
		
		console.log('Logout: ' + this.sessions);

	}

	// Register user
	registerUser(user, password) {

		this.users.push({userName: user, password: password});
		
		console.log('User registered: ' + JSON.stringify(this.users));

	}

	removeUser(user) {

		let index = this.users.findIndex(e => e.userName === user);

		if(index !== -1)
			this.users.splice(index, 1);
		
		console.log('Removed: ' + JSON.stringify(this.users));

	}

	updatePassword(user, oldPassword, newPassword) {

		let index = this.users.findIndex(e => e.userName === user);

		if(index === -1 || this.users[index].password !== oldPassword){
			return false;
		}

		this.users[index].password = newPassword;
		
		console.log('Password updated: ' + this.users[index].password);

		return true;

	}

	login(user, password) {
		
		let index = this.users.findIndex(e => e.userName === user);

		if (index !== -1 && this.users[index].password === password) {
		  this.sessions.push(user);
		}
		
		console.log('User logged: ' + this.sessions);

	}


}

let registeredUsers = {
	user1: 'pass1',
	user2: 'pass2',
	user3: 'pass3'
};

let login = new Login(registeredUsers);

login.registerUser('user4', 'pass4');
login.login('user4', 'pass4');
login.updatePassword('user3', 'pass3', 'pass5');
login.login('user3', 'pass5');
login.logout('user4');
login.logout('user3');
login.removeUser('user1');
