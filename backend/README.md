## MVC Design Pattern 

1. MVC stands for Model, Views and Controller
2. Model contains the database logic
3. Views render the frontend part
4. Controller manages the HTTP requests and responses and acts as a middleman between model
and views

## Hashing

1. Process of encryption of data using a function and key.
2. No need to store OTP at database to verify it
3. Hash the otp and other data using hashing and verify it using same hash function and key.

## JWT tokens

1. Json Web Tokens is a standard for securely transmitting information between two parties
as a JSON object.
2. JWT are trusted because they are digitally signed using secret key (HMAC algorithm) or using
public/private key pair using RSA or ECDSA
3. Scenarios :
    - Authorization : Once user is signed in we can include JWT in each request made,allowing to 
    include functionality of protected routes and provided access to limited services
    - Information Validity : Since they are digitally signed we can assured that parties identities are verified

4. JWT structure :- JWT contains three things in given format
    
    ```python 
        xxxxx.yyyyy.zzzzz 
    ```

    - Header - contains algorithm name and type of token
        ```javascript
            {
                "alg" : "HS256",
                "typ" : "JWT"
            }
        ```
    - Payload 
        - contains bulk of JWT, also called JWT claims
        - Where we put information we need to transmit and other important informations
        - We can provide multiple claims of public, private and registered
        ```javascript
            iss: "Scott",
            exp : 12412412,
            name : "Admin"
            activated : true
        ```
    - Signature - contains the signature for verification made by hashing three components
        - header + payload + secretKey
        - SecretKey is held by server

    - All of the Parts of JWT tokens are individually encoded in Base64URl and forms a above structure of
    ```xxx.yyy.zzz``` which is transmitted further.

5. Access Token 
    - Short lived tokens to gain access to resources and protected routes
    - Don't store them as cookies or in local storage. Store them in memory

6. Refresh Token 
    - Longer duration tokens used to obtain renewed access token
    - sent as httpOnly cookie which is not accessible by javascript
    - It must have expiration times 
