import { Injectable } from '@angular/core';
import { LocalService, SessionService } from '@core';

export interface Credentials {
  // Customize received credentials here
  userid: string;
  username: string;
  token: string;
  usernamedescrip: string;
  profile: string;
  Status: string;
}

const credentialsKey = 'credentials';

/**
 * Provides storage for authentication credentials.
 * The Credentials interface should be replaced with proper implementation.
 */
@Injectable({
  providedIn: 'root',
})
export class CredentialsService {
  private _credentials: Credentials | null = null;

  constructor(private localService: LocalService, private sessionService: SessionService) {
    // const savedCredentials = sessionStorage.getItem(credentialsKey) || localStorage.getItem(credentialsKey);
    const savedCredentials = sessionService.getJsonValue(credentialsKey) || localService.getJsonValue(credentialsKey);
    if (savedCredentials) {
      // this._credentials = JSON.parse(savedCredentials);
      this._credentials = savedCredentials;
    }
  }

  /**
   * Checks is the user is authenticated.
   * @return True if the user is authenticated.
   */
  isAuthenticated(): boolean {
    return !!this.credentials;
  }

  /**
   * Gets the user credentials.
   * @return The user credentials or null if the user is not authenticated.
   */
  get credentials(): Credentials | null {
    return this._credentials;
  }

  /**
   * Sets the user credentials.
   * The credentials may be persisted across sessions by setting the `remember` parameter to true.
   * Otherwise, the credentials are only persisted for the current session.
   * @param credentials The user credentials.
   * @param remember True to remember credentials across sessions.
   */
  setCredentials(credentials?: Credentials, remember?: boolean) {
    this._credentials = credentials || null;

    if (credentials) {
      // const storage = remember ? localStorage : sessionStorage;
      // storage.setItem(credentialsKey, JSON.stringify(credentials));
      const storage = remember ? this.localService : this.sessionService;
      storage.setJsonValue(credentialsKey, credentials);
    } else {
      // sessionStorage.removeItem(credentialsKey);
      // localStorage.removeItem(credentialsKey);
      this.localService.remoteItem(credentialsKey);
      this.sessionService.remoteItem(credentialsKey);
    }
  }
}
