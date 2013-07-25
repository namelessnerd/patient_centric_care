//
//  ViewController.h
//  CarePlanApp
//
//  Created by Karthik Gomadam on 7/23/13.
//  Copyright (c) 2013 Accenture. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "HttpClient.h"

@interface ViewController : UIViewController <UITextFieldDelegate, UITextViewDelegate, HTTPResponseDelegate>
@property (weak, nonatomic) IBOutlet UITextField *UserEmailAddress;
@property (weak, nonatomic) IBOutlet UITextField *UserPassword;
@property (weak, nonatomic) IBOutlet UIButton *SigninButton;

@property(strong, nonatomic) HttpClient * http_client;
- (IBAction)SignInUser:(id)sender;



@end
