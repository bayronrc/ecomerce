package com.ecomerce.ecomerce.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.GetMapping;


@Controller
@RequestMapping("/api/products")
public class ProductController {
    @GetMapping
    public ResponseEntity<String> getProducts() {
        return ResponseEntity.ok("List of products");
    }
    
}
