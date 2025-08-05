package com.joy.FixMateBackend.service.impl;

import com.joy.FixMateBackend.entity.UserEntity;
import com.joy.FixMateBackend.enums.UserRole;
import com.joy.FixMateBackend.io.AuthRequest;
import com.joy.FixMateBackend.io.AuthResponse;
import com.joy.FixMateBackend.io.UserRequest;
import com.joy.FixMateBackend.io.UserResponse;
import com.joy.FixMateBackend.repository.UserRepository;
import com.joy.FixMateBackend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final AuthenticationManager authManager;
    private final JwtService jwtService;

    @Override
    public AuthResponse login(AuthRequest request) {
        Authentication authentication = authManager.authenticate(new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
        Map<String, Object> userData = getUserData(request.getEmail());
        if(authentication.isAuthenticated()) return new AuthResponse(userData.get("userId").toString(), request.getEmail(), jwtService.generateToken(request.getEmail()), (UserRole) userData.get("role"));
        return new AuthResponse(null, request.getEmail(),null,null);
    }

    @Override
    public UserResponse addUser(UserRequest user) {
        UserEntity newUser = convertToUserEntity(user);
        newUser.setPassword(new BCryptPasswordEncoder(12).encode(newUser.getPassword()));
        newUser = userRepository.save(newUser);
        return convertToResponse(newUser);
    }

    private UserResponse convertToResponse(UserEntity newUser) {
        return UserResponse.builder()
                .userId(newUser.getUserId())
                .username(newUser.getUsername())
                .email(newUser.getEmail())
                .phone(newUser.getPhone())
                .role(newUser.getRole())
                .build();
    }

    private UserEntity convertToUserEntity(UserRequest user) {
        return UserEntity.builder()
                .userId(UUID.randomUUID().toString())
                .username(user.getUsername())
                .password(user.getPassword())
                .email(user.getEmail())
                .phone(user.getPhone())
                .role(UserRole.USER)
                .build();
    }

    private Map<String,Object> getUserData(String email){
        Map<String, Object> data = new HashMap<>();
        UserEntity user = userRepository.findByEmail(email)
                .orElseThrow(()->new RuntimeException("User Not Found"));
        data.put("role", user.getRole());
        data.put("userId", user.getUserId());
        return data;
    }

    @Override
    public List<UserResponse> getAllUser() {
        return userRepository.findByRole(UserRole.USER)
                .stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public void deleteUser(String userid) {
        UserEntity existingUser = userRepository.findById(userid)
                .orElseThrow(()->new RuntimeException("User not found"));
        userRepository.delete(existingUser);
    }
}
