package com.example.ecombackend.config;

import com.example.ecombackend.entity.Product;
import com.example.ecombackend.repo.ProductRepo;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.io.InputStream;
import java.math.BigDecimal;
import java.util.List;

@Configuration
public class DataLoader {

    @Bean
    CommandLineRunner loadData(ProductRepo repo) {
        return args -> {

            if (repo.count() > 0) return;

            List<Product> products = List.of(
                    createProduct("iPhone 15", "Apple smartphone", "Apple", 79999, "Mobile", "iphone.jpg"),
                    createProduct("Samsung Galaxy S24", "Samsung flagship phone", "Samsung", 74999, "Mobile", "s24.jpg"),
                    createProduct("OnePlus 12", "High performance phone", "OnePlus", 64999, "Mobile", "oneplus.jpg"),
                    createProduct("MacBook Air M2", "Apple lightweight laptop", "Apple", 114999, "Laptop", "macbook.jpg"),
                    createProduct("Dell XPS 13", "Premium ultrabook", "Dell", 99999, "Laptop", "dellxps.jpg"),
                    createProduct("HP Pavilion 15", "Everyday laptop", "HP", 65999, "Laptop", "hp.jpg"),
                    createProduct("Sony WH-1000XM5", "Noise cancelling headphones", "Sony", 29999, "Accessories", "sony.jpg"),
                    createProduct("Boat Rockerz 450", "Budget headphones", "Boat", 1499, "Accessories", "boat.jpg"),
                    createProduct("Apple Watch Series 9", "Smartwatch", "Apple", 41999, "Wearables", "watch.jpg"),
                    createProduct("Samsung Galaxy Watch 6", "Android smartwatch", "Samsung", 29999, "Wearables", "samsungwatch.jpg"),
                    createProduct("iPad Air", "Apple tablet", "Apple", 59999, "Tablet", "ipadair.jpg"),
                    createProduct("Samsung Galaxy Tab S9", "Android tablet", "Samsung", 69999, "Tablet", "tabs9.jpg"),
                    createProduct("Logitech MX Master 3", "Wireless mouse", "Logitech", 8999, "Accessories", "mouse.jpg"),
                    createProduct("Mechanical Keyboard", "RGB gaming keyboard", "Redragon", 4999, "Accessories", "keyboard.jpg"),
                    createProduct("Canon EOS 1500D", "DSLR Camera", "Canon", 39999, "Camera", "canon.jpg"),
                    createProduct("Nikon D5600", "Professional DSLR", "Nikon", 52999, "Camera", "nikon.jpg"),
                    createProduct("Mi 55 Inch Smart TV", "4K Android TV", "Xiaomi", 45999, "TV", "mi_tv.jpg"),
                    createProduct("LG OLED TV", "Premium OLED display", "LG", 129999, "TV", "lg_oled.jpg"),
                    createProduct("JBL Flip 6", "Portable Bluetooth speaker", "JBL", 9999, "Audio", "jbl.jpg"),
                    createProduct("Amazon Echo Dot", "Smart speaker with Alexa", "Amazon", 4499, "Smart Home", "echo.jpg")
            );

            repo.saveAll(products);
        };
    }

    private Product createProduct(String name, String desc, String brand,
                                  double price, String category, String imageName) throws Exception {

        Product p = new Product();
        p.setName(name);
        p.setDescription(desc);
        p.setBrand(brand);
        p.setPrice(BigDecimal.valueOf(price));
        p.setCategory(category);
        p.setAvailable(true);
        p.setQuantity(10);

        InputStream is = getClass().getResourceAsStream("/static/products/" + imageName);

        if (is != null) {
            p.setImageDate(is.readAllBytes());
            p.setImageType("image/jpeg");
            p.setImageName(imageName);
        }

        return p;
    }
}