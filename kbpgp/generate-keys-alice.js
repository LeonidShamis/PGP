// https://keybase.io/kbpgp/docs/generating_a_pair

var kbpgp = require("kbpgp");
var fs = require("fs");

// RSA Keypairs with sensible defaults
kbpgp.KeyManager.generate_ecc({ userid : "Alice <alice@example.com>" }, function(err, alice) {
	if (!err) {
	  // sign alice's subkeys
	  alice.sign({}, function(err) {
	    console.log(alice);
	    // export demo; dump the private with a passphrase
	    alice.export_pgp_private ({
	      passphrase: 'AlicePassword123'
	    }, function(err, pgp_private) {
				fs.writeFile('alice-secret-key.asc', pgp_private, function(err) {
					if (err) throw err;
				});
	      console.log("alice private key: ", pgp_private);
	    });
	    alice.export_pgp_public({}, function(err, pgp_public) {
				fs.writeFile('alice-public-key.asc', pgp_public, function(err) {
					if (err) throw err;
				});
	      console.log("alice public key: ", pgp_public);
	    });
	  });
	}
});