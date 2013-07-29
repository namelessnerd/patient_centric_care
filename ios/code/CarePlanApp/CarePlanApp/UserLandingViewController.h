//
//  UserLandingViewController.h
//  CarePlanApp
//
//  Created by Karthik Gomadam on 7/26/13.
//  Copyright (c) 2013 Accenture. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface UserLandingViewController : UIViewController
@property (weak, nonatomic) IBOutlet UIBarButtonItem *settingsButton;
- (IBAction)showSettings:(id)sender;
@property (weak, nonatomic) IBOutlet UINavigationItem *headerNavItem;

@end
