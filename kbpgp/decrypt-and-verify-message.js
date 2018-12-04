// https://keybase.io/kbpgp/docs/decrypting

// Assumptions:
//	- we have a KeyManager bob, for the recipient
//	- we also have a KeyManager alice, for the sender

var kbpgp = require("kbpgp");
var fs = require("fs");

var alice; // sender KeyManager
var bob; // recipient KeyManager

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
          //console.log("Loaded private key with passphrase");
        }
      });
    } else {
      //console.log("Loaded private key w/o passphrase");
    }
  }

  //console.log("alice: ", alice);

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
            //console.log("Loaded private key with passphrase");
          }
        });
      } else {
        //console.log("Loaded private key w/o passphrase");
      }
    }

    //console.log("bob: ", bob);

		// read the encrypted message file
		var encrypted_message;
		try {
    	encrypted_message = fs.readFileSync('message-alice-to-bob.txt.asc', 'utf8');
    } catch(e) {
    	console.log('Error:', e.stack);
    }
	
		// dencypt message
		var ring = new kbpgp.keyring.KeyRing;
		var kms = [alice, bob];
		for (var i in kms) {
		  ring.add_key_manager(kms[i]);
		}
		kbpgp.unbox({keyfetch: ring, armored: encrypted_message}, function(err, literals) {
		  if (err != null) {
		    return console.log("Problem: " + err);
		  } else {
		    console.log("Decrypted message:\n");
		    console.log(literals[0].toString());
		    var ds = km = null;
		    ds = literals[0].get_data_signer();
		    if (ds) { km = ds.get_key_manager(); }
		    if (km) {
		      console.log("Signed by PGP fingerprint");
		      console.log(km.get_pgp_fingerprint().toString('hex'));
		    }
		  }
		
		});

  });

});
