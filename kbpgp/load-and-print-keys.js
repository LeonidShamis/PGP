// https://keybase.io/kbpgp/docs/loading_a_key

// KeyManager from a private key - recall this includes her public key, so it's all we need

var kbpgp = require("kbpgp");
var fs = require("fs");

var alice_pgp_key;
var alice_passphrase = "AlicePassword123";

// synchronously read file
try {
	alice_pgp_key = fs.readFileSync('alice-secret-key.asc', 'utf8');
} catch(e) {
	console.log('Error:', e.stack);
}

kbpgp.KeyManager.import_from_armored_pgp({
  armored: alice_pgp_key
}, function(err, alice) {
  if (!err) {
    if (alice.is_pgp_locked()) {
      alice.unlock_pgp({
        passphrase: alice_passphrase
      }, function(err) {
        if (!err) {
          console.log("Loaded private key with passphrase");
        }
      });
    } else {
      console.log("Loaded private key w/o passphrase");
    }
  }

  //console.log("alice: ", alice);

	let alice_pgp_private;
	let alice_pgp_public;

  // export private with a passphrase
  alice.export_pgp_private ({
    passphrase: alice_passphrase
  }, function(err, pgp_private) {
    //console.log("alice private key: ", pgp_private);
    alice_pgp_private = pgp_private;
  });

  // export the public key
  alice.export_pgp_public({}, function(err, pgp_public) {
    //console.log("alice public key: ", pgp_public);
    alice_pgp_public = pgp_public;
  });

	console.log("alice private key: ", alice_pgp_private);
	console.log("alice public key: ", alice_pgp_public);

});


var bob_pgp_key;
var bob_passphrase = "BobPassword123";

// synchronously read file
try {
	bob_pgp_key = fs.readFileSync('bob-secret-key.asc', 'utf8');
} catch(e) {
	console.log('Error:', e.stack);
}

kbpgp.KeyManager.import_from_armored_pgp({
  armored: bob_pgp_key
}, function(err, bob) {
  if (!err) {
    if (bob.is_pgp_locked()) {
      bob.unlock_pgp({
        passphrase: bob_passphrase
      }, function(err) {
        if (!err) {
          console.log("Loaded private key with passphrase");
        }
      });
    } else {
      console.log("Loaded private key w/o passphrase");
    }
  }

  //console.log("bob: ", bob);

	let bob_pgp_private;
	let bob_pgp_public;

  // export private with a passphrase
  bob.export_pgp_private ({
    passphrase: bob_passphrase
  }, function(err, pgp_private) {
    //console.log("bob private key: ", pgp_private);
    bob_pgp_private = pgp_private;
  });

  // export the public key
  bob.export_pgp_public({}, function(err, pgp_public) {
    //console.log("bob public key: ", pgp_public);
    bob_pgp_public = pgp_public;
  });

  console.log("bob private key: ", bob_pgp_private);
  console.log("bob public key: ", bob_pgp_public);

});
