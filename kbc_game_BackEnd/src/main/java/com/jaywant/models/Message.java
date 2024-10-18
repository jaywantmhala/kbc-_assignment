package com.jaywant.models;

public class Message {

    private String name;
    private String content;
    private String answer;

    public Message(String name, String content, String answer) {
        this.name = name;
        this.content = content;
        this.answer=answer;
    }


    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }


	public String getAnswer() {
		return answer;
	}


	public void setAnswer(String answer) {
		this.answer = answer;
	}
    
    
}
