export class UserInfo {
  constructor ({ userNameSelector, userJobSelector }) {
    this._userName = document.querySelector(userNameSelector);
    this._userJob = document.querySelector(userJobSelector);
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
    this._userJob.textContent = newData.job;
  }
}