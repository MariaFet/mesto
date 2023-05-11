export class UserInfo {
  constructor ({ userNameSelector, userJobSelector, userAvatarSelector }) {
    this._userName = document.querySelector(userNameSelector);
    this._userJob = document.querySelector(userJobSelector);
    this._userAvatar = document.querySelector(userAvatarSelector);
  }

  getUserInfo () {
    this._userData = {
      name: this._userName.textContent,
      job: this._userJob.textContent
    };
    return this._userData;
  }

  setUserInfo (newData) {
    this._userName.textContent = newData.name;
    this._userJob.textContent = newData.about;
  }

  setAvatar (link) {
    this._userAvatar.src = link.avatar;
  }
}