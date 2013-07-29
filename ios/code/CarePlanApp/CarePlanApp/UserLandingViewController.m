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

@synthesize headerNavItem;

- (id)initWithNibName:(NSString *)nibNameOrNil bundle:(NSBundle *)nibBundleOrNil
{
    self = [super initWithNibName:nibNameOrNil bundle:nibBundleOrNil];
    if (self) {
        // Custom initialization
    }
    return self;
}

- (void)viewDidLoad
{
    [super viewDidLoad];
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
@end
