import {config} from "./index";

class Facebook {
  constructor() {
    window.fbAsyncInit = function() {
      window.FB.init({
        appId      : config.get('REACT_APP_FB_APP_ID'),
        cookie     : true,
        xfbml      : true,
        version    : 'v4.0'
      });
      window.FB.AppEvents.logPageView();
    };

    (function(d, s, id){
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {return;}
      js = d.createElement(s); js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  }

  checkIsLoggedIn() {
    return new Promise(resolve => {
      window.FB.getLoginStatus(function(response) {
        if (response.status === 'connected') {
          return resolve(true);
        } else {
          window.FB.login((response) => {
            if (response.status === 'connected') {
              return resolve(true);
            }
            resolve(false)
          }, {
            scope: [
              'manage_pages',
              'business_management',
              'ads_management',
              'leads_retrieval',
            ],
          });
        }
      });
    });
  }

  getAdsAccounts() {
    return new Promise((resolve, reject) => {
      try {
        window.FB.api('/me/adaccounts?fields=name,account_id', ({ data , paging }) => {
          if (data && data.length) {
            resolve(data);
          }
          resolve([]);
        });
      } catch (e) {
        reject(e);
      }
    });
  }

  getAccountPages() {
    return new Promise((resolve, reject) => {
      try {
        window.FB.api('/me/accounts', ({ data , paging }) => {
          if (data && data.length) {
            resolve(data);
          }
          resolve([]);
        });
      } catch (e) {
        reject(e);
      }
    })
  }

  getPageFormsBy(pageId, pageAccessToken) {
    return new Promise((resolve, reject) => {
      try {
        window.FB.api(`/${pageId}/leadgen_forms`, { access_token: pageAccessToken }, ({ data, paging }) => {
          if (data && data.length) {
            const forms = data.map(form => ({ key: form.id, text: form.name, value: form }));
            return resolve(forms);
          }
          resolve([]);
        });
      } catch (e) {
        reject(e);
      }
    });
  }

  subscribeToPageNotificationBy(pageId, pageAccessToken) {
    return new Promise(resolve => {
      window.FB.api(
        `/${pageId}/subscribed_apps`, 'post', {
          access_token: pageAccessToken,
          subscribed_fields: 'leadgen',
        }, (response) => {
          if (!response.success) {
            return resolve(false);
          }
          resolve(true);
        });
    });
  }
}

export default new Facebook();
