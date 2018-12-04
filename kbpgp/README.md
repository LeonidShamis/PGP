# Using kbpgp Keybase's implementation of PGP in JavaScript

Refer to [kbpgp](https://keybase.io/kbpgp) for more details.

### Requirements:

  - Node.js - https://nodejs.org/en/

### Assumptions:

  - Sender - Alice (alice@example.com, passphrase for the secret key = "AlicePassword123")
  - Recipient - Bob (bob@example.com, passphrase for the secret key = "BobPassword123")

### Steps:

  - generate keys for Alice and Bob
  - sign and encrypt the message from Alice to Bob
  - decrypt and verify the encrypted message

### Commands:

#### generate keys for Alice 

> node generate-keys-alice.js

```
$ ls *.asc
message-alice-to-bob.txt.asc
$

$ node generate-keys-alice.js
...
$ ls alice*.asc
alice-public-key.asc  alice-secret-key.asc
$
```

#### generate keys for Bob

> node generate-keys-bob.js

```
$ node generate-keys-bob.js
...
$ ls bob*.asc
bob-public-key.asc  bob-secret-key.asc
$
```

#### load and print keys

> node load-and-print-keys.js

```
$ node load-and-print-keys.js
...
$
```

#### sign and encrypt the message from Alice to Bob

> node sign-and-encrypt-message.js

```
$ node sign-and-encrypt-message.js
Encrypted mesasge:

 -----BEGIN PGP MESSAGE-----
Version: Keybase OpenPGP v2.0.82
Comment: https://keybase.io/crypto

wX4DsGPys6OIxTESAgMEu7PL0AmZZxdRaOqGDPkUm8mOnC3+zdSqsQCNEs6xgbjU
TAvOdlH91eVGl5vvgVa4HXJo1bDR1A7RS7dTSTzJjjBbI+zFZK9fGtay4PJwQP70
9YFcvzNWAkVYhg17akBeToOs+dj/KoqSRSMtGAObcazSwAYB/xoZKFilb73VEPei
3n6XTyjFYgW/YeVjNaulfq+qXtDbZYfI4Kxg7M2OIikjfL1GcgX6dnt/v7hS8KoL
D6rgGcWGWqbZFX8N6owZjqThnoZQdgCg+YtTbEpi7Y6pDO9slsFLJDDbYFmg4dTZ
ETMvEqEe1vlLy7pb53NPxZDQ3UO9tF2ar+bLxmNxEM/DyIuBN/SQoEmRlIc1HKXj
4pcMf4swHWijjvoS4xj7cUDsffPsTtMJ05NVvm0LhyxeK2YV3ueNjpE=
=uSfT
-----END PGP MESSAGE-----
$
```

#### decrypt and verify the encrypted message

> node decrypt-and-verify-message.js

```
$ node decrypt-and-verify-message.js
Decrypted message:

Message from Alice to Bob...

Signed by PGP fingerprint
218e3f9da02bbb48bf1f962f58bf3f6d65f77446
$
```
