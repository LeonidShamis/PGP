# Using JPGPJ Java GPG Library

Refer to [JPGPJ](https://github.com/justinludwig/jpgpj) for more details.

### Requirements:

  - Java SE - https://www.oracle.com/technetwork/java/javase/downloads/index.html
  - Maven - https://maven.apache.org/download.cgi

### Assumptions:

  - Sender - Alice (alice@example.com, passphrase for the secret key = "AlicePassword123")
  - Recipient - Bob (bob@example.com, passphrase for the secret key = "BobPassword123")
  - Keys:
    ../keys/alice-secret-key.asc    - Alice private key
    ../keys/alice-public-key.asc    - Alice public key
    ../keys/bob-secret-key.asc      - Bob private key
    ../keys/bob-public-key.asc      - Bob public key

### Steps:

  - build
  - sign and encrypt message from Alice to Bob
  - decrypt and verify message

### Commands:

#### list keys

$ ls ../keys
alice-public-key.asc  alice-secret-key.asc  bob-public-key.asc  bob-secret-key.asc
$

#### compile

$ mvn compile -q
$

#### sign and encrypt message from Alice to Bob

$ cat ../message-alice-to-bob.txt
Message from Alice to Bob...
$

$ mvn exec:java -Dexec.mainClass="com.example.EncryptAndSign" -q
16:56:24.761 [com.example.EncryptAndSign.main()] INFO org.c02e.jpgpj.Encryptor - using encryption key sec+ed FB322F6B
16:56:24.791 [com.example.EncryptAndSign.main()] INFO org.c02e.jpgpj.Encryptor - using encryption key pub e  F8DF4D46
16:56:25.346 [com.example.EncryptAndSign.main()] INFO org.c02e.jpgpj.Encryptor - using signing key sec+vs 557D725A Alice <alice@example.com>
16:56:25.415 [com.example.EncryptAndSign.main()] DEBUG org.c02e.jpgpj.Encryptor - using signing uid Alice <alice@example.com>
$

$ ls ../message-alice-to-bob.txt.gpg
../message-alice-to-bob.txt.gpg
$

#### decrypt and verify message

$ mvn exec:java -Dexec.mainClass="com.example.DecryptAndVerify" -q
16:59:36.622 [com.example.DecryptAndVerify.main()] INFO org.c02e.jpgpj.Decryptor - not using decryption key pub e  FB322F6B
16:59:36.627 [com.example.DecryptAndVerify.main()] INFO org.c02e.jpgpj.Decryptor - using decryption key sec+ed F8DF4D46
16:59:37.189 [com.example.DecryptAndVerify.main()] INFO org.c02e.jpgpj.Decryptor - using verification key pub v  557D725A Alice <alice@example.com>
16:59:37.228 [com.example.DecryptAndVerify.main()] DEBUG org.c02e.jpgpj.Decryptor - good signature for key pub v  557D725A Alice <alice@example.com>
pub e  FB322F6B
$

$ cat ../message-alice-to-bob-decrypted.txt
Message from Alice to Bob...
$

