package com.example.fyp;

import java.util.List;
import java.util.stream.IntStream;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.jupiter.api.Assertions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.ui.ModelMap;

import com.example.fyp.controller.dto.LoginDto;
import com.example.fyp.model.promptModel;
import com.example.fyp.controller.AuthController;
import com.example.fyp.controller.SentimentController;

@ExtendWith(SpringExtension.class)
@SpringBootTest
class FypApplicationTests {

	@Autowired
    private AuthController authController;

	private SentimentController SentimentController;

	@Test
	public void testSentimentAnalysis() {
		List<String> prompts = List.of("The product is cheap and the quality is superb",
									   "The product is expensive and the quality doesn't match the price tag",
									   "The product is okay, its not good or bad, I think its average");

		List<String> expected = List.of("Positive", "Negative", "Neutral");

		ModelMap model = new ModelMap();

		Assertions.assertAll("Overall Sentiment Analysis tests", IntStream.range(0, prompts.size())
				.mapToObj(i -> {
					return () -> {
                        try {
                            Assertions.assertEquals(expected.get(i), SentimentController.inputSentence(model, new promptModel(prompts.get(i))).getOverallSentiment(), "Text Sentiment Failed");
                        } catch (Exception e) {
                            System.out.println(e);
                        }
					};
				})
		);
	}

	@Test
	public void testLogin() {
		LoginDto[] testsSuccess = new LoginDto[]{new LoginDto(), new LoginDto()};
		testsSuccess[0].setEmail("testing@gmail.com");
		testsSuccess[0].setPassword("admin");

		testsSuccess[1].setEmail("testing1@gmail.com");
		testsSuccess[1].setPassword("testing");

		LoginDto[] testsFail = new LoginDto[]{new LoginDto()};
		testsFail[0].setEmail("testing1@gmail.com");
		testsFail[0].setPassword("test");

		Assertions.assertAll("Login tests", IntStream.range(0, testsSuccess.length)
				.mapToObj(i -> {
					return () -> {
						try {
                            Assertions.assertEquals(200, authController.authenticateUser(testsSuccess[i]).getStatusCode().value(), "Login Failed");
                        } catch (Exception e) {
                            System.out.println(e);
                        }
					};
				}));

		for (LoginDto loginDto : testsFail)
			try{
    			Assertions.assertThrows(BadCredentialsException.class, () -> authController.authenticateUser(loginDto));
			} catch (Exception e){
				System.out.println(e);
			}
	}
}