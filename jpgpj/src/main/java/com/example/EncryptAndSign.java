package com.example;

import java.io.File;

import org.c02e.jpgpj.Encryptor;
import org.c02e.jpgpj.Key;

public class EncryptAndSign {
  public static void main(String[] args) {
		try {
			// https://github.com/justinludwig/jpgpj/wiki/EncryptingFiles
			Encryptor encryptor = new Encryptor(
			    new Key(new File("../keys/alice-secret-key.asc"), "AlicePassword123"), // sender's private key
			    new Key(new File("../keys/bob-public-key.asc")) // recipient's public key
			);
			encryptor.encrypt(
			    new File("../message-alice-to-bob.txt"), // file to encrypt
			    new File("../message-alice-to-bob.txt.gpg") // encrypted file
			);				
		} catch(Exception e) {
    	e.printStackTrace(); 
   	}
  }
}
