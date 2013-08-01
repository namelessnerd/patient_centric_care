//
//  UserLandingViewController.h
//  CarePlanApp
//
//  Created by Karthik Gomadam on 7/26/13.
//  Copyright (c) 2013 Accenture. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface UserLandingViewController : UIViewController<UITableViewDelegate, UITableViewDataSource>
@property (weak, nonatomic) IBOutlet UIBarButtonItem *settingsButton;
- (IBAction)showSettings:(id)sender;

@property (weak, nonatomic) IBOutlet UITableView *userCheckInHistory;


@property (weak, nonatomic) IBOutlet UILabel *nextActionLabel;
@property (weak, nonatomic) IBOutlet UILabel *nextActionTime;
@property (weak, nonatomic) IBOutlet UIImageView *checkinButton;
@property (weak, nonatomic) IBOutlet UILabel *nextActionUnit;

@end
