//
//  ViewController.m
//  CarePlanApp
//
//  Created by Karthik Gomadam on 7/23/13.
//  Copyright (c) 2013 Accenture. All rights reserved.
//

#import "ViewController.h"

@interface ViewController ()

@end

@implementation ViewController

@synthesize UserEmailAddress, UserPassword, SigninButton, http_client;

-(void)viewWillAppear:(BOOL)animated{
    
    [[NSNotificationCenter defaultCenter]
     addObserver:self
     selector:@selector(keyboardWillShow:)
     name:UIKeyboardWillShowNotification
     object:nil];
    [[NSNotificationCenter defaultCenter]
     addObserver:self
     selector:@selector(keyboardWillHide:)
     name:UIKeyboardWillHideNotification
     object:nil];
}

- (void)viewDidLoad
{
    [super viewDidLoad];
    
    // border and stuff for email and password
    

    
    // initialize the HTTP client
    self.http_client= [[HttpClient alloc]init];
    self.http_client.http_response_delegate= self;
    
	// Do any additional setup after loading the view, typically from a nib.
    
    self.UserPassword.backgroundColor= [UIColor lightGrayColor];
    self.UserEmailAddress.backgroundColor= [UIColor lightGrayColor];
    self.UserPassword.borderStyle= UITextBorderStyleNone;
    self.UserEmailAddress.borderStyle= UITextBorderStyleNone;
    
}

- (void)didReceiveMemoryWarning
{
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}


#pragma mark keyboard handling methods

/* Helper methods to dismiss text view, to change view colors needed, and to keep textview in focus */

- (void)touchesBegan:(NSSet *)touches withEvent:(UIEvent *)event{
    NSLog(@"Delegate is being called");
    [self.view endEditing:YES];
    [super touchesBegan:touches withEvent:event];
}

-(void)textViewDidBeginEditing:(UITextField *)textView{
    NSLog(@"View did begin editing");
    //userMessageToGale= textView;
}

- (void)textViewDidEndEditing:(UITextField *)textview {
    //[self sendMessageToGale:self];
    //userMessageToGale= nil;
}

- (BOOL)textView:(UITextField *)txtView shouldChangeTextInRange:(NSRange)range replacementText:(NSString *)text {
    if( [text rangeOfCharacterFromSet:[NSCharacterSet newlineCharacterSet]].location == NSNotFound ) {
        return YES;
    }
    [txtView resignFirstResponder];
    [txtView endEditing:YES];
    return NO;
}

-(BOOL) textFieldShouldReturn:(UITextField *)textField{
    [textField resignFirstResponder];
    return YES;
}

// keyboard handling
- (void)keyboardWillShow:(NSNotification *)aNotification {
    [self moveTextViewForKeyboard:aNotification up:YES];
}

- (void)keyboardWillHide:(NSNotification *)aNotification {
    [self moveTextViewForKeyboard:aNotification up:NO];
}

- (void) moveTextViewForKeyboard:(NSNotification*)aNotification up: (BOOL) up{
    NSDictionary* userInfo = [aNotification userInfo];
    
    // Get animation info from userInfo
    NSTimeInterval animationDuration;
    UIViewAnimationCurve animationCurve;
    
    CGRect keyboardEndFrame;
    
    [[userInfo objectForKey:UIKeyboardAnimationCurveUserInfoKey] getValue:&animationCurve];
    [[userInfo objectForKey:UIKeyboardAnimationDurationUserInfoKey] getValue:&animationDuration];
    
    
    [[userInfo objectForKey:UIKeyboardFrameEndUserInfoKey] getValue:&keyboardEndFrame];
    
    
    // Animate up or down
    [UIView beginAnimations:nil context:nil];
    [UIView setAnimationDuration:animationDuration];
    [UIView setAnimationCurve:animationCurve];
    
    CGRect newFrame = self.view.frame;
    CGRect keyboardFrame = [self.view convertRect:keyboardEndFrame toView:nil];
    
    newFrame.origin.y -= keyboardFrame.size.height * (up? 1 : -1);
    self.view.frame = newFrame;
    
    [UIView commitAnimations];
}


- (IBAction)SignInUser:(id)sender {
    if (!( [self.UserEmailAddress.text isEqual:@""] && ![self.UserPassword.text isEqual:@""])){
        NSMutableDictionary * dict= [[NSMutableDictionary alloc]init];
        [dict setObject:self.UserEmailAddress.text forKey:@"username"];
        [dict setObject:self.UserPassword.text forKey:@"password"];
        [self.http_client loadURL:[NSURL URLWithString:@"http://localhost:8000/api/consumer/authenticate"] with_message:dict];
    }
}


-(void) processHttpResponse:(id)http_response{
    if ([[http_response valueForKey:@"status"]integerValue]==200){
      [self performSegueWithIdentifier:@"LoginSuccessModal" sender:http_response];
    }

}

@end
