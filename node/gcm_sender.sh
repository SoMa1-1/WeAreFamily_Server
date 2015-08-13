server_api_key='AIzaSyAqfjMU5nCrk0AR0VHwcyHbeaZmBIvnglM'
token='fMbwTeno6DE:APA91bHYId95jA1tZISef5vV60Mj7ggDN6xN2p2V-Bko-cKtpxgYWrvjkJ6JDdZQaI7QAT14OG5soMJVIq59RyxCCtO8HlI-szyz1VgjY1QeXqu66THfIjc0bNC26e_LnTMzRqOcfKZv'
curl --header "Authorization: key=$server_api_key" \
--header Content-Type:"application/json" \
https://gcm-http.googleapis.com/gcm/send \
-d "{\"data\":{\"title\":\"saltfactory GCM demo\",\"message\":\"Google Cloud Messaging 테스트\"},\"to\":\"$token\"}
