package com.joy.FixMateBackend.service.impl;

import com.joy.FixMateBackend.entity.UserEntity;
import com.joy.FixMateBackend.entity.UserPrincipal;
import com.joy.FixMateBackend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserDetailsServiceImpl implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UserEntity user = userRepository.findByEmail(username)
                .orElseThrow(()->new RuntimeException("User Not Found"));
        return new UserPrincipal(user);
    }
}
