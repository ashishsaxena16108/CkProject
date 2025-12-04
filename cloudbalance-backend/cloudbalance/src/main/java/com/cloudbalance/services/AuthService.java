package com.cloudbalance.services;

import com.cloudbalance.entities.User;
import com.cloudbalance.records.UserCredential;
import com.cloudbalance.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthService {
   private final UserRepository userRepository;
   public User login(UserCredential userCredential){
       Optional<User> user = userRepository.findByEmail(userCredential.email());
       return user.orElse(null);
   }
}
