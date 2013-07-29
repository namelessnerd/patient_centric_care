//
//  ViewDeckMainControllerViewController.m
//  CarePlanApp
//
//  Created by Karthik Gomadam on 7/26/13.
//  Copyright (c) 2013 Accenture. All rights reserved.
//

#import "ViewDeckMainControllerViewController.h"

@interface ViewDeckMainControllerViewController ()

@end

@implementation ViewDeckMainControllerViewController
- (id)initWithCoder:(NSCoder *)aDecoder
{
    UIStoryboard *storyboard = [UIStoryboard storyboardWithName:@"MainStoryboard" bundle:nil];
    self = [super initWithCenterViewController:[storyboard instantiateViewControllerWithIdentifier:@"UserLandingViewController"]
                            leftViewController:[storyboard instantiateViewControllerWithIdentifier:@"UserSettingsViewController"]];
    

    if (self) {
        // Add any extra init code here
    }
    return self;
}
@end
