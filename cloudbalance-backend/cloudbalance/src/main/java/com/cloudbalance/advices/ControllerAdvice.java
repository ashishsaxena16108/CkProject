package com.cloudbalance.advices;

import com.cloudbalance.exceptions.DuplicateAccountException;
import com.cloudbalance.exceptions.DuplicateUserException;
import com.cloudbalance.exceptions.InvalidRefreshTokenException;
import com.cloudbalance.exceptions.RefreshTokenExpiredException;
import com.cloudbalance.records.AddedAccountDTO;
import com.cloudbalance.records.AddedUserDTO;
import com.cloudbalance.records.ErrorResponseDTO;
import com.cloudbalance.records.UserAuthDTO;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import javax.naming.AuthenticationException;
import java.util.HashMap;
import java.util.Map;
import java.util.NoSuchElementException;

@RestControllerAdvice
public class ControllerAdvice {
    @ExceptionHandler(DuplicateAccountException.class)
    public ResponseEntity<AddedAccountDTO> handleAccount(DuplicateAccountException e) {
            return new ResponseEntity<>(new AddedAccountDTO(null, e.getMessage()), HttpStatus.BAD_REQUEST);
    }
    @ExceptionHandler(DuplicateUserException.class)
    public ResponseEntity<AddedUserDTO> handleUser(DuplicateUserException e){
        return new ResponseEntity<>(new AddedUserDTO(null, e.getMessage()),HttpStatus.BAD_REQUEST);
    }
    @ExceptionHandler(AuthenticationException.class)
    public ResponseEntity<UserAuthDTO> handleAuthentication(AuthenticationException e){
        return new ResponseEntity<>(new UserAuthDTO(null,
                "Authentication failed: Invalid credentials.",null,null),HttpStatus.UNAUTHORIZED);
    }
    @ExceptionHandler(DisabledException.class)
    public ResponseEntity<UserAuthDTO> handleAuthentication(DisabledException e){
        return new ResponseEntity<>(new UserAuthDTO(null,
                "Account is Disabled",null,null),HttpStatus.UNAUTHORIZED);
    }
    @ExceptionHandler(UsernameNotFoundException.class)
    public ResponseEntity<UserAuthDTO> handleUserNotFound(UsernameNotFoundException e){
        return new ResponseEntity<>(new UserAuthDTO(null,e.getMessage(),null,null),HttpStatus.NOT_FOUND);
    }
    @ExceptionHandler(NoSuchElementException.class)
    public ResponseEntity<AddedUserDTO> handleEditUser(NoSuchElementException e){
        return new ResponseEntity<>(new AddedUserDTO(null,e.getMessage()),HttpStatus.NOT_FOUND);
    }
    @ExceptionHandler(RefreshTokenExpiredException.class)
    public ResponseEntity<ErrorResponseDTO> handleRefreshExpiration(RefreshTokenExpiredException e){
        return new ResponseEntity<>(new ErrorResponseDTO(e.getMessage()),HttpStatus.UNAUTHORIZED);
    }
    @ExceptionHandler(InvalidRefreshTokenException.class)
    public ResponseEntity<ErrorResponseDTO> handleInvalidRefreshToken(InvalidRefreshTokenException e){
        return new ResponseEntity<>(new ErrorResponseDTO(e.getMessage()),HttpStatus.UNAUTHORIZED);
    }
    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<ErrorResponseDTO> handleInvalidCredentialsException(BadCredentialsException e){
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ErrorResponseDTO("Invalid Credentials"));
    }
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String,String>> handleValidation(MethodArgumentNotValidException e){
        Map<String,String> response = new HashMap<>();
        e.getBindingResult().getAllErrors().forEach(error-> response.put(((FieldError) error)
                .getField(),
                error.getDefaultMessage()));
        return ResponseEntity.badRequest().body(response);
    }
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponseDTO> handleGenericException(Exception e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ErrorResponseDTO(
                "An unexpected error occurred. Please try again later."
                ));
    }
}
