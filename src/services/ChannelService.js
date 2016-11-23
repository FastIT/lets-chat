import Rx from 'rxjs/Rx';
import io from 'socket.io-client'

class ChannelService {

  constructor() {

    this.username = this.getUsernameFromLS();

    this._subject = new Rx.Subject();

    this._socket = io('/general');

    // Connect and login
    this._socket.on('connect', () => {
      // Receive last messages
      this._socket.emit('user:login', this.username, (data) => {
        data.forEach( msg => this._subject.next(msg) );
      });
    });

    // Message received
    this._socket.on('user:message', (msg) => {
      this._subject.next(msg);
    });

    // User joined
    this._socket.on('user:joined', (msg) => {
      this._subject.next({
        time: msg.time,
        username: msg.username,
        text: `User ${msg.username} joined`
      });
    });

  }

  dispatch(msg) {
    this._socket.emit('message', msg);
    // socket.emit(`client:${this.id}`, msg);
  }

  subscribe(fct) {
    return this._subject.subscribe(fct);
  }

  getUsernameFromLS(){
    let userName = localStorage.getItem('username');
    if (userName === undefined || userName === '' || userName === null){
      userName = prompt('Enter your username');
      localStorage.setItem('username', userName);
    }
    return userName
  }

}

export default new ChannelService();
