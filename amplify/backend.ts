import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource.js';
import { data } from './data/resource.js';
import { storage } from './storage/resource.js';

const backend = defineBackend({
  auth,
  data,
  storage
});

const authRole = backend.auth.resources.authenticatedUserIamRole;
backend.storage.resources.bucket.grantReadWrite(authRole);

const unauthRole = backend.auth.resources.unauthenticatedUserIamRole;
backend.storage.resources.bucket.grantRead(unauthRole);
