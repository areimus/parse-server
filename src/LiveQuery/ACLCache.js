import { loadAdapter } from '../Adapters/AdapterLoader';

import {
  RedisCacheAdapter
} from '../Adapters/Cache/RedisCacheAdapter';

class ACLCache {
  cache: Object;

  constructor(ctx, ttl) {
    this.cache = new RedisCacheAdapter(ctx, ttl);
  }

  hasReadAccess(sessionToken, role) {
    return new Parse.Promise((resolve, reject) => {
      this.cache.get(`${sessionToken}:${role}`).then((hasAccess) => {
        if (hasAccess == '1') {
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });
  }

  setHasReadAccess(sessionToken, role) {
    this.cache.put(`${sessionToken}:${role}`, 1);
  }
}

export {
  ACLCache
}
