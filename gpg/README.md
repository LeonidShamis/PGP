# Using GNU Privacy Guard (GnuPG a.k.a. GPG)

Refer to [GNU Privacy Guard](https://www.gnupg.org/) site for more details.

### Requirements:

  - GnuPG - see https://www.gnupg.org/software/index.html

### Assumptions:

  - Sender - Alice (alice@example.com, passphrase for the secret key = "AlicePassword123")
  - Recipient - Bob (bob@example.com, passphrase for the secret key = "BobPassword123")

### Steps:

  - generate keys for Alice and Bob
  - sign and encrypt message from Alice to Bob
  - decrypt and verify message

### Commands:

#### list keys
	
> gpg --list-keys
	
```
$ gpg --list-keys
$
```

#### generate a key for Alice
> gpg --gen-key
```
$ gpg --gen-key
gpg (GnuPG) 1.4.20; Copyright (C) 2015 Free Software Foundation, Inc.
This is free software: you are free to change and redistribute it.
There is NO WARRANTY, to the extent permitted by law.

Please select what kind of key you want:
   (1) RSA and RSA (default)
   (2) DSA and Elgamal
   (3) DSA (sign only)
   (4) RSA (sign only)
Your selection? 1
RSA keys may be between 1024 and 4096 bits long.
What keysize do you want? (2048) 2048
Requested keysize is 2048 bits
Please specify how long the key should be valid.
         0 = key does not expire
      <n>  = key expires in n days
      <n>w = key expires in n weeks
      <n>m = key expires in n months
      <n>y = key expires in n years
Key is valid for? (0) 0
Key does not expire at all
Is this correct? (y/N) y

You need a user ID to identify your key; the software constructs the user ID
from the Real Name, Comment and Email Address in this form:
    "Heinrich Heine (Der Dichter) <heinrichh@duesseldorf.de>"

Real name: Alice
Email address: alice@example.com
Comment:
You selected this USER-ID:
    "Alice <alice@example.com>"

Change (N)ame, (C)omment, (E)mail or (O)kay/(Q)uit? O
You need a Passphrase to protect your secret key.

We need to generate a lot of random bytes. It is a good idea to perform
some other action (type on the keyboard, move the mouse, utilize the
disks) during the prime generation; this gives the random number
generator a better chance to gain enough entropy.
...+++++
+++++
We need to generate a lot of random bytes. It is a good idea to perform
some other action (type on the keyboard, move the mouse, utilize the
disks) during the prime generation; this gives the random number
generator a better chance to gain enough entropy.
..+++++
.+++++
gpg: key 557D725A marked as ultimately trusted
public and secret key created and signed.

gpg: checking the trustdb
gpg: 3 marginal(s) needed, 1 complete(s) needed, PGP trust model
gpg: depth: 0  valid:   1  signed:   0  trust: 0-, 0q, 0n, 0m, 0f, 1u
pub   2048R/557D725A 2018-12-04
      Key fingerprint = 8A8A 9103 609F 8E31 2668  E384 D6F3 F0B1 557D 725A
uid                  Alice <alice@example.com>
sub   2048R/FB322F6B 2018-12-04
$
```

#### generate a key for Bob
NOTE: **--allow-freeform-uid** disables check for short User ID (Name must be at least 5 characters long)

> gpg --gen-key --allow-freeform-uid
```
$ gpg --gen-key --allow-freeform-uid
gpg (GnuPG) 1.4.20; Copyright (C) 2015 Free Software Foundation, Inc.
This is free software: you are free to change and redistribute it.
There is NO WARRANTY, to the extent permitted by law.

Please select what kind of key you want:
   (1) RSA and RSA (default)
   (2) DSA and Elgamal
   (3) DSA (sign only)
   (4) RSA (sign only)
Your selection? 1
RSA keys may be between 1024 and 4096 bits long.
What keysize do you want? (2048)
Requested keysize is 2048 bits
Please specify how long the key should be valid.
         0 = key does not expire
      <n>  = key expires in n days
      <n>w = key expires in n weeks
      <n>m = key expires in n months
      <n>y = key expires in n years
Key is valid for? (0) 0
Key does not expire at all
Is this correct? (y/N) y

You need a user ID to identify your key; the software constructs the user ID
from the Real Name, Comment and Email Address in this form:
    "Heinrich Heine (Der Dichter) <heinrichh@duesseldorf.de>"

Real name: Bob
Email address: bob@example.com
Comment:
You selected this USER-ID:
    "Bob <bob@example.com>"

Change (N)ame, (C)omment, (E)mail or (O)kay/(Q)uit? O
You need a Passphrase to protect your secret key.

We need to generate a lot of random bytes. It is a good idea to perform
some other action (type on the keyboard, move the mouse, utilize the
disks) during the prime generation; this gives the random number
generator a better chance to gain enough entropy.
...+++++
+++++
We need to generate a lot of random bytes. It is a good idea to perform
some other action (type on the keyboard, move the mouse, utilize the
disks) during the prime generation; this gives the random number
generator a better chance to gain enough entropy.
.+++++
..+++++
gpg: key C00CAFBC marked as ultimately trusted
public and secret key created and signed.

gpg: checking the trustdb
gpg: 3 marginal(s) needed, 1 complete(s) needed, PGP trust model
gpg: depth: 0  valid:   2  signed:   0  trust: 0-, 0q, 0n, 0m, 0f, 2u
pub   2048R/C00CAFBC 2018-12-04
      Key fingerprint = 1D90 E0D6 B12F 3D3E D4BE  C67E 3DAE 8EC7 C00C AFBC
uid                  Bob <bob@example.com>
sub   2048R/F8DF4D46 2018-12-04
$
```

#### list keys
> $ gpg --list-keys
```
~/.gnupg/pubring.gpg
-----------------------------------
pub   2048R/557D725A 2018-12-04
uid                  Alice <alice@example.com>
sub   2048R/FB322F6B 2018-12-04

pub   2048R/C00CAFBC 2018-12-04
uid                  Bob <bob@example.com>
sub   2048R/F8DF4D46 2018-12-04
$ 
```

#### generating a Revocation Key

NOTE: After generating your key, one of the first things you should do is create a revocation certificate

> gpg --gen-revoke --armor --output=filename
```
$ gpg --gen-revoke --armor --output=alice-revocation-certificate.asc alice@example.com

sec  2048R/557D725A 2018-12-04 Alice <alice@example.com>

Create a revocation certificate for this key? (y/N) y
Please select the reason for the revocation:
  0 = No reason specified
  1 = Key has been compromised
  2 = Key is superseded
  3 = Key is no longer used
  Q = Cancel
(Probably you want to select 1 here)
Your decision? 0
Enter an optional description; end it with an empty line:
> demo
>
Reason for revocation: No reason specified
demo
Is this okay? (y/N) y

You need a passphrase to unlock the secret key for
user: "Alice <alice@example.com>"
2048-bit RSA key, ID 557D725A, created 2018-12-04

Revocation certificate created.

Please move it to a medium which you can hide away; if Mallory gets
access to this certificate he can use it to make your key unusable.
It is smart to print this certificate and store it away, just in case
your media become unreadable.  But have some caution:  The print system of
your machine might store the data and make it available to others!
$
```

```
$ cat alice-revocation-certificate.asc
-----BEGIN PGP PUBLIC KEY BLOCK-----
Version: GnuPG v1
Comment: A revocation certificate should follow

iQEjBCABAgANBQJcBf99Bh0AZGVtbwAKCRDW8/CxVX1yWl9ZB/wJ+BHq215vvcYz
nTDzBRK9Ss9ybmpAUNvrrGngswb3feP3RG0MWqHuGBVyhz0eqAo7BnRE4hcxSCrh
IYZkd+JEyWQXKwEUZsWjCiqN1sdOQgs1CpnF+8/+pCOTOCg+CvX5d3nzaGcKRxfh
ie1ghj5aiK2qF/F04qrrplZfGCIXG7TCOy77jrjRBzamOUYLLoZl6iNpFgDm/jz/
jDFvqcZ6seUV96yr/IfZ+rlmbNs9muz6TPJO+SIYewrzW0XxxfxFoQFGcDBJ6dma
h6v+oKkg5iGKg8Zk0Hqq/gxbCe24USnBLMpdVYb/IW+os3DP9QPohh8CjPmVUFuZ
FLalRzIM
=M5se
-----END PGP PUBLIC KEY BLOCK-----
$ 
```
```
$ gpg --gen-revoke --armor --output=bob-revocation-certificate.asc bob@example.com

sec  2048R/C00CAFBC 2018-12-04 Bob <bob@example.com>

Create a revocation certificate for this key? (y/N) y
Please select the reason for the revocation:
  0 = No reason specified
  1 = Key has been compromised
  2 = Key is superseded
  3 = Key is no longer used
  Q = Cancel
(Probably you want to select 1 here)
Your decision? 0
Enter an optional description; end it with an empty line:
> demo
>
Reason for revocation: No reason specified
demo
Is this okay? (y/N) y

You need a passphrase to unlock the secret key for
user: "Bob <bob@example.com>"
2048-bit RSA key, ID C00CAFBC, created 2018-12-04

Revocation certificate created.

Please move it to a medium which you can hide away; if Mallory gets
access to this certificate he can use it to make your key unusable.
It is smart to print this certificate and store it away, just in case
your media become unreadable.  But have some caution:  The print system of
your machine might store the data and make it available to others!
$
```
```
$ cat bob-revocation-certificate.asc
-----BEGIN PGP PUBLIC KEY BLOCK-----
Version: GnuPG v1
Comment: A revocation certificate should follow

iQEjBCABAgANBQJcBf/mBh0AZGVtbwAKCRA9ro7HwAyvvEs8B/9luIot5eydQ5qZ
RGjdBbHoJZJoMPpwH6N5HQdzjHzvEYoZ9Weo8pPg8Hry/pGLh0gUEvF+oX/EK5Ar
rGLHQK2Xe4Fu2SQZ8aGo8FLu7/2eFipsnG05uP7ea+eynLdDirFT7JWxt8i95JnC
DalgEfmx3b3E2zuM0Q9YlFgRZBhuZxluqSsKaiu5u6WiuqTOAi3WWnwjeT5/Kq0u
4WV50fECbcE6julZqYBD5sg1ivZ/f79yHUX85wQwEHgjtZARW/5+O/8IfZPPnvKk
OYJmWphhvnC8cs/DunTroj5+0T8YIH4Epg0QpjllsU5kIRbRPl1FNHXuY24PjWmc
Msh6PN4Y
=6V9t
-----END PGP PUBLIC KEY BLOCK-----
$ 
```

#### export public key

> gpg --armor --export your@email.address [> filename]
```
$ gpg --armor --export alice@example.com > ../keys/alice-public-key.asc
$ gpg --armor --export bob@example.com > ../keys/bob-public-key.asc
$ 
```

#### export (backup) private key

> gpg --armor --export-secret-key your@email.address [> filename]
```
$ gpg --armor --export-secret-key alice@example.com > ../keys/alice-secret-key.asc
$ gpg --armor --export-secret-key bob@example.com > ../keys/bob-secret-key.asc
$ 
```

#### encrypting the message (for e-mail)

If you don't have a fancy e-mail plugin that helps you encrypt your messages, it's easy enough to do from the command line. You'll need to save your message to a file first.

> gpg --encrypt --sign --armor -r recipient@email -r your@email.com filename

--encrypt - tells gpg to encrypt the message using public-key encryption.
--sign - adds a digital signature that lets you guarantee that the message was generated by you and was not corrupted nor modified in transmission.
--armor - wraps your output in plaintext "ASCII armor".
-u USER-ID - use USER-ID to sign or decrypt
-r recipient - specifies recipients of the message. You must already have imported the public keys of the recipients.
filename - is the filename of the file you're encrypting.
*Warning:* When gpg encrypts or decrypts a file, it usually leaves the original file intact!

```
$ cat ../message-alice-to-bob.txt
Message from Alice to Bob...
$ 
```
```
$ gpg --encrypt --sign --armor -u alice -r bob@example.com ../message-alice-to-bob.txt

You need a passphrase to unlock the secret key for
user: "Alice <alice@example.com>"
2048-bit RSA key, ID 557D725A, created 2018-12-04

$ ls ../message-alice-to-bob*
../message-alice-to-bob.txt  ../message-alice-to-bob.txt.asc

$ cat ../message-alice-to-bob.txt.asc
-----BEGIN PGP MESSAGE-----
Version: GnuPG v1

hQEMA8jtCPb4301GAQf8CycNU8rB7Dj/4LAqvWrHnM03tIvsImUfWV6a9onG+5v0
YNIkfJDPWDk+NenYcqhkeQjQ4ILz0ZgytH7QD4tCEHJEoEPa3V0cPEe6IJTSBkBG
b/hedniCAcChOxUb7S+zYGzCnQc+Bz6GH1cTdeK6Iw4ATmTrUEs7ZgvXwm9IqumH
hVENG3+igCNUSgDHlRhcOJGK7lgqmA9fHJSIs31NWuiiqe9+9grZOIxLTHaIVX5V
bByFqHh3gXuPdQxgIvDlw7QTaqjLBGiJFd6ADgItUPGmkE58cKmjoZFFgw4PTEAG
kPviyW9xxUFA9X6H7k4pZ8bD9/aS2pqsdkXJNcM2xtLA3gG42anQYU48aso6r4/u
m/79kCrNWvBBou9XeDN8d2yxTICOsV8AKNUOYxYHfuO+fDB1buSBQr4H9u9T65Hz
pF/ffwVS9y5uWetXIDH4hM7lqYe58JmF8LbzZIvbDFkrXU9pNAM0ipU6xpmastZ0
7XiR3o6laZhZblgosG6EXmOcsDBhcEkRxGJXiSt4c1qtACYgPmd1FFCUVqexDDE3
WHBLmSmKdffXqJwGiab706HCM5HE0IThgscj5muohkz1+RapDTMBNJVhLqajJD/1
S+wL+oCyoNYbt25Y0zKdWcdkUCxMiFsdVCWHIXhBKwbACBcOduiBlCwRFwLeh20o
Jv6dDt8ezIbKOkFWHlxxyDI+2nk3L7ttmZGsx54F0cMCVCZtQnZGJTCMWDfZW+IU
t5l4+5Zn0U18eEGnd3q2ZjCd/TMjoxx2GA5lsfqIyB7POsJHGfyVeh4vQuxbJs8A
mo+geFBMmngUEy0dUlXzpCVRCHRAVtXpr/9Ge94TrHAmV98aGV/RVjze3iPlA8j3
0+KoNmJraCBNNGbUjpx2eA==
=tc+1
-----END PGP MESSAGE-----
$
```

#### decrypt the message and verify signature

You should be warned that the default action (when passed the name of an encrypted file) is to decrypt the file and leave the encrypted and the decrypted file on your disc! If you just want to view the contents of an encrypted file, and leave it encrypted, without saving the decrypted version anywhere, use the -d or --decrypt option

> gpg [-d] filename
```
$ gpg -d ../message-alice-to-bob.txt.asc

You need a passphrase to unlock the secret key for
user: "Bob <bob@example.com>"
2048-bit RSA key, ID F8DF4D46, created 2018-12-04 (main key ID C00CAFBC)

gpg: encrypted with 2048-bit RSA key, ID F8DF4D46, created 2018-12-04
      "Bob <bob@example.com>"
Message from Alice to Bob...
gpg: Signature made Tue, Dec 04, 2018  3:27:15 PM AUSEDT using RSA key ID 557D725A
gpg: Good signature from "Alice <alice@example.com>"
$ 
```
