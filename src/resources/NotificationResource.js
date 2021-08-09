export default class NotificationResource {
  allTokens = [];
  tokensLoaded = false;
  user = null;
  

  constructor(messaging, database) {
    this.messaging = messaging;
    this.database = database;
          try {
        this.messaging
          .requestPermission()
          .then(res => {
            console.log('Permission granted');
          })
         .catch(err => {
          console.log('no access', err);
          });
      } catch(err) {
        console.log('No notification support.', err);
      };
      this.messaging.getToken().then(res=>{
        console.log(res)
      })
      //this.saveTokenToServer()
   
    this.database.ref('/fcmTokens').on('value', snapshot => {
      console.log("in database fcm")
      this.allTokens = snapshot.val();
      console.log("token will be true")
      this.tokensLoaded = true;
      console.log(this.tokensLoaded)
      this.saveTokenToServer()
    });
    //this.saveTokenToServer()
    //this.setupTokenRefresh()
  }

  setupTokenRefresh() {
    console.log("token refresh")
    this.messaging.onTokenRefresh(() => {
      console.log("on token refrest")
      this.saveTokenToServer();
    });
  }

  saveTokenToServer() {
    this.messaging.getToken().then(res => {
      console.log("in save token")
      console.log(this.tokensLoaded)
      if (this.tokensLoaded) {
        console.log("tokens loaded")
        const existingToken = this.findExistingToken(res);
        if (existingToken) {
          console.log("in existing token")
          this.database
            .ref(`/fcmTokens/${existingToken}`)
            .set({
              token: res,
              user_id: this.user.uid
            });
        } else {
          this.registerToken(res);
        }
      }
    });
  }

  registerToken(token) {
    console.log(this.user)
    console.log("in register token")
    this.database
      .ref('fcmTokens/')
      .push({
        token: token,
        user_id: this.user.uid
      });
  }

  findExistingToken(tokenToSave) {
    for (let tokenKey in this.allTokens) {
      const token = this.allTokens[tokenKey].token;
      if (token === tokenToSave) {
        return tokenKey;
      }
    }
    return false;
  }

  changeUser(user) {
    this.user = user;
    this.saveTokenToServer();
  }
}