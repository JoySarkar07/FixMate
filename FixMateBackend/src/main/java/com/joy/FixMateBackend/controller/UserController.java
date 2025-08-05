package com.joy.FixMateBackend.controller;

import com.joy.FixMateBackend.io.AuthRequest;
import com.joy.FixMateBackend.io.AuthResponse;
import com.joy.FixMateBackend.io.UserRequest;
import com.joy.FixMateBackend.io.UserResponse;
import com.joy.FixMateBackend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping("/login")
    public AuthResponse login(@RequestBody AuthRequest request){
        try{
            return userService.login(request);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User Not Found");
        }
    }

    @PostMapping("/register")
    public UserResponse addUser(@RequestBody UserRequest user){
        try{
            return userService.addUser(user);
        } catch (RuntimeException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Something went wrong during user adding");
        }
    }

    @GetMapping("/admin/user")
    public List<UserResponse> getAllUsers(){
        try{
            return userService.getAllUser();
        }catch (Exception e){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found");
        }
    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/user/{userId}")
    public void deleteUser(@PathVariable String userId){
        try{
            userService.deleteUser(userId);
        }catch (Exception e){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found");
        }
    }
}
