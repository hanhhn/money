keytool -exportcert -alias androiddebugkey -keystore "C:\Users\hanhhn\.android\debug.keystore" | "C:\openssl\bin\openssl" sha1 -binary | "C:\openssl\bin\openssl" base64

keytool -exportcert -alias androiddebugkey -keystore "C:\Users\hanhhn\Desktop\money\android\app\debug.keystore" | "C:\openssl\bin\openssl" sha1 -binary | "C:\openssl\bin\openssl" base64