//
//  ConnectedServicesViewController.m
//  CarePlanApp
//
//  Created by Karthik Gomadam on 7/31/13.
//  Copyright (c) 2013 Accenture. All rights reserved.
//

#import "ConnectedServicesViewController.h"

@interface ConnectedServicesViewController ()

@end

@implementation ConnectedServicesViewController

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
	// Do any additional setup after loading the view.
}

- (void)didReceiveMemoryWarning
{
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

- (IBAction)backClick:(id)sender {
    
    [self dismissViewControllerAnimated:YES completion:nil];
}
@end
