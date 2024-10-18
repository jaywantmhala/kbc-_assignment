package com.jaywant.controller;


import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.jaywant.models.Message;



@RestController
public class MessageController {

    
    @MessageMapping("/message")
    @SendTo("/topic/return-to")
    public Message getContent(@RequestBody Message message) {
        System.out.println("User: " + message.getName() + " Answer Status: " + message.getAnswer());

        return message;  
    }
    
   
        

}
