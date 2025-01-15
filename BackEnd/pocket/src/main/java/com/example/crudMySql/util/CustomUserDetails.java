package com.example.crudMySql.util;

//public class CustomUserDetails implements UserDetails {
//    private Users user;
//
//    public CustomUserDetails(Users user) {
//        this.user = user;
//    }
//    @Override
//    public Collection<? extends GrantedAuthority> getAuthorities() {
//        UsersType usersType = user.getUserType();
//        List<SimpleGrantedAuthority> authorities =new ArrayList<>();
//        authorities.add(new SimpleGrantedAuthority(usersType.getUserTypeName()));
//        return authorities;
//    }
//
//    @Override
//    public String getPassword() {
//        return user.getPassword();
//    }
//
//    @Override
//    public String getUsername() {
//        return user.getEmail().getEmail();
//    }
//
//    @Override
//    public boolean isAccountNonExpired() {
//        return true;
//    }
//
//    @Override
//    public boolean isAccountNonLocked() {
//        return true;
//    }
//
//    @Override
//    public boolean isCredentialsNonExpired() {
//        return true;
//    }
//
//    @Override
//    public boolean isEnabled() {
//        return true;
//    }
//}
