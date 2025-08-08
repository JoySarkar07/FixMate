package com.joy.FixMateBackend.service;

import com.joy.FixMateBackend.io.AuthRequest;
import com.joy.FixMateBackend.io.AuthResponse;
import com.joy.FixMateBackend.io.UserRequest;
import com.joy.FixMateBackend.io.UserResponse;

import java.util.List;

public interface UserService {

    public AuthResponse login(AuthRequest request);

    public UserResponse addUser(UserRequest user);

    public List<UserResponse> getAllUser();

    public void deleteUser(String userid);
}
