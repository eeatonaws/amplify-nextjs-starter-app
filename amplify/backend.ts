import * as s3 from 'aws-cdk-lib/aws-s3';
import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource.js';
import { data } from './data/resource.js';
import { storage } from './storage/resource.js';

const backend = defineBackend({
  auth,
  data,
  storage
});

// create the bucket and its stack
/*const bucketStack = backend.createStack('BucketStack');
const bucket = new s3.Bucket(bucketStack, 'Bucket', {
  blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL
});*/

// allow any authenticated user to read and write to the bucket
const authRole = backend.auth.resources.authenticatedUserIamRole;
backend.storage.resources.bucket.grantReadWrite(authRole);
//bucket.grantReadWrite(authRole);

// allow any guest (unauthenticated) user to read from the bucket
const unauthRole = backend.auth.resources.unauthenticatedUserIamRole;
backend.storage.resources.bucket.grantRead(unauthRole);
//bucket.grantRead(unauthRole);
