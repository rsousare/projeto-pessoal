package com.example.crudMySql.config;

//@Component
//public class CustomAuthenticationSuccessHandler implements AuthenticationSuccessHandler {
//    @Override
//    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
//        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
//        String username = userDetails.getUsername();
//
//        HttpSession session = request.getSession();
//        session.setAttribute("username", username);
//        response.sendRedirect("/dashboard");
//    }
//}