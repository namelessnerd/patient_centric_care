//
//  UserLandingViewController.m
//  CarePlanApp
//
//  Created by Karthik Gomadam on 7/26/13.
//  Copyright (c) 2013 Accenture. All rights reserved.
//
#import <QuartzCore/QuartzCore.h>
#import "UserLandingViewController.h"
#import "IIViewDeckController.h"
#import "CheckInHistoryManager.h"
#import "CheckIn.h"

@interface UserLandingViewController ()

@end

@implementation UserLandingViewController

@synthesize nextActionLabel, nextActionTime, checkinButton, nextActionUnit, userCheckInHistory;

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
    
    // initialize the tableview delegates
    
    self.userCheckInHistory.dataSource= self;
    self.userCheckInHistory.delegate= self;
    self.userCheckInHistory.backgroundColor=[UIColor colorWithRed:61.0/255.0 green:65.0/255.0 blue:66.0/255.0 alpha:0.3];
    [[self userCheckInHistory] layer].cornerRadius= 5;
    
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
    
    
    [[CheckInHistoryManager getUserCheckinHistoryManager] addCheckin:[[CheckIn alloc]initWithCheckInTask:self.nextActionLabel.text AndCheckInStatus:true]];
    
    
    self.nextActionLabel.text=@"You Rock!";
    self.nextActionUnit.text=@"";
    self.nextActionTime.text=@"";
    [UIView transitionWithView:self.checkinButton
                      duration:1.9f
                       options:UIViewAnimationOptionTransitionCrossDissolve
                    animations:^{
                        self.checkinButton.image = [UIImage imageNamed:@"checkmark.png"];
                    } completion:NULL];
    
    [[self userCheckInHistory]reloadData];
   
//    NSIndexPath *newIndexPath = [NSIndexPath indexPathForRow:[[[CheckInHistoryManager getUserCheckinHistoryManager]userCheckIns]count] inSection:0];
//
//
//    [[self userCheckInHistory]beginUpdates];
//    [[self userCheckInHistory]insertRowsAtIndexPaths:[NSArray arrayWithObject:newIndexPath] withRowAnimation:UITableViewRowAnimationFade];
//    [[self userCheckInHistory]endUpdates];
    
    
    
   [self performSelector:@selector(restoreCheckin:) withObject:self afterDelay:3.0 ];
    
    
    //[self performSegueWithIdentifier:@"userCheckinSegue" sender:sender];
}

#pragma mark - checkin history tableview methods 

- (NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section
{
    // Return the number of rows in the section.
    return [[[CheckInHistoryManager getUserCheckinHistoryManager]userCheckIns]count];
}

- (NSInteger)numberOfSectionsInTableView:(UITableView *)tableView
{
    return 1;
}

- (UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath{
    UITableViewCell * cell= [[CheckInHistoryManager getUserCheckinHistoryManager]getCheckin:indexPath.row];
    
    if (cell==nil){
        cell= [[UITableViewCell alloc]initWithStyle:UITableViewCellStyleSubtitle reuseIdentifier:@"userMessageCell"];
        cell.textLabel.text=@"Start Checking in to see your history";
    }
    
    return cell;
}

- (void) tableView:(UITableView*)tableView willDisplayCell:(UITableViewCell *)cell forRowAtIndexPath:(NSIndexPath *)indexPath {
    [cell setBackgroundColor:[UIColor clearColor]];
}

- (void)tableView:(UITableView *)tableView didSelectRowAtIndexPath:(NSIndexPath *)indexPath
{
    
}



@end
