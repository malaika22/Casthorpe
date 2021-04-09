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
      this.setupTokenRefresh();
      this.messaging.getToken().then(res=>{
          console.log(res)
      })
      this.database.ref('/fcmTokens').on('value', snapshot => {
          console.log(this.database)
        console.log('in notification resoucer')
        console.log(snapshot)
        this.allTokens = snapshot.val();
        console.log(snapshot.val())
        this.tokensLoaded = true;
      });
    }
  
    setupTokenRefresh() {
      this.messaging.onTokenRefresh(() => {
          console.log('in on token Refresh')
        this.saveTokenToServer();
      });
    }
  
    saveTokenToServer() {
      this.messaging.getToken().then(res => {
          console.log(res)
        if (this.tokensLoaded) {
          const existingToken = this.findExistingToken(res);
          console.log(existingToken)
          if (existingToken) {
              console.log(existingToken)
            this
              .database()
              .ref(`/fcmTokens/${existingToken}`)
              .set({
                token: res,
                user_id: this.user.uid
              });
          } else {
              console.log(res)
            this.registerToken(res);
          }
        }
      });
    }
  
    registerToken(token) {
      this
        .database()
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