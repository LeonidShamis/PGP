// https://keybase.io/kbpgp/docs/generating_a_pair

var kbpgp = require("kbpgp");
var fs = require("fs");

// RSA Keypairs with sensible defaults
kbpgp.KeyManager.generate_ecc({ userid : "Bob <bob@example.com>" }, function(err, bob) {
	if (!err) {
	  // sign bob's subkeys
	  bob.sign({}, function(err) {
	    console.log(bob);
	    // export demo; dump the private with a passphrase
	    bob.export_pgp_private ({
	      passphrase: 'BobPassword123'
	    }, function(err, pgp_private) {
				fs.writeFile('bob-secret-key.asc', pgp_private, function(err) {
					if (err) throw err;
				});
	      console.log("bob private key: ", pgp_private);
	    });
	    bob.export_pgp_public({}, function(err, pgp_public) {
				fs.writeFile('bob-public-key.asc', pgp_public, function(err) {
					if (err) throw err;
				});
	      console.log("bob public key: ", pgp_public);
	    });
	  });
	}
});