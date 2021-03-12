import {
  AuthServiceConfig,
  FacebookLoginProvider,
  GoogleLoginProvider
} from 'angularx-social-login';

export function getAuthServiceConfigs() {
  let config = new AuthServiceConfig([
    {
      id: FacebookLoginProvider.PROVIDER_ID,
      provider: new FacebookLoginProvider('892603268162947')
    },
    {
      id: GoogleLoginProvider.PROVIDER_ID,
      provider: new GoogleLoginProvider('926623613180-gq71thfhju27rtqpbjlh81bagp8p9i2h.apps.googleusercontent.com')
    }
  ]);

  return config;
}
