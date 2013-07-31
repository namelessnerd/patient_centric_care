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
    
    // add click for checkin button
    UITapGestureRecognizer *tap = [[UITapGestureRecognizer alloc] initWithTarget:self action:@selector(createCheckin:)];
    [self.checkinButton addGestureRecognizer:tap];
    
    // set text parameters
        self.nextActionLabel.adjustsFontSizeToFitWidth= YES;
    self.nextActionTime.adjustsFontSizeToFitWidth= YES;
    self.nextActionUnit.adjustsFontSizeToFitWidth= YES;
    
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

-(void) nextActionText:(NSArray *)nText{
    self.nextActionLabel.text=[nText objectAtIndex:0];
    self.nextActionTime.text=[nText objectAtIndex:1];
    self.nextActionUnit.text=[nText objectAtIndex:2];
}

-(void) restoreCheckin: (id) sender{

    [UIView transitionWithView:self.checkinButton
                      duration:1.9f
                       options:UIViewAnimationOptionTransitionCrossDissolve
                    animations:^{
                        self.checkinButton.image = [UIImage imageNamed:@"button.png"];
                    } completion:NULL];
    [self performSelector:@selector(nextActionText:) withObject:[NSArray arrayWithObjects:@"Daily Fruit Intake",@"02",@" Hours ", nil] afterDelay:2];
}


-(void) createCheckin:(id)sender{
    self.nextActionLabel.text=@"You Rock!";
    self.nextActionUnit.text=@"";
    self.nextActionTime.text=@"";
    [UIView transitionWithView:self.checkinButton
                      duration:1.9f
                       options:UIViewAnimationOptionTransitionCrossDissolve
                    animations:^{
                        self.checkinButton.image = [UIImage imageNamed:@"checkmark.png"];
                    } completion:NULL];
    
   [self performSelector:@selector(restoreCheckin:) withObject:self afterDelay:3.0 ];
    
    
    //[self performSegueWithIdentifier:@"userCheckinSegue" sender:sender];
}
@end
