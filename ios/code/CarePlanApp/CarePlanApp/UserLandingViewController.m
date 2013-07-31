//
//  UserLandingViewController.m
//  CarePlanApp
//
//  Created by Karthik Gomadam on 7/26/13.
//  Copyright (c) 2013 Accenture. All rights reserved.
//

#import "UserLandingViewController.h"
#import "IIViewDeckController.h"

@interface UserLandingViewController ()

@end

@implementation UserLandingViewController

@synthesize nextActionLabel, nextActionTime, checkinButton, nextActionUnit;

- (id)initWithNibName:(NSString *)nibNameOrNil bundle:(NSBundle *)nibBundleOrNil
{
    self = [super initWithNibName:nibNameOrNil bundle:nibBundleOrNil];
    if (self) {
        self.viewDeckController.leftSize= 100.0;
        // Custom initialization
    }
    return self;
}

- (void)viewDidLoad
{
    [super viewDidLoad];
     [self.navigationController.navigationBar setTintColor:[UIColor colorWithRed:61.0/255.0 green:65.0/255.0 blue:66.0/255.0 alpha:1]];
    self.navigationItem.title= @"My Care";
    

    UITapGestureRecognizer *tap = [[UITapGestureRecognizer alloc] initWithTarget:self action:@selector(createCheckin:)];
    [self.checkinButton addGestureRecognizer:tap];
    // bind click item to the checkin
//    self.headerNavItem.
	// Do any additional setup after loading the view.
}

- (void)didReceiveMemoryWarning
{
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

- (IBAction)showSettings:(id)sender {
    
    [self.viewDeckController toggleLeftViewAnimated:YES];
}

-(void) createCheckin:(id)sender{
    self.nextActionLabel.text= @"Rock on";
    self.nextActionUnit.text=@"Keep up the great work";
    
    //[self performSegueWithIdentifier:@"userCheckinSegue" sender:sender];
}
@end
