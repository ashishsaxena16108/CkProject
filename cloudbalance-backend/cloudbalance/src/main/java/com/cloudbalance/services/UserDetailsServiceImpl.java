package com.cloudbalance.services;

import com.cloudbalance.entities.SecurityUser;
import com.cloudbalance.entities.User;
import com.cloudbalance.records.AccountDTO;
import com.cloudbalance.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;


@Service
@RequiredArgsConstructor
public class UserDetailsServiceImpl implements UserDetailsService {
    private final UserRepository userRepository;
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User u = userRepository.findByEmail(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with username: " + username));
        if(u.getRole().equals(User.Role.USER)){
            u=userRepository.findByEmailWithAccounts(username)
                    .orElseThrow(()->new UsernameNotFoundException("User not found."));
        }
        return new SecurityUser(u.getId(),u.getEmail(),u.getPassword(),
                u.getFirstName(),u.getLastName(),u.getRole(),
                u.getRole().equals(User.Role.USER)?u.getAccounts()
                        .stream().map(a->new AccountDTO(a.getId(),
                                a.getAccountArn(),a.getAccountId(),a.getAccountName()))
                        .toList():new ArrayList<>());
    }
}
