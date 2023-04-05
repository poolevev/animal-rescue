class User {
    constructor(user, pass) {
        this.username = user;
        this.pass = pass;
    }
}


class UserManager {
    

    constructor() {
        let logUser = JSON.parse(localStorage.getItem('foundUser'));
        if (logUser) {
            this.loggedUser = new User(logUser.username, logUser.pass);
        }
    }
    loggedUser = null;


    users = [new User('user1', 'pass1'), new User('user2', 'pass2')];


    login = ({ username, pass }) => {
        let foundUser = this.users.find(user => user.username === username &&
            user.pass === pass
        );
        if (foundUser) {
            this.loggedUser = foundUser;
            localStorage.setItem('foundUser', JSON.stringify(this.loggedUser));
            return true;
        }

        return false;
    }

    register = ({ username, pass }) => {
        let foundUser = this.users.find(user => user.username === username);

        if (!foundUser) {
            this.users.push(new User(username, pass));
            return true;
        }

        return false;

    }


}