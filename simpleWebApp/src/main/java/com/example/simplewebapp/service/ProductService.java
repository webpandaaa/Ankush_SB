package com.example.simplewebapp.service;


import com.example.simplewebapp.model.Product;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;


@Service
public class ProductService {

    public List<Product> products = new ArrayList<>( Arrays.asList(
            new Product(101, "iphone" , 55000),
            new Product(102, "Buds" , 1200),
            new Product(103, "laptop", 60000 )
    ));

    public List<Product> getProduct(){
        return products;
    }

    public Product getProductById(int prodId) {
        return products.stream()
                .filter(p -> p.getProdId() == prodId)
                .findFirst().orElse(new Product(100, "NoName" , 0));
    }

    public void addProduct(Product prod){
        products.add(prod);
    }

    public void updateProduct(Product prod) {
        int index = 0;
        for(int i = 0; i<products.size(); i++){
            if(products.get(i).getProdId() == prod.getProdId()) {
                index = i;
            }
        }
        products.set(index,prod);
    }

    public void deleteProduct(int prodId) {
        int index = 0;
        for(int i = 0; i<products.size(); i++){
            if(products.get(i).getProdId() == prodId) {
                index = i;
            }
        }
        products.remove(index);
    }
}
