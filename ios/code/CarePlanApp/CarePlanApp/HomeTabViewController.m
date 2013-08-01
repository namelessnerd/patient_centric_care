//
//  HomeTabViewController.m
//  CarePlanApp
//
//  Created by Karthik Gomadam on 8/1/13.
//  Copyright (c) 2013 Accenture. All rights reserved.
//

#import "HomeTabViewController.h"

@interface HomeTabViewController ()

@end

@implementation HomeTabViewController

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

- (IBAction)backToMenuAction:(id)sender {
    [self dismissViewControllerAnimated:YES completion:nil];
}
@end
