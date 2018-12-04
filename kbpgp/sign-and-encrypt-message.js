// https://keybase.io/kbpgp/docs/encrypting

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

		// read the message file
		var message_alice_to_bob;
		try {
	  	message_alice_to_bob = fs.readFileSync('message-alice-to-bob.txt', 'utf8');
	  } catch(e) {
	  	console.log('Error:', e.stack);
	  }
	
		// encypt message
		var params = {
		  msg:         message_alice_to_bob, // "Mesasge from Alice to Bob...",
		  encrypt_for: bob,
		  sign_with:   alice
		};
	
		kbpgp.box(params, function(err, result_string, result_buffer) {
		  //console.log(err, result_string, result_buffer);
		  console.log("Encrypted mesasge:\n\n", result_string);
		  // store encrypted mesasge to file
		  try {
      	fs.writeFileSync('message-alice-to-bob.txt.asc', result_string);
      } catch(e) {
      	console.log('Error:', e.stack);
      }
	
		});

  });

});
