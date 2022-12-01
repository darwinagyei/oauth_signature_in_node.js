import crypto from 'crypto';
import Config from './config.js';

const method = Config.method;
const base_url = Config.base_url;
const oauth_timestamp = Math.floor(Date.now() / 1000).toString();
const oauth_nonce = crypto.randomBytes(32).toString('hex');

const parameters = {
    oauth_consumer_key: Config.consumer_key,
    oauth_nonce: oauth_nonce,
    oauth_signature_method: 'HMAC-SHA1',
    oauth_timestamp: oauth_timestamp,
    oauth_token: Config.token,
    oauth_version: '1.0'
}

/* Creating the parameter string */
let ordered = {};
Object.keys(parameters).sort().forEach(function (key) {
    ordered[key] = parameters[key];
});

let encodedParameters = '';
for (const k in ordered) {
    let encodedValue = encodeURIComponent(ordered[k]);
    let encodedKey = encodeURIComponent(k);
    if (encodedParameters === '') {
        encodedParameters += `${encodedKey}=${encodedValue}`;
    }
    else {
        encodedParameters += `&${encodedKey}=${encodedValue}`;
    }
}


//console.log(encodedParameters);



//Creating the signture base string 
const encodedUrl = encodeURIComponent(base_url);
encodedParameters = encodeURIComponent(encodedParameters);

const signature_base_string = `${method}&${encodedUrl}&${encodedParameters}`
//console.log(signature_base_string);

//Creating a signing key
const signing_key = `${Config.consumer_secret}&${Config.token_secret}`; 
//console.log(encodedSigningKey);


//Create a signature
const oauth_signature = crypto.createHmac('sha1', signing_key).update(signature_base_string).digest().toString('base64');
//console.log(oauth_signature);

//Encoded signatue 
const encoded_oauth_signature = encodeURIComponent(oauth_signature);
//console.log(encoded_oauth_signature);


export const authorization_header = `OAuth oauth_consumer_key="${Config.consumer_key}",oauth_nonce="${oauth_nonce}",oauth_signature="${encoded_oauth_signature}", oauth_signature_method="HMAC-SHA1",oauth_timestamp="${oauth_timestamp}", oauth_token="${Config.token}", oauth_version="1.0"`
console.log(authorization_header);

