package com.example;

import java.io.File;

import org.c02e.jpgpj.Decryptor;
import org.c02e.jpgpj.Key;

public class DecryptAndVerify {
  public static void main(String[] args) {
		try {
			// https://github.com/justinludwig/jpgpj/wiki/DecryptingFiles
			Decryptor decryptor = new Decryptor(
			    new Key(new File("../keys/bob-secret-key.asc"), "BobPassword123"), // recipient's private key
			    new Key(new File("../keys/alice-public-key.asc")) // sender's public key
			);
			decryptor.decrypt(
			    new File("../message-alice-to-bob.txt.gpg"), // encrypted file
			    new File("../message-alice-to-bob-decrypted.txt") // decrypted file
			);
		} catch(Exception e) {
    	e.printStackTrace(); 
   	}
  }
}
